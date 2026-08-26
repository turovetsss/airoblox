/**
 * Доступ к занятиям по группе и дате старта.
 * Профиль: sessionStorage key robovita_group_profile
 */
(function (global) {
  const PROFILE_KEY = 'robovita_group_profile';
  let _config = null;

  function slug(s) {
    return String(s || 'uchenik')
      .trim().toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zа-яё0-9_]/gi, '')
      .slice(0, 24) || 'uchenik';
  }

  function parseDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  function formatDate(d) {
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function getProfile() {
    try {
      const raw = sessionStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function setProfile(groupId, studentName) {
    const data = { groupId, studentName: studentName.trim(), joinedAt: new Date().toISOString() };
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    return data;
  }

  function clearProfile() {
    sessionStorage.removeItem(PROFILE_KEY);
  }

  async function loadConfig() {
    if (_config) return _config;
    const res = await fetch('groups-config.json', { cache: 'no-store' });
    _config = await res.json();
    return _config;
  }

  function getGroup(cfg, groupId) {
    return cfg.groups[groupId] || null;
  }

  function getLessonUnlockDate(group, lessonId) {
    const start = parseDate(group.startDate);
    return addDays(start, (lessonId - 1) * 7);
  }

  function isLessonUnlocked(group, lessonId, now) {
    now = now || new Date();
    const unlockAt = getLessonUnlockDate(group, lessonId);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today >= unlockAt;
  }

  function getLessonIdFromPage(cfg) {
    const file = location.pathname.split('/').pop();
    const lesson = cfg.lessons.find(l => l.file === file);
    return lesson ? lesson.id : null;
  }

  function progressKey(groupId, lessonId, studentName) {
    return `robovita_${groupId}_l${lessonId}_${slug(studentName)}`;
  }

  function showGate(title, message, actionsHtml) {
    document.documentElement.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.id = 'groupAccessGate';
    overlay.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(18,39,76,.92);z-index:99999;
        display:flex;align-items:center;justify-content:center;padding:20px;font-family:Nunito,sans-serif;">
        <div style="background:#fff;border-radius:24px;max-width:480px;width:100%;padding:28px;text-align:center;color:#2E4A17;">
          <div style="font-size:48px;margin-bottom:12px;">🔒</div>
          <h2 style="margin:0 0 12px;font-size:1.6rem;">${title}</h2>
          <p style="font-weight:700;line-height:1.5;margin-bottom:20px;">${message}</p>
          ${actionsHtml || ''}
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }

  async function guardLessonPage(options) {
    options = options || {};
    const cfg = await loadConfig();
    const profile = getProfile();

    if (!profile || !cfg.groups[profile.groupId]) {
      showGate(
        'Нужен вход в группу',
        'Сначала зайди через страницу группы и введи имя.',
        `<a href="vhod.html" style="display:inline-block;background:#61B01F;color:#fff;
          padding:12px 24px;border-radius:30px;font-weight:900;text-decoration:none;">→ Перейти ко входу</a>`
      );
      return null;
    }

    const group = cfg.groups[profile.groupId];
    const lessonId = options.lessonId || getLessonIdFromPage(cfg);

    if (!lessonId) return { profile, group, lessonId: null, cfg };

    if (!isLessonUnlocked(group, lessonId)) {
      const unlockAt = getLessonUnlockDate(group, lessonId);
      showGate(
        'Занятие пока закрыто',
        `Группа: <b>${group.title}</b><br>
         Это занятие откроется <b>${formatDate(unlockAt)}</b><br>
         <span style="font-size:.9rem;color:#64748b;">${group.scheduleLabel}</span>`,
        `<a href="karta-gruppy.html" style="display:inline-block;background:#61B01F;color:#fff;
          padding:12px 24px;border-radius:30px;font-weight:900;text-decoration:none;">← К карте группы</a>`
      );
      return null;
    }

    return { profile, group, lessonId, cfg, progressKey: progressKey(profile.groupId, lessonId, profile.studentName) };
  }

  global.GroupAccess = {
    loadConfig, getProfile, setProfile, clearProfile,
    getGroup, getLessonUnlockDate, isLessonUnlocked,
    getLessonIdFromPage, progressKey, slug,
    guardLessonPage, formatDate, addDays, parseDate
  };
})(window);