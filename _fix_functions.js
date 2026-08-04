const fs = require('fs');
const path = 'd:/AICOURSE/airoblox/Занятие_4.1.12_Функции.html';
let html = fs.readFileSync(path, 'utf8');

// 1) Fix map download links
html = html.replace(/assets\/downloads\/Zombie_apocalypse\.rbxl/g, 'assets/downloads/функции.rbxl');
html = html.replace(/Zombie_apocalypse\.rbxl/g, 'функции.rbxl');
html = html.replace(
  /download(?!=)/g,
  (m, offset) => {
    // only touch download attrs near функции - skip global replace
    return m;
  }
);
// Fix download attributes properly
html = html.replace(
  /href="assets\/downloads\/функции\.rbxl" download(?![=\w])/g,
  'href="assets/downloads/функции.rbxl" download="функции.rbxl"'
);
html = html.replace(
  /href="assets\/downloads\/функции\.rbxl" download>/g,
  'href="assets/downloads/функции.rbxl" download="функции.rbxl">'
);

// Update map note about contents if still generic
html = html.replace(
  /<b>В Workspace уже есть:<\/b> <code>MovingBlocks<\/code>, <code>Flowers<\/code>, <code>wiresGui<\/code>, <code>DayNight<\/code> и другие объекты для заданий\./,
  '<b>На карте уже есть:</b> <code>MovingBlock</code> / MovingBlock1…, папка <code>Flowers</code>, <code>wiresGui</code>, заготовки под <code>DayNight</code> и другие объекты для заданий.'
);

// 2) Insert story card after scenario-box closing
const storyCard = `
  <div class="card" id="story">
    <h2>📖 История миссии</h2>
    <div class="theory-section">
      <h3>Глава 1. Ловушки в чаще</h3>
      <p>Лиам расставил платформы <b>MovingBlock</b>. Они должны подниматься и опускаться без конца.
        Если копировать один и тот же цикл дважды — код раздуется. Решение: функция <code>move()</code> и цикл <code>while true</code>.</p>
    </div>
    <div class="theory-section">
      <h3>Глава 2. Цветы-защитники</h3>
      <p>В лесу растут светящиеся цветы. При касании цветок растёт и отгоняет зомби.
        Нужна функция <code>growth(flower)</code> с <b>аргументом</b> — одна логика для любого цветка.</p>
    </div>
    <div class="theory-section">
      <h3>Глава 3. Электрический щиток</h3>
      <p>В доме щиток <b>wiresGui</b>: кнопки соединяют провода. Функции <code>setPoint</code> и <code>click</code>
        держат порядок — иначе кнопки начнут путаться.</p>
    </div>
    <div class="theory-section">
      <h3>Глава 4. День и ночь</h3>
      <p>Ночью зомби смелее. Кнопки в <b>DayNight</b> вызывают <code>Day()</code> и <code>Night()</code>
        и меняют освещение. Одна кнопка — один вызов функции.</p>
    </div>
  </div>
`;

if (!html.includes('id="story"')) {
  html = html.replace(
    /(<div class="scenario-box">[\s\S]*?<\/div>\s*<\/div>)/,
    `$1\n${storyCard}`
  );
}

