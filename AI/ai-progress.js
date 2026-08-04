/**
 * Общий прогресс занятий «ИИ-творец»:
 * имя ученика + сохранение в localStorage + сброс.
 *
 * Использование:
 *   RobovitaProgress.mount({
 *     key: 'robovita_l1',
 *     defaultName: 'Исследователь',
 *     host: '#progressProfileHost',
 *     getState: () => ({ ... }),
 *     applyState: (data) => { ... },
 *     onNameChange: (name) => { ... }
 *   });
 *   // после изменений прогресса:
 *   RobovitaProgress.save();
 */
(function (global) {
  const api = {
    _opts: null,
    _name: '',

    mount(opts) {
      this._opts = opts || {};
      const host = document.querySelector(opts.host || '#progressProfileHost');
      if (!host) {
        console.warn('RobovitaProgress: host not found');
        return;
      }

      host.innerHTML =
        '<div class="progress-profile">' +
        '<div class="pp-label">👤 Твой профиль</div>' +
        '<input class="pp-name" id="rpNameInput" type="text" maxlength="40" placeholder="Введи имя" autocomplete="nickname" />' +
        '<div class="pp-hello" id="rpHello">Привет!</div>' +
        '<button type="button" class="pp-reset" id="rpResetBtn">↺ Сбросить прогресс</button>' +
        '</div>';

      const input = host.querySelector('#rpNameInput');
      const hello = host.querySelector('#rpHello');
      const resetBtn = host.querySelector('#rpResetBtn');

      const saved = this.loadRaw();
      let name = (saved && saved.studentName) || '';
      if (!name) {
        const asked = prompt(opts.promptText || 'Как тебя зовут?');
        if (asked && asked.trim()) name = asked.trim();
      }
      if (!name) name = opts.defaultName || 'Ученик';
      this._name = name;
      input.value = name;
      this._renderHello(hello);

      if (saved && typeof opts.applyState === 'function') {
        try { opts.applyState(saved); } catch (e) { console.warn(e); }
      }

      input.addEventListener('change', () => {
        const v = input.value.trim() || (opts.defaultName || 'Ученик');
        this._name = v;
        input.value = v;
        this._renderHello(hello);
        if (typeof opts.onNameChange === 'function') opts.onNameChange(v);
        this.save();
      });

      resetBtn.addEventListener('click', () => this.reset());

      if (typeof opts.onNameChange === 'function') opts.onNameChange(this._name);
      if (typeof opts.onReady === 'function') opts.onReady(saved);
    },

    _renderHello(el) {
      if (el) el.textContent = 'Привет, ' + this._name + '!';
    },

    getName() {
      return this._name || (this._opts && this._opts.defaultName) || 'Ученик';
    },

    loadRaw() {
      if (!this._opts || !this._opts.key) return null;
      try {
        const raw = localStorage.getItem(this._opts.key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    save(extra) {
      if (!this._opts || !this._opts.key) return;
      try {
        const base = typeof this._opts.getState === 'function' ? (this._opts.getState() || {}) : {};
        const data = Object.assign({}, base, extra || {}, { studentName: this.getName() });
        localStorage.setItem(this._opts.key, JSON.stringify(data));
      } catch (e) {}
    },

    reset() {
      if (!this._opts || !this._opts.key) return;
      if (!confirm('Сбросить весь прогресс этого занятия? Имя можно будет ввести заново.')) return;
      try { localStorage.removeItem(this._opts.key); } catch (e) {}
      if (typeof this._opts.onReset === 'function') this._opts.onReset();
      else location.reload();
    }
  };

  global.RobovitaProgress = api;
})(window);
