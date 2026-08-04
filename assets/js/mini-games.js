/**
 * RoboMiniGame — мини-игры для уроков Roblox (РОБОВИТА)
 * Usage: RoboMiniGame.mount(el, { type, title, hint, ... })
 */
(function (global) {
  'use strict';

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function setStatus(node, text, ok) {
    if (!node) return;
    node.textContent = text;
    node.className = 'rmg-status' + (ok === true ? ' ok' : ok === false ? ' bad' : '');
  }

  function wrapShell(root, cfg) {
    root.classList.add('rmg');
    root.innerHTML =
      '<div class="rmg-head">' +
      '<span class="rmg-badge">🎮 Мини-игра</span>' +
      '<h2>' +
      (cfg.title || 'Проверь себя') +
      '</h2>' +
      (cfg.hint ? '<p class="rmg-hint">' + cfg.hint + '</p>' : '') +
      '</div>' +
      '<div class="rmg-body"></div>' +
      '<p class="rmg-status"></p>';
    return {
      body: root.querySelector('.rmg-body'),
      status: root.querySelector('.rmg-status'),
    };
  }

  /* ---- sortSlots: перетащи под номера ---- */
  function sortSlots(root, cfg) {
    var shell = wrapShell(root, cfg);
    var items = shuffle(cfg.items || []);
    var n = items.length;
    var html = '<div class="rmg-slots">';
    for (var i = 0; i < n; i++) {
      html +=
        '<div class="rmg-slot" data-i="' +
        i +
        '"><div class="rmg-num">' +
        (i + 1) +
        '</div><div class="rmg-slot-body" data-slot="' +
        i +
        '"></div></div>';
    }
    html +=
      '</div><p class="rmg-bank-label">Запас:</p><div class="rmg-bank" data-bank="1">';
    items.forEach(function (it, idx) {
      html +=
        '<div class="rmg-chip" draggable="true" data-text="' +
        it +
        '" id="rmgchip' +
        idx +
        '">' +
        it +
        '</div>';
    });
    html +=
      '</div><button type="button" class="action-btn rmg-check">Проверить порядок</button>' +
      '<button type="button" class="quiz-btn rmg-reset" style="margin-left:8px;">Сбросить</button>';
    shell.body.innerHTML = html;

    var dragEl = null;
    root.querySelectorAll('.rmg-chip').forEach(function (chip) {
      chip.addEventListener('dragstart', function () {
        dragEl = chip;
      });
    });
    function place(chip, targetBody) {
      if (!chip || !targetBody) return;
      var from = chip.parentElement;
      var existing = targetBody.querySelector('.rmg-chip');
      if (existing === chip) return;
      if (existing) {
        if (from && from.classList.contains('rmg-slot-body')) from.appendChild(existing);
        else root.querySelector('.rmg-bank').appendChild(existing);
      }
      targetBody.appendChild(chip);
      root.querySelectorAll('.rmg-slot').forEach(function (s) {
        s.classList.toggle('filled', !!s.querySelector('.rmg-chip'));
      });
    }
    root.querySelectorAll('.rmg-slot-body').forEach(function (body) {
      body.addEventListener('dragover', function (e) {
        e.preventDefault();
      });
      body.addEventListener('drop', function (e) {
        e.preventDefault();
        place(dragEl, body);
      });
    });
    var bank = root.querySelector('.rmg-bank');
    bank.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    bank.addEventListener('drop', function (e) {
      e.preventDefault();
      if (dragEl) bank.appendChild(dragEl);
      root.querySelectorAll('.rmg-slot').forEach(function (s) {
        s.classList.toggle('filled', !!s.querySelector('.rmg-chip'));
      });
    });
    root.querySelector('.rmg-check').addEventListener('click', function () {
      var got = [];
      var full = true;
      for (var i = 0; i < n; i++) {
        var c = root.querySelector('[data-slot="' + i + '"] .rmg-chip');
        if (!c) full = false;
        got.push(c ? c.dataset.text : null);
      }
      if (!full) {
        setStatus(shell.status, 'Заполни все номера — блоки можно перетаскивать.', false);
        return;
      }
      var ok = got.join('|') === (cfg.items || []).join('|');
      setStatus(
        shell.status,
        ok ? '🎉 Верно! Порядок правильный.' : 'Пока неверно — перетащи блоки на другие номера.',
        ok
      );
    });
    root.querySelector('.rmg-reset').addEventListener('click', function () {
      sortSlots(root, cfg);
    });
  }

  /* ---- findClicks: найди правильные объекты ---- */
  function findClicks(root, cfg) {
    var shell = wrapShell(root, cfg);
    var targets = cfg.targets || [];
    var decoys = cfg.decoys || [];
    var need = cfg.need || targets.length;
    var found = 0;
    var pool = shuffle(
      targets
        .map(function (t) {
          return { t: t, ok: true };
        })
        .concat(
          decoys.map(function (t) {
            return { t: t, ok: false };
          })
        )
    );
    shell.body.innerHTML =
      '<div class="rmg-find-grid"></div><p class="rmg-progress">Найдено: 0 / ' + need + '</p>';
    var grid = shell.body.querySelector('.rmg-find-grid');
    var prog = shell.body.querySelector('.rmg-progress');
    pool.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rmg-find-btn';
      btn.textContent = item.t;
      btn.addEventListener('click', function () {
        if (btn.dataset.done) return;
        btn.dataset.done = '1';
        if (item.ok) {
          btn.classList.add('good');
          found++;
          prog.textContent = 'Найдено: ' + found + ' / ' + need;
          if (found >= need) setStatus(shell.status, '🎉 Отлично! Все нужные объекты найдены.', true);
        } else {
          btn.classList.add('bad');
          setStatus(shell.status, 'Это лишнее. Ищи другое!', false);
        }
      });
      grid.appendChild(btn);
    });
  }

  /* ---- matchPick: сценарий → выбери ответ ---- */
  function matchPick(root, cfg) {
    var shell = wrapShell(root, cfg);
    var rounds = shuffle(cfg.rounds || []);
    var i = 0;
    var score = 0;
    function render() {
      if (i >= rounds.length) {
        shell.body.innerHTML =
          '<p style="font-weight:800;font-size:1.2rem;">Готово!</p>' +
          '<button type="button" class="action-btn rmg-again">Ещё раз</button>';
        setStatus(shell.status, 'Верно: ' + score + ' из ' + rounds.length, score === rounds.length);
        shell.body.querySelector('.rmg-again').onclick = function () {
          i = 0;
          score = 0;
          rounds = shuffle(cfg.rounds || []);
          render();
        };
        return;
      }
      var r = rounds[i];
      shell.body.innerHTML =
        '<div class="rmg-round"><p class="rmg-prompt">' +
        r.q +
        '</p><div class="rmg-opts"></div></div>' +
        '<p class="rmg-progress">Раунд ' +
        (i + 1) +
        ' / ' +
        rounds.length +
        '</p>';
      var opts = shell.body.querySelector('.rmg-opts');
      shuffle(r.options || []).forEach(function (opt) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'rmg-opt';
        b.textContent = opt;
        b.addEventListener('click', function () {
          var good = opt === r.answer;
          if (good) score++;
          setStatus(shell.status, good ? '✅ Верно!' : '❌ Правильно: ' + r.answer, good);
          i++;
          setTimeout(render, good ? 450 : 900);
        });
        opts.appendChild(b);
      });
    }
    render();
  }

  /* ---- whileTap: действуй, пока условие истинно ---- */
  function whileTap(root, cfg) {
    var shell = wrapShell(root, cfg);
    var hp = cfg.startHp || 5;
    var taps = 0;
    var maxTaps = cfg.goalTaps || 8;
    shell.body.innerHTML =
      '<div class="rmg-while">' +
      '<div class="rmg-hp">while HP &gt; 0 → HP = <strong id="rmgHp">' +
      hp +
      '</strong></div>' +
      '<p>Нажимай «Лечить», пока условие истинно. Цель: ' +
      maxTaps +
      ' успешных тиков цикла.</p>' +
      '<button type="button" class="action-btn" id="rmgHeal">💚 Лечить (−1 HP за тик)</button>' +
      '<button type="button" class="quiz-btn" id="rmgBreak" style="margin-left:8px;">⛔ break</button>' +
      '<p class="rmg-progress">Тиков while: <span id="rmgTaps">0</span> / ' +
      maxTaps +
      '</p>' +
      '</div>';
    var hpEl = shell.body.querySelector('#rmgHp');
    var tapsEl = shell.body.querySelector('#rmgTaps');
    function sync() {
      hpEl.textContent = hp;
      tapsEl.textContent = taps;
    }
    shell.body.querySelector('#rmgHeal').onclick = function () {
      if (hp <= 0) {
        setStatus(shell.status, 'Цикл уже остановился: условие HP > 0 ложно.', false);
        return;
      }
      taps++;
      hp--;
      sync();
      if (taps >= maxTaps && hp >= 0) {
        setStatus(shell.status, '🎉 Ты понял while: цикл крутится, пока условие истинно!', true);
      } else if (hp <= 0) {
        setStatus(
          shell.status,
          taps >= maxTaps
            ? '🎉 Цикл завершился сам — условие стало ложным.'
            : 'Цикл остановился (HP=0). Нажми «Ещё раз» через сброс страницы… Попробуй набрать ' +
              maxTaps +
              ' тиков: сброс ниже.',
          taps >= maxTaps
        );
      } else {
        setStatus(shell.status, 'Условие ещё истинно — цикл продолжается.', null);
      }
    };
    shell.body.querySelector('#rmgBreak').onclick = function () {
      hp = 0;
      sync();
      setStatus(shell.status, 'break вышел из цикла досрочно.', taps >= maxTaps);
    };
    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'quiz-btn';
    reset.style.marginTop = '8px';
    reset.textContent = 'Сбросить игру';
    reset.onclick = function () {
      whileTap(root, cfg);
    };
    shell.body.appendChild(reset);
  }

  /* ---- colorStack: собери цветные блоки ---- */
  function colorStack(root, cfg) {
    var shell = wrapShell(root, cfg);
    var need = cfg.need || 6;
    var collected = 0;
    var colors = cfg.colors || [
      '#ef4444',
      '#f59e0b',
      '#eab308',
      '#22c55e',
      '#06b6d4',
      '#3b82f6',
      '#a855f7',
      '#ec4899',
    ];
    shell.body.innerHTML =
      '<div class="rmg-fountain"><div class="rmg-pool" id="rmgPool"></div></div>' +
      '<div class="rmg-color-row" id="rmgColors"></div>' +
      '<p class="rmg-progress">В фонтане: 0 / ' +
      need +
      '</p>';
    var pool = shell.body.querySelector('#rmgPool');
    var row = shell.body.querySelector('#rmgColors');
    var prog = shell.body.querySelector('.rmg-progress');
    function spawn() {
      row.innerHTML = '';
      shuffle(colors)
        .slice(0, 5)
        .forEach(function (c) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'rmg-ball';
          b.style.background = c;
          b.title = 'Color3';
          b.onclick = function () {
            if (collected >= need) return;
            var drop = document.createElement('span');
            drop.className = 'rmg-drop';
            drop.style.background = c;
            pool.appendChild(drop);
            collected++;
            prog.textContent = 'В фонтане: ' + collected + ' / ' + need;
            if (collected >= need) {
              setStatus(shell.status, '🎉 Фонтан готов! Числа + цвет = Color3.fromRGB.', true);
            } else {
              setStatus(shell.status, 'Блок добавлен (как Part с цветом).', null);
              spawn();
            }
          };
          row.appendChild(b);
        });
    }
    spawn();
  }

  /* ---- hierarchyKids: кликай только детей родителя ---- */
  function hierarchyKids(root, cfg) {
    var shell = wrapShell(root, cfg);
    var parentName = cfg.parent || 'Model';
    var kids = cfg.kids || [];
    var others = cfg.others || [];
    var need = kids.length;
    var found = 0;
    shell.body.innerHTML =
      '<p><strong>Parent:</strong> ' +
      parentName +
      ' · кликай только то, что вернёт GetChildren()</p>' +
      '<div class="rmg-tree"></div><p class="rmg-progress">Детей найдено: 0 / ' +
      need +
      '</p>';
    var tree = shell.body.querySelector('.rmg-tree');
    var prog = shell.body.querySelector('.rmg-progress');
    var nodes = shuffle(
      kids
        .map(function (k) {
          return { t: k, ok: true };
        })
        .concat(
          others.map(function (k) {
            return { t: k, ok: false };
          })
        )
    );
    nodes.forEach(function (n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rmg-tree-node';
      b.textContent = n.t;
      b.onclick = function () {
        if (b.dataset.done) return;
        b.dataset.done = '1';
        if (n.ok) {
          b.classList.add('good');
          found++;
          prog.textContent = 'Детей найдено: ' + found + ' / ' + need;
          if (found >= need)
            setStatus(shell.status, '🎉 Верно: GetChildren() вернул только прямых детей.', true);
        } else {
          b.classList.add('bad');
          setStatus(shell.status, 'Это не прямой ребёнок ' + parentName + '.', false);
        }
      };
      tree.appendChild(b);
    });
  }

  /* ---- lineOrder: собери строки кода (клик по порядку) ---- */
  function lineOrder(root, cfg) {
    var shell = wrapShell(root, cfg);
    var lines = cfg.lines || [];
    var next = 0;
    shell.body.innerHTML =
      '<pre class="rmg-code-out" id="rmgOut"><span class="rmg-muted">// кликай строки по порядку</span></pre>' +
      '<div class="rmg-lines" id="rmgLines"></div>';
    var out = shell.body.querySelector('#rmgOut');
    var box = shell.body.querySelector('#rmgLines');
    shuffle(lines).forEach(function (line, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rmg-line';
      b.textContent = line;
      b.dataset.i = String(cfg.lines.indexOf(line));
      b.onclick = function () {
        if (b.disabled) return;
        if (parseInt(b.dataset.i, 10) === next) {
          b.disabled = true;
          b.classList.add('good');
          if (next === 0) out.textContent = '';
          out.textContent += line + '\n';
          next++;
          if (next >= lines.length) setStatus(shell.status, '🎉 Скрипт собран правильно!', true);
          else setStatus(shell.status, 'Дальше строка ' + (next + 1) + '…', null);
        } else {
          b.classList.add('bad');
          setStatus(shell.status, 'Не тот порядок. Смотри, что должно быть раньше.', false);
          setTimeout(function () {
            b.classList.remove('bad');
          }, 400);
        }
      };
      box.appendChild(b);
    });
  }

  var TYPES = {
    sortSlots: sortSlots,
    findClicks: findClicks,
    matchPick: matchPick,
    whileTap: whileTap,
    colorStack: colorStack,
    hierarchyKids: hierarchyKids,
    lineOrder: lineOrder,
  };

  global.RoboMiniGame = {
    mount: function (el, cfg) {
      if (!el || !cfg || !cfg.type || !TYPES[cfg.type]) return;
      TYPES[cfg.type](el, cfg);
    },
  };
})(window);