// 3) Replace theory block (from topic-functions to before cheat-sheet)
const newTheory = `  <!-- ===== ТЕОРИЯ: ФУНКЦИИ ===== -->
  <div class="card" id="theory">
    <h2><span class="num">0</span> Теория: функции в Lua</h2>

    <div class="theory-section">
      <h3>📦 Что такое функция?</h3>
      <p>Функция — это <b>именованный кусок кода</b>, который можно вызвать сколько угодно раз.
        Без функций одно и то же приходится копировать. С функцией — написал один раз, вызываешь по имени.</p>
      <div class="code-block">
        <span class="keyword">local function</span> <span class="func">sayHi</span>()<br>
        &nbsp;&nbsp;<span class="func">print</span>(<span class="string">"Привет, Лиам!"</span>)<br>
        <span class="keyword">end</span><br><br>
        <span class="func">sayHi</span>() <span class="comment">-- вызов</span><br>
        <span class="func">sayHi</span>() <span class="comment">-- ещё раз</span>
      </div>
      <table class="prop-table">
        <tr><th>Часть</th><th>Зачем</th></tr>
        <tr><td><code>function</code> … <code>end</code></td><td>Объявление функции</td></tr>
        <tr><td><code>sayHi()</code></td><td>Вызов — запуск тела функции</td></tr>
      </table>
    </div>

    <div class="theory-section">
      <h3>📥 Аргументы — данные «внутрь»</h3>
      <p>Аргумент — значение, которое ты передаёшь функции. Внутри функции это обычная переменная.</p>
      <div class="code-block">
        <span class="keyword">local function</span> <span class="func">growth</span>(flower)<br>
        &nbsp;&nbsp;flower.Size = flower.Size + Vector3.new(<span class="number">0</span>, <span class="number">1</span>, <span class="number">0</span>)<br>
        <span class="keyword">end</span><br><br>
        <span class="func">growth</span>(flower1)<br>
        <span class="func">growth</span>(flower2)
      </div>
      <div class="space-note">
        💡 Одна функция — много цветов. Меняется только аргумент.
      </div>
    </div>

    <div class="theory-section">
      <h3>↩️ return — результат «наружу»</h3>
      <p><code>return</code> отдаёт значение туда, откуда функцию вызвали, и завершает функцию.</p>
      <div class="code-block">
        <span class="keyword">local function</span> <span class="func">sum</span>(a, b)<br>
        &nbsp;&nbsp;<span class="keyword">return</span> a + b<br>
        <span class="keyword">end</span><br><br>
        <span class="keyword">local</span> s = <span class="func">sum</span>(<span class="number">3</span>, <span class="number">4</span>) <span class="comment">-- s = 7</span>
      </div>
    </div>

    <div class="theory-section">
      <h3>🔄 Функция + цикл</h3>
      <p>Ловушки Лиама работают вечно: внутри <code>while true</code> вызываем <code>move()</code>.</p>
      <div class="code-block">
        <span class="keyword">while</span> <span class="keyword">true</span> <span class="keyword">do</span><br>
        &nbsp;&nbsp;<span class="func">move</span>()<br>
        &nbsp;&nbsp;<span class="func">wait</span>()<br>
        <span class="keyword">end</span>
      </div>
    </div>

    <div class="interactive-box" id="quizFuncSyntax">
      <h3>⚡ Где правильно написана функция?</h3>
      <div class="choice-card" data-correct-choice="true"><span class="kw">function</span> func()<br>&nbsp;&nbsp;<span class="kw">end</span></div>
      <div class="choice-card" data-correct-choice="false"><span class="kw">func</span> func()<br>&nbsp;&nbsp;<span class="kw">end</span></div>
      <div class="choice-card" data-correct-choice="false"><span class="kw">function</span> func<br>&nbsp;&nbsp;<span class="kw">end</span></div>
      <button class="action-btn" onclick="checkChoices('quizFuncSyntax')">Проверить</button>
      <button class="action-btn" style="background:#64748b;box-shadow:0 4px 0 #334155;" onclick="resetQuiz('quizFuncSyntax')">Ещё раз</button>
      <div class="activity-result"></div>
    </div>

    <div class="interactive-box" id="quizReturn" style="margin-top:1.2rem;">
      <h3>⚡ Что делает команда <code>return</code>?</h3>
      <div class="choice-card text-opt" data-correct-choice="true">Возвращает результат функции</div>
      <div class="choice-card text-opt" data-correct-choice="false">Показывает, как функция работает</div>
      <div class="choice-card text-opt" data-correct-choice="false">Даёт функции работать</div>
      <div class="choice-card text-opt" data-correct-choice="false">Ерунда какая-то</div>
      <button class="action-btn" onclick="checkChoices('quizReturn')">Проверить</button>
      <button class="action-btn" style="background:#64748b;box-shadow:0 4px 0 #334155;" onclick="resetQuiz('quizReturn')">Ещё раз</button>
      <div class="activity-result"></div>
    </div>

    <div class="interactive-box" id="quizArg" style="margin-top:1.2rem;">
      <h3>⚡ Зачем аргумент в <code>growth(flower)</code>?</h3>
      <div class="choice-card text-opt" data-correct-choice="true">Чтобы одна функция работала с разными цветами</div>
      <div class="choice-card text-opt" data-correct-choice="false">Чтобы удалить функцию</div>
      <div class="choice-card text-opt" data-correct-choice="false">Чтобы остановить цикл</div>
      <div class="choice-card text-opt" data-correct-choice="false">Аргумент не нужен никогда</div>
      <button class="action-btn" onclick="checkChoices('quizArg')">Проверить</button>
      <button class="action-btn" style="background:#64748b;box-shadow:0 4px 0 #334155;" onclick="resetQuiz('quizArg')">Ещё раз</button>
      <div class="activity-result"></div>
    </div>
  </div>

  <!-- ===== МИНИ-ИГРА ===== -->
  <div id="lessonMiniGame" class="rmg"></div>
  <script src="assets/js/mini-games.js"></script>
  <script>
    RoboMiniGame.mount(document.getElementById('lessonMiniGame'), {
      type: 'matchPick',
      title: 'Какую функцию вызвать? — Лес Лиама',
      hint: 'Выбери правильную функцию под задачу защиты от зомби.',
      rounds: [
        { q: 'Платформа должна ездить вверх-вниз снова и снова', options: ['move()', 'growth(flower)', 'Day()', 'print()'], answer: 'move()' },
        { q: 'Нужно увеличить именно этот цветок', options: ['growth(flower)', 'move()', 'Night()', 'wait()'], answer: 'growth(flower)' },
        { q: 'Одинаковый код в 3 местах — что сделать?', options: ['Вынести в function', 'Скопировать 3 раза', 'Удалить код', 'Только wait()'], answer: 'Вынести в function' },
        { q: 'Функция должна отдать число наружу', options: ['return', 'break', 'continue', 'Connect'], answer: 'return' },
        { q: 'Нажали кнопку «ночь» на GUI', options: ['Night()', 'Day()', 'move()', 'Destroy()'], answer: 'Night()' },
        { q: 'function heal() … end — что это?', options: ['Объявление функции', 'Цикл', 'Событие', 'Part'], answer: 'Объявление функции' }
      ]
    });
  </script>

`;

const theoryStart = html.indexOf('<!-- ===== ТЕОРИЯ: ФУНКЦИИ ===== -->');
const cheatStart = html.indexOf('<!-- ===== ШПАРГАЛКА ===== -->');
if (theoryStart === -1 || cheatStart === -1) {
  console.error('markers not found', theoryStart, cheatStart);
  process.exit(1);
}
html = html.slice(0, theoryStart) + newTheory + html.slice(cheatStart);

// 4) Remove duplicate mini-game at bottom
html = html.replace(/\s*<!-- ===== МИНИ-ИГРА ===== -->\s*<div id="lessonMiniGame"[\s\S]*?<\/script>\s*(?=<div class="lesson-nav">)/, '\n  ');

// 5) Add .num style if missing
if (!html.includes('.num {') && !html.includes('.num{')) {
  html = html.replace(
    '.map-card .dl:hover { background: #4C8C18; }',
    `.map-card .dl:hover { background: #4C8C18; }
    .num {
      display: inline-flex; align-items: center; justify-content: center;
      width: 1.6em; height: 1.6em; border-radius: 50%; margin-right: 6px;
      background: var(--primary-light,#e8f5e0); color: var(--primary-dark,#1a4a0a); font-weight: 800;
    }`
  );
}

// Tighten scenario opening paragraph (optional replace first strong block)
html = html.replace(
  /<strong>Великая битва с зомби!<\/strong>[\s\S]*?<strong>Давай поможем Лиаму и будем сражаться против зомби вместе!<\/strong>/,
  `<strong>Операция «Лес Лиама»</strong><br>
      Город пал под зомби-вирусом. Юный учёный <strong>Лиам</strong> укрылся в лесу и строит защиту из <b>функций</b>:
      один раз написал код — вызываешь снова и снова. Твоя задача — оживить ловушки, цветы, щиток и переключатель дня и ночи.`
);

fs.writeFileSync(path, html, 'utf8');
console.log('ok');
console.log('функции links', (html.match(/функции\.rbxl/g) || []).length);
console.log('zombie left', (html.match(/Zombie_apocalypse/g) || []).length);
console.log('story', html.includes('id="story"'));
console.log('mini after theory', html.indexOf('lessonMiniGame') < html.indexOf('ЗАДАНИЕ 1'));
console.log('video left', html.includes('Посмотри видео'));
