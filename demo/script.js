// ===== ДАННЫЕ ПО БЛОКАМ SCRATCH С СИМВОЛЬНЫМИ ИЗОБРАЖЕНИЯМИ =====
const blockData = {
  events: {
    name: 'События',
    color: '#f9b93b',
    colorName: 'жёлтый',
    description: 'Запускают программу. Без блока «когда зелёный флаг нажат» игра не начнётся!',
    blocks: [
      { label: 'flag.png', desc: 'Запускает программу при клике на флаг' },
      { label: 'btnpressed.png', desc: 'Запускает код при нажатии клавиши' },
      { label: 'msga.png', desc: 'Запускает код при получении сигнала' }
    ]
  },
  motion: {
    name: 'Движение',
    color: 'rgb(76, 151, 255)',
    colorName: 'синий',
    description: 'Управляют перемещением персонажа по сцене.',
    blocks: [
      { label: '10steps.png', desc: 'Двигает спрайт вперёд на указанное расстояние' },
      { label: '15degrees.png', desc: 'Поворачивает спрайт вправо или влево' },
      { label: 'toxy.png', desc: 'Мгновенно перемещает спрайт в точку' },
      { label: 'swim.png', desc: 'Плавно перемещает спрайт за время' }
    ]
  },
  sensing: {
    name: 'Сенсоры',
    color: 'rgb(92, 177, 214)',
    colorName: 'бирюзовый',
    description: 'Позволяют получать информацию извне: касания, звук, вопросы.',
    blocks: [
      { label: 'cursor.png', desc: 'Проверяет касание указателя мыши' },
      { label: 'color.png', desc: 'Проверяет касание цвета' },
      { label: 'askandwait.png', desc: 'Выводит вопрос и ждёт ответ' },
      { label: 'btnpressedwait.png', desc: 'Проверяет нажатие на клавишу' }
    ]
  },
  control: {
    name: 'Управление',
    color: 'rgb(255, 171, 25)',
    colorName: 'светло-оранжевый',
    description: 'Структуры для управления потоком программы: циклы и условия.',
    blocks: [
      { label: 'always.png', desc: 'Бесконечный цикл — повторяет код постоянно' },
      { label: 'if.png', desc: 'Выполняет код, если условие истинно' },
      { label: 'ifelse.png', desc: 'Выполняет один блок, если условие истинно, и другой — если нет' },
      { label: 'repeat10.png', desc: 'Цикл с заданным количеством повторений' },
      { label: 'wait1.png', desc: 'Приостанавливает программу' }
    ]
  },
  looks: {
    name: 'Внешний вид',
    color: '#8b5cf6',
    colorName: 'фиолетовый',
    description: 'Меняют внешний вид спрайта: костюмы, размер, цвет.',
    blocks: [
      { label: 'changecost.png', desc: 'Изменяет у объекта костюм' },
      { label: 'chgsize.png', desc: 'Увеличивает или уменьшает спрайт' },
      { label: 'chgcolor.png', desc: 'Изменяет цвет спрайта' },
      { label: 'showhide.png', desc: 'Делает спрайт видимым или невидимым' }
    ]
  },
  sound: {
    name: 'Звук',
    color: '#ec4899',
    colorName: 'розовый',
    description: 'Управляют звуками и музыкой.',
    blocks: [
      { label: 'sound.png', desc: 'Воспроизводит выбранный звук' },
      { label: 'soundend.png', desc: 'Воспроизводит звук полностью' },
      { label: 'chgvol.png', desc: 'Изменяет громкость звука' }
    ]
  },
  variables: {
    name: 'Переменные',
    color: 'rgb(255, 140, 26)',
    colorName: 'оранжевый',
    description: 'Хранят данные: счёт, время, имена.',
    blocks: [
      { label: 'var.png', desc: 'Присваивает переменной значение' },
      { label: 'chgvar.png', desc: 'Увеличивает или уменьшает переменную' },
      { label: 'showvar.png', desc: 'Отображает значение на сцене' }
    ]
  },
  operators: {
    name: 'Операторы',
    color: 'rgb(89, 192, 89)',
    colorName: 'зелёный',
    description: 'Математические и логические операции.',
    blocks: [
      { label: 'plus.png', desc: 'Сложение двух чисел' },
      { label: 'more.png', desc: 'Проверка, что первое число больше второго' },
      { label: 'pluss.png', desc: 'Склеивает две строки в одну' },
      { label: 'rand.png', desc: 'Генерирует случайное число' }
    ]
  }
};

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let userData = { name: '', phone: '' };
let selectedFile = null;
let currentMode = '';
let visualStep = 0;
let tasksDone = 0;
const totalVisualSteps = 6;

const SUPABASE_URL = 'https://piksihxtikbqrinuaoum.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qjsWhZW3jrIHmQFAElWH6A_sVipc5Pw';

// ===== ВИЗУАЛЬНЫЕ ШАГИ =====
const visualSteps = [
{
  title: 'Что такое Scratch?',
  desc: `
    <p><strong>Scratch</strong> — это визуальная среда программирования, где вместо сложного кода ты используешь <strong>цветные блоки</strong>, как детали конструктора.</p>
    <p style="margin-top:0.5rem;">Каждый блок отвечает за определённое действие. Собирая их вместе, ты создаёшь настоящие программы — игры, мультфильмы и приложения!</p>
    
    <div style="background:#eaf3fe; border-radius:16px; padding:1rem 1.2rem; margin:1rem 0;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.3rem;">🧠 Зачем изучать блочное программирование?</p>
      <ul style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.6;">
        <li><strong>Понимание алгоритмов</strong> — учишься мыслить пошагово и логически</li>
        <li><strong>Развитие мышления</strong> — тренируешь внимание, память и креативность</li>
        <li><strong>База для будущего</strong> — все принципы работают и в «взрослых» языках (Python, C++)</li>
        <li><strong>Мгновенный результат</strong> — видишь, как твой код оживает на экране</li>
        <li><strong>Творчество</strong> — можешь создавать любые игры и истории без ограничений</li>
      </ul>
    </div>

    <p style="font-size:0.9rem; color:#4b6a8a; margin:0.8rem 0 0.5rem;">🎮 <strong>Примеры игр, которые можно создать на Scratch:</strong></p>
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin-bottom:1rem;">
      <div style="background:#f8fcff; border-radius:14px; padding:0.6rem; border:2px solid #d0ddee; text-align:center;">
        <iframe src="https://scratch.mit.edu/projects/1127866308/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
        <div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Платформер</div>
        <div style="font-size:0.7rem; color:#4b6a8a;">Прыгай по платформам</div>
      </div>
      <div style="background:#f8fcff; border-radius:14px; padding:0.6rem; border:2px solid #d0ddee; text-align:center;">
        <iframe src="https://scratch.mit.edu/projects/377874630/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
        <div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Кликер</div>
        <div style="font-size:0.7rem; color:#4b6a8a;">Собирай очки, просто кликая на экран</div>
      </div>
      <div style="background:#f8fcff; border-radius:14px; padding:0.6rem; border:2px solid #d0ddee; text-align:center;">
        <iframe src="https://scratch.mit.edu/projects/38041040/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
        <div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Гонки</div>
        <div style="font-size:0.7rem; color:#4b6a8a;">Управляй машиной</div>
      </div>
      <div style="background:#f8fcff; border-radius:14px; padding:0.6rem; border:2px solid #d0ddee; text-align:center;">
        <iframe src="https://scratch.mit.edu/projects/421095134/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
        <div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Пазл</div>
        <div style="font-size:0.7rem; color:#4b6a8a;">Собирай картинку</div>
      </div>
    </div>

    <p style="font-size:0.9rem; color:#4b6a8a; margin:0.5rem 0;">👆 <strong>Нажми на любую категорию</strong>, чтобы увидеть примеры блоков и их описание.</p>
    <div class="blocks-grid" id="blocksGrid">
      <div class="block-card" data-block="events"><span class="color-dot" style="background:#f9b93b;"></span><span class="cat-name">События</span><div class="cat-desc">Запуск программы</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="motion"><span class="color-dot" style="background:#3b82f6;"></span><span class="cat-name">Движение</span><div class="cat-desc">Перемещение спрайтов</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="sensing"><span class="color-dot" style="background:#22c55e;"></span><span class="cat-name">Сенсоры</span><div class="cat-desc">Касания, вопросы</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="control"><span class="color-dot" style="background:#f97316;"></span><span class="cat-name">Управление</span><div class="cat-desc">Циклы, условия</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="looks"><span class="color-dot" style="background:#8b5cf6;"></span><span class="cat-name">Внешность</span><div class="cat-desc">Костюмы, размер</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="sound"><span class="color-dot" style="background:#ec4899;"></span><span class="cat-name">Звук</span><div class="cat-desc">Музыка, эффекты</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="variables"><span class="color-dot" style="background:#ef4444;"></span><span class="cat-name">Переменные</span><div class="cat-desc">Счёт, данные</div><div class="click-hint">👆 нажми</div></div>
      <div class="block-card" data-block="operators"><span class="color-dot" style="background:#6366f1;"></span><span class="cat-name">Операторы</span><div class="cat-desc">Математика, сравнения</div><div class="click-hint">👆 нажми</div></div>
    </div>
    <p style="margin-top:0.5rem; font-size:0.95rem; color:#4b6a8a;">💡 Для создания игры мы будем использовать все категории из списка!
    <br><br><p>Если готов приступить к созданию первой игры, кликай ниже на <strong>следующий шаг</strong>!</p>
    `,
  tags: ['Знакомство', 'Теория']
  },
{
  title: 'Робот и управление',
  desc: `
    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">🤖 Шаг 1: Загрузи спрайт робота</p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Скачай спрайт робота по кнопке ниже (или нарисуй сам)</li>
        <li>В Scratch наведи на котика с плюсиком и выбери <strong>«Загрузить спрайт»</strong> (иконка загрузки)</li>
        <li>Выбери скачанный файл <strong>robot.png</strong></li>
      </ol>
      <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin:0.8rem 0;">
        <a href="robot.png" download="robot.png" class="btn-primary gold" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
          ⬇️ Скачать спрайт робота
        </a>
        <button class="btn-primary outline" onclick="showToast('📁 В Scratch: наведи мышь на иконку с котиком → нажми на «Загрузить спрайт» и выбери robot.png')">📖 Как загрузить?</button>
      </div>
      <div style="background:#fef9e7; border-radius:12px; padding:0.6rem 1rem; border-left:4px solid #f9b93b; font-size:0.9rem; color:#6b4f1a;">
        💡 <strong>Совет:</strong> Если хочешь, можешь нарисовать своего робота в редакторе Scratch — нажми «Нарисовать спрайт» (кисточка).
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">⚙️ Шаг 2: Программируем движение робота</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Собери эти блоки в области скриптов:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <div style="background:#f8fcff; border-radius:14px; padding:0.6rem; border:2px solid #d0ddee; text-align:center;">
          <img src="step1.png"/>
        </div>
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«когда зелёный флаг нажат»</strong> из <span class="block-tag">События</span></li>
          <li>Прикрепи к нему блок <strong>«показаться»</strong> из <span class="block-tag purple">Внешний вид</span></li>
          <li>Дальше следует блок цикла <strong>«повторять всегда»</strong> из <span class="block-tag light-orange">Управление</span></li>
          <li>Внутрь «повторять всегда» положи блок <strong>«установить x в ( )»</strong> из <span class="block-tag blue">Движение</span></li>
          <li>И вместо числа в блоке «установить x в ( )» положи блок <strong>«x мыши»</strong> из <span class="block-tag light-blue">Сенсоры</span></li>
          <li>Нажми на зелёный флаг — робот начнёт двигаться за мышкой!</li>
        </ol>
      </div>
    </div>

    <div style="background:#f0fdf4; border-radius:12px; padding:0.8rem 1rem; border-left:4px solid #22c55e;">
      <p style="font-weight:600; font-size:0.95rem; color:#14532d;">✅ Что должно получиться:</p>
      <p style="font-size:0.9rem; color:#14532d;">Робот появляется на сцене и двигается за курсором мыши. Попробуй подвигать мышкой — он будет следовать за ней!</p>
    </div>
  `,
  tags: ['События', 'Движение', 'Управление']
},
{
  title: 'Батарейка',
  desc: `
    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">🔋 Шаг 1: Загрузи спрайт батарейки</p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Скачай спрайт батарейки по кнопке ниже</li>
        <li>В Scratch наведи на котика с плюсиком и выбери <strong>«Загрузить спрайт»</strong> (иконка загрузки)</li>
        <li>Выбери скачанный файл <strong>battery.png</strong></li>
      </ol>
      <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin:0.8rem 0;">
        <a href="battery.png" download="battery.png" class="btn-primary gold" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
          ⬇️ Скачать спрайт батарейки
        </a>
        <button class="btn-primary outline" onclick="showToast('📁 В Scratch: наведи мышь на иконку с котиком → нажми на «Загрузить спрайт» и выбери battery.png')">📖 Как загрузить?</button>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">⚡ Шаг 2: Программируем движение батарейки</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Собери эти блоки для спрайта <strong>Батарейки</strong>:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step2-1.png" alt="Блоки для батарейки" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«когда зелёный флаг нажат»</strong> из <span class="block-tag">События</span></li>
          <li>Прикрепи к нему блок цикла <strong>«повторять всегда»</strong> из <span class="block-tag light-orange">Управление</span></li>
          <li>Внутри цикла положи блок <strong>«показаться»</strong> из <span class="block-tag purple">Внешность</span></li>
          <li>Затем блок <strong>«перейти в x: () y: ()»</strong> из <span class="block-tag purple">Движение</span><br>Вместо числа после «x:» вставляем блок <strong>«выдать случайное от ( ) до ( )»</strong> из <span class="block-tag blue">Операторы</span> и пишем числа <strong>"от -200 до 200"</strong><br>Число после «y:» равняется <strong>120</strong>. Так наша батарейка будет появляться сверху в случайном месте.</li>
          <li>Дальше следует блок цикла <strong>«повторять пока не ( )»</strong> из <span class="block-tag light-orange">Управление</span>. Внутри него вставляем блок условия <strong>< > или < ></strong> из <span class="block-tag blue">Операторы</span><br>Внутри первого условия кладём блок <strong>«касается (указатель мыши) ?»</strong> из <span class="block-tag green">Сенсоры</span> и меняем на <strong>край</strong><br>Внутри второго условия кладём такой же блок <strong>«касается (указатель мыши) ?»</strong> и меняем на <strong>robot</strong><br>Этот цикл проверяет, касается ли наша батарейка края экрана или нашего робота.
            <div style="background:#fef9e7; border-radius:12px; padding:0.6rem 1rem; margin-top:0.8rem; border-left:4px solid #f9b93b; font-size:0.9rem; color:#6b4f1a;">
              💡 <strong>Внимание:</strong> На фотографиях названия могут отличаться от твоих, не волнуйся!
            </div>
          </li>
          <li>Осталось внутрь нашего блока <strong>«повторять пока не»</strong> положить блок <strong>«изменить y на ( )»</strong> из <span class="block-tag purple">Движение</span> и поменять число на -5.</li>
          <li>Нажми на зелёный флаг — батарейка начнёт падать с неба! Если робот её коснётся или она коснётся края экрана, батарейка исчезнет и появится новая!</li>
        </ol>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">⚡ Шаг 3: Добавляем звуки к спрайту</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">В следующих шагах мы будем использовать блоки для воспроизведения звуков.</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;"><strong>Для добавления звука сделай следующее:</strong></p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Открой вкладку «Звуки» над средой программирования:<br>
          <img src="zvuk-tab.png" alt="Вкладка Звуки" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
        <li>Нажми на кнопку «Выбрать звук» внизу:<br>
          <img src="zvuk1.png" alt="Кнопка выбора звука" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
        <li>В строке поиска напиши <strong>Pop</strong> и нажми на найденный звук:<br>
          <img src="zvuk2.png" alt="Поиск звука Pop" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
      </ol>
      <p style="color:#1a3c61; font-size:0.95rem; margin-top:0.5rem;">Всё! Звук добавлен и мы можем использовать его в коде.</p>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">💥 Шаг 4: Программируем добавление очков при касании робота</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Добавь этот блок кода в нашу ранее созданную программу <strong>Батарейки</strong>:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step2-2.png" alt="Блоки для счёта" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«если < >, то»</strong> из <span class="block-tag light-orange">Управление</span> и поставь его после блока <strong>«изменить y на -5»</strong><br>Добавь ему условие:<br>Возьми блок <strong>«касается (указатель мыши) ?»</strong> из <span class="block-tag light-blue">Сенсоры</span> и поменяй на <strong>robot</strong></li>
          <li>Сейчас мы создадим свою первую переменную для того, чтобы добавить в игру счёт.
            <div style="background:#fef9e7; border-radius:12px; padding:0.6rem 1rem; margin-top:0.8rem; border-left:4px solid #f9b93b; font-size:0.9rem; color:#6b4f1a;">
              💡 <strong>Переменная</strong> — это как коробочка с именем. Представь, что у тебя есть коробочка, на которой написано имя. Ты можешь положить туда что угодно: число, слово, счёт.
            </div>
            Добавь внутрь блока <strong>«если < >, то»</strong> блок <strong>«изменить [ ] на 1»</strong> из <span class="block-tag orange">Переменные</span>. Ты можешь поменять название переменной, нажми на неё и выбери «переименовать переменную»:<br>
            <img src="chgname.png" alt="Переименование переменной" style="max-width:100%; border-radius:8px; margin-top:4px;"><br>
            Поздравляем! Ты создал свою <strong>первую переменную</strong>!
          </li>
          <li>Следующим блоком будет <strong>«включить звук ( )»</strong> из <span class="block-tag pink">Звук</span>. По умолчанию может сразу стоять звук <strong>Pop</strong>, если нет — нажми на название звука и выбери нужный.</li>
          <li>Нажми на зелёный флаг — теперь при касании батарейки роботом будет проигрываться звук и добавляться счёт!</li>
        </ol>
      </div>
    </div>

    <div style="background:#f0fdf4; border-radius:12px; padding:0.8rem 1rem; border-left:4px solid #22c55e;">
      <p style="font-weight:600; font-size:0.95rem; color:#14532d;">✅ Что должно получиться:</p>
      <p style="font-size:0.9rem; color:#14532d;">Батарейки постоянно появляются сверху, падают вниз. При касании робота счёт увеличивается на 1, звучит звук «Pop», и батарейка исчезает.</p>
    </div>
  `,
  tags: ['События', 'Переменные', 'Управление']
},
  {
    title: 'Метеориты',
    desc: `
    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">☄️ Шаг 1: Загрузи спрайт матеорита</p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Скачай спрайт метеорита по кнопке ниже</li>
        <li>В Scratch наведи на котика с плюсиком и выбери <strong>«Загрузить спрайт»</strong> (иконка загрузки)</li>
        <li>Выбери скачанный файл <strong>meteor.png</strong></li>
      </ol>
      <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin:0.8rem 0;">
        <a href="meteor.png" download="meteor.png" class="btn-primary gold" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
          ⬇️ Скачать спрайт метеорита
        </a>
        <button class="btn-primary outline" onclick="showToast('📁 В Scratch: наведи мышь на иконку с котиком → нажми на «Загрузить спрайт» и выбери meteor.png')">📖 Как загрузить?</button>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">⚡ Шаг 2: Программируем движение метеорита</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Программа будет похожа на программу <strong>Батарейки</strong>:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step3-1.png" alt="Блоки для батарейки" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«когда зелёный флаг нажат»</strong> из <span class="block-tag">События</span></li>
          <li>Возьми блок <strong>«задать [ ] значение 0»</strong> из <span class="block-tag orange">Переменные</span> и внутри выбери переменную «Счёт»</li>
          <li>Дальше прикрепи блок цикла <strong>«повторять всегда»</strong> из <span class="block-tag orange">Управление</span></li>
          <li>Внутри цикла положи блок <strong>«показаться»</strong> из <span class="block-tag purple">Внешность</span></li>
          <li>Затем блок <strong>«перейти в x: () y: ()»</strong> из <span class="block-tag purple">Движение</span><br>Вместо числа после «x:» вставляем блок <strong>«выдать случайное от ( ) до ( )»</strong> из <span class="block-tag green">Операторы</span> и пишем числа <strong>"от -200 до 200"</strong><br>Число после «y:» равняется <strong>120</strong>. Так наша батарейка будет появляться сверху в случайном месте.</li>
          <li>Дальше следует блок цикла <strong>«повторять пока не ( )»</strong> из <span class="block-tag orange">Управление</span>. Внутри него вставляем блок условия <strong>< > или < ></strong> из <span class="block-tag green">Операторы</span><br>Внутри первого условия кладём блок <strong>«касается (указатель мыши) ?»</strong> из <span class="block-tag light-blue">Сенсоры</span> и меняем на <strong>край</strong><br>Внутри второго условия кладём такой же блок <strong>«касается (указатель мыши) ?»</strong> и меняем на <strong>robot</strong><br>Этот цикл проверяет, касается ли наша батарейка края экрана или нашего робота.
            <div style="background:#fef9e7; border-radius:12px; padding:0.6rem 1rem; margin-top:0.8rem; border-left:4px solid #f9b93b; font-size:0.9rem; color:#6b4f1a;">
              💡 <strong>Внимание:</strong> На фотографиях названия могут отличаться от твоих, не волнуйся!
            </div>
          </li>
          <li>Осталось внутрь нашего блока <strong>«повторять пока не»</strong> положить блок <strong>«изменить y на ( )»</strong> из <span class="block-tag blue">Движение</span> и поменять число на -6.</li>
          <li>Нажми на зелёный флаг — метеорит тоже появится в игре! Если робот его коснётся или он коснётся края экрана, метеорит исчезнет и появится новый!</li>
        </ol>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">💥 Шаг 3: Программируем остановку игры при касании роботом метеорита</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Добавь этот блок кода в нашу ранее созданную программу <strong>Метеорита</strong>:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step3-2.png" alt="Блоки для счёта" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«если < >, то»</strong> из <span class="block-tag orange">Управление</span> и поставь его после блока <strong>«изменить y на -6»</strong><br>Добавь ему условие:<br>Возьми блок <strong>«касается (указатель мыши) ?»</strong> из <span class="block-tag light-blue">Сенсоры</span> и поменяй на <strong>robot</strong></li>
          <li>Дальше мы будем использовать систему оповещений - сообщения! Они нужны чтобы объекты в игре могли передавать какую-то информацию между собой (например, игра завершилась, нужно поменять фон, воспроизвести звук и еще много чего :D)
            Добавь внутрь блока <strong>«если < >, то»</strong> блок <strong>«передать (сообщение1)»</strong> из <span class="block-tag">События</span>. Ты можешь создать новое сообщение и назвать как хочешь (но это необязательно, дальше в инструкции мы это не делаем), нажми на него и выбери «Новое сообщение»:<br>
          </li>
          <li>Следующим блоком будет <strong>«стоп [все]»</strong> из <span class="block-tag light-orange">Управление</span>. Это остановит нашу игру, когда мы коснёмся метеорита</li>
          <li>Нажми на зелёный флаг — теперь при касании метеорита игра заканчивается!</li>
        </ol>
      </div>
    </div>

    <div style="background:#f0fdf4; border-radius:12px; padding:0.8rem 1rem; border-left:4px solid #22c55e;">
      <p style="font-weight:600; font-size:0.95rem; color:#14532d;">✅ Что должно получиться:</p>
      <p style="font-size:0.9rem; color:#14532d;">Метеорита постоянно появляются сверху, падают вниз вместе с батарейками. При касании робота игра останавливается.</p>
    </div>
    `,
    tags: ['Опасность', 'Управление', 'События']
  },
  {
    title: 'Оформление',
    desc: `
        <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">☄️ Шаг 1: Загрузи фоны для игры</p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Скачай два фото по кнопке ниже</li>
        <li>В Scratch нажми <strong>«Сцена»</strong>:<br><img src="scene.png"/></li>
        <li>Перейди на вкладку <strong>«Фоны»</strong>:<br><img src="fon.png"/></li>
        <li>Нажми на <strong>«Загрузить фон»</strong> и выбери файл фона <strong>game.png</strong>:<br><img src="upl.png"/></li>
        <li>И по такому же алгоритму загрузи второй фон <strong>gameover.png</strong></li>
      </ol>
      <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin:0.8rem 0;">
        <a href="game.png" download="game.png" class="btn-primary gold" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
          ⬇️ Скачать первый фон
        </a>
        <a href="gameover.png" download="gameover.png" class="btn-primary gold" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
          ⬇️ Скачать второй фон
        </a>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">⚡ Шаг 2: Добавляем звук при проигрыше</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Программа будет похожа на программу <strong>Батарейки</strong>:</p>
      
            <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;"><strong>Для добавления звука сделай следующее:</strong></p>
      <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.95rem; line-height:1.8;">
        <li>Открой вкладку «Звуки» над средой программирования:<br>
          <img src="zvuk-tab.png" alt="Вкладка Звуки" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
        <li>Нажми на кнопку «Выбрать звук» внизу:<br>
          <img src="zvuk1.png" alt="Кнопка выбора звука" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
        <li>В строке поиска напиши <strong>A Trumpet</strong> и нажми на найденный звук:<br>
          <img src="zvuk3.png" alt="Поиск звука A Trumpet" style="max-width:100%; border-radius:8px; margin-top:4px;">
        </li>
      </ol>
      </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">Шаг 3: Программируем изменение фона</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Переходим на вкладку «Код» и собираем следующую программу:</p>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step4-1.png" alt="Блоки для счёта" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li><strong>В этот раз у нас будет два отдельных блока!</strong></li>
          <li>Возьми блок <strong>«когда зелёный флаг нажат»</strong> из <span class="block-tag">События</span></li>
          <li>К нему прикрепи блок <strong>«переключить фон на ( )»</strong> из <span class="block-tag purple">Внешний вид</span> и внутри выбери фон <strong>«game»</strong><br>Этот блок кода будет ставить нам фон игры, когда мы нажимаем на флажок</li>
          <li><strong>Дальше идёт новый отдельный блок кода!</strong> Возьми блок <strong>«когда я получу [сообщение]»</strong> из <span class="block-tag">События</span> Проверь, что выбрано сообщение, которое отправляет метеорит!</li>
          <li>К нему прикрепи блок <strong>«включить звук (A Trumpet)»</strong> из <span class="block-tag pink">Звук</span></li>
          <li>Затем блок <strong>«переключить фон на ( )»</strong> из <span class="block-tag purple">Внешний вид</span> и внутри выбери фон <strong>«gameover»</strong><br>Этот блок будет менять фон и воспроизводить звук поражения, когда метеорит отправит сообщение.
          </li>
          <li>Нажми на зелёный флаг — теперь у игры есть фон! При столкновении с метеоритом он меняется, но как-то выглядит странно 🤔</li>
        </ol>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <p style="font-weight:700; font-size:1.05rem; margin-bottom:0.5rem;">Шаг 4: Скрываем объекты при поражении</p>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;"><strong>Точно!</strong> Наши спрайты при поражении остаются на экране, нужно исправить:</p>

<br>
      <p style="color:#1a3c61; font-size:0.95rem; margin-bottom:0.5rem;">Нажимаем на спрайт нашего робота и добавляем еще один блок кода:</p>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.8rem; margin:0.5rem 0;">
        <img src="step4-2.png" alt="Блоки для счёта" style="max-width:100%; border-radius:12px; grid-column: span 2;">
      </div>

      <div style="background:#eaf3fe; border-radius:12px; padding:0.8rem 1rem; margin:0.5rem 0;">
        <p style="font-weight:600; font-size:0.95rem;">📋 Как собрать:</p>
        <ol style="padding-left:1.2rem; color:#1a3c61; font-size:0.9rem; line-height:1.8;">
          <li>Возьми блок <strong>«когда я получу [сообщение]»</strong> из <span class="block-tag">События</span> Проверь, что выбрано сообщение, которое отправляет метеорит!</li>
          <li>К нему прикрепи блок <strong>«спрятаться»</strong> из <span class="block-tag purple">Вшешний вид</span></li>
          <li><strong>Всё!</strong> Теперь осталось этот блок кода добавить у остальных спрайтов. Нам не обязательно каждый раз создавать одинаковые блоки у каждого спрайта!<br>Просто захвати его мышью и перетяни на нужный спрайт:<br><img style="width: 50%;" src="copy.GIF"/>
          </li>
          <li><strong>Теперь точно всё!</strong></li>
        </ol>
      </div>
    </div>

    <div style="background:#f0fdf4; border-radius:12px; padding:0.8rem 1rem; border-left:4px solid #22c55e;">
      <p style="font-weight:600; font-size:0.95rem; color:#14532d;">✅ Что должно получиться:</p>
      <p style="font-size:0.9rem; color:#14532d;">У игры появится фон, при поражении он меняется, спрайты скрываются и воспроизводится звук!</p>
    </div>
    `,
    tags: ['Оформление', 'Внешний вид']
  },
  {
    title: 'Тестирование',
    desc: `Запусти игру и проверь, всё ли работает: робот двигается, батарейки и метеориты опасны, счёт добавляется.
    
          <div style="position:relative; border-radius:16px; overflow:hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.15); margin-bottom:0.5rem; background:#0a1a2f;">
        <video 
          controls 
          playsinline
          preload="metadata"
          style="width:100%; display:block; border-radius:16px;"
          poster="video-poster.png"
        >
          <source src="final.mp4" type="video/mp4">
          <p style="color:white; padding:2rem; text-align:center;">
            ⚠️ Ваш браузер не поддерживает видео.<br>
            <a href="final.mp4" download style="color:#f9b93b;">Скачать видео</a>
          </p>
        </video>
      </div>
      <p style="font-size:0.8rem; color:#4b6a8a; text-align:center;">👆 Нажми на кнопку воспроизведения, чтобы посмотреть пример игры</p>`,
    tags: ['Тестирование']
  }
];

// ===== ЗАДАНИЯ =====
const tasks = [
  { id: 1, level: '⭐ Простое', desc: 'Сделай так, чтобы батарейка меняла цвет при касании робота.', hint: 'Используй блок «изменить эффект (цвет)»' },
  { id: 2, level: '⭐⭐ Среднее', desc: 'Добавь вторую батарейку, которая даёт 2 очка, но движется зигзагом.', hint: 'Используй «изменить x на» в цикле' },
  { id: 3, level: '⭐⭐⭐ Сложное', desc: 'Добавь динамическую сложность: при 10 очках скорость падения метеорита увеличивается.', hint: 'Используй переменную «скорость» и изменяй её' }
];

// ===== ФУНКЦИИ =====
function startLesson() {
  const name = document.getElementById('childName').value.trim();
  const phone = document.getElementById('childPhone').value.trim();
  const age = document.getElementById('childAge').value.trim();
  
  if (!name || !phone || !age) { 
    showToast('⚠️ Пожалуйста, заполни имя, телефон и возраст'); 
    return; 
  }
  
  userData.name = name;
  userData.phone = phone;
  userData.age = age;
  
  document.getElementById('registrationSection').classList.add('hidden');
  document.getElementById('choiceSection').classList.remove('hidden');
  document.getElementById('certName').textContent = name;
  document.getElementById('certAge').textContent = age + ' лет';
  
  showToast('🎉 Привет, ' + name + '! Выбери способ обучения');
}

function selectMode(mode) {
  // Теперь только визуальный режим
  currentMode = 'visual';
  document.getElementById('choiceSection').classList.add('hidden');
  document.getElementById('visualSection').classList.remove('hidden');
  document.getElementById('tasksSection').classList.add('hidden');
  visualStep = 0;
  renderVisualStep();
  setTimeout(attachBlockListeners, 100);
  showToast('📋 Начинаем визуальную инструкцию! Не забудь открыть Scratch');
}

function switchToVisual() {
  document.getElementById('videoSection').classList.add('hidden');
  document.getElementById('visualSection').classList.remove('hidden');
  currentMode = 'visual';
  renderVisualStep();
  setTimeout(attachBlockListeners, 100);
  showToast('📋 Переключились на визуальную инструкцию');
}

function openScratch() {
  window.open('https://scratch.mit.edu/projects/editor/', '_blank');
  showToast('🚀 Scratch открыт в новой вкладке');
}

function attachBlockListeners() {
  document.querySelectorAll('.block-card[data-block]').forEach(el => {
    el.addEventListener('click', function(e) {
      const blockId = this.dataset.block;
      if (blockId && blockData[blockId]) {
        openBlockModal(blockId);
      }
    });
  });
}

// ===== МОДАЛКА БЛОКОВ С КАРТИНКАМИ =====
function openBlockModal(blockId) {
  const data = blockData[blockId];
  if (!data) return;
  const content = document.getElementById('blockModalContent');
  
  // Цвета для текста на блоках (для жёлтого — тёмный, для остальных — белый)
  const textColor = data.color === '#f9b93b' ? '#1e293b' : 'white';
  
  content.innerHTML = `
    <div class="modal-header">
      <span class="color-dot" style="background:${data.color};"></span>
      ${data.name}
    </div>
    <div class="modal-desc">${data.description}</div>
    <div class="block-demo-grid">
      ${data.blocks.map(b => `
        <div class="block-demo-item">
          <div class="block-image" style="border-color:${data.color}; background:${data.color}15;">
            <img src="${b.label}" />
          </div>
          <div class="block-desc">${b.desc}</div>
        </div>
      `).join('')}
    </div>
    <div class="block-tip">
      💡 В Scratch все блоки этой категории имеют <strong style="color:${data.color};">${data.colorName}</strong> цвет.
    </div>
  `;
  document.getElementById('blockModal').classList.add('active');
}

function closeBlockModal() {
  document.getElementById('blockModal').classList.remove('active');
}

// ===== ВИЗУАЛЬНАЯ ИНСТРУКЦИЯ =====
function renderVisualStep() {
  const container = document.getElementById('visualStepsContainer');
  if (visualStep >= totalVisualSteps) {
    container.innerHTML = `<div style="text-align:center; padding:2rem;">
      <span style="font-size:3rem;">🎉</span>
      <h3>Все шаги пройдены!</h3>
      <p style="color:#4b6a8a;">Ты создал(а) игру «Зарядка для робота»</p>
    </div>`;
    document.getElementById('visualCompleteBtn').style.display = 'inline-block';
    document.getElementById('visualProgress').style.width = '100%';
    return;
  }
  const step = visualSteps[visualStep];
  container.innerHTML = `
    <div class="step-block">
      <div class="step-num">Шаг ${visualStep+1} из ${totalVisualSteps}</div>
      <div style="font-size:1.2rem; font-weight:700; margin:0.3rem 0;">${step.title}</div>
      <div class="desc">${step.desc}</div>
      <div style="margin-top:0.3rem;">
        ${step.tags.map(t => `<span class="block-tag">${t}</span>`).join('')}
      </div>
      <div class="step-nav">
        <button class="btn-primary gold" onclick="nextVisualStep()">✅ Сделал → следующий шаг</button>
        ${visualStep > 0 ? `<button class="btn-primary outline" onclick="prevVisualStep()">← назад</button>` : ''}
      </div>
    </div>
  `;
  document.getElementById('visualProgress').style.width = ((visualStep / totalVisualSteps) * 100) + '%';
  document.getElementById('visualCompleteBtn').style.display = 'none';
  setTimeout(attachBlockListeners, 50);
}

function nextVisualStep() {
  if (visualStep < totalVisualSteps - 1) {
    visualStep++;
    renderVisualStep();
    showToast('✅ Шаг пройден! Переходим к следующему');
    // Прокрутка к началу шага
    setTimeout(scrollToStep, 100);
  } else {
    visualStep = totalVisualSteps;
    renderVisualStep();
    showToast('🎉 Все шаги выполнены!');
    setTimeout(scrollToStep, 100);
  }
}

function prevVisualStep() {
  if (visualStep > 0) {
    visualStep--;
    renderVisualStep();
    setTimeout(scrollToStep, 100);
  }
}

function visualComplete() {
  document.getElementById('visualSection').classList.add('hidden');
  document.getElementById('tasksSection').classList.remove('hidden');
  renderTasks();
  showToast('🎯 Отлично! Теперь задания для определения уровня');
}

// ===== ЗАДАНИЯ =====
function renderTasks() {
  const container = document.getElementById('tasksContainer');
  container.innerHTML = tasks.map((t, idx) => `
    <div class="step-block" id="task-${t.id}" style="border-left-color: ${idx === 0 ? '#f9b93b' : '#d0ddee'}; opacity: ${idx === 0 ? 1 : 0.5};">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <span class="step-num" style="background:${idx === 0 ? '#f9b93b' : '#94a3b8'}; color:${idx === 0 ? '#0b2b4a' : 'white'};">${t.level}</span>
        <span id="taskStatus-${t.id}" style="font-weight:600; color:#94a3b8;">${idx === 0 ? '👈 текущее' : '🔒 закрыто'}</span>
      </div>
      <div style="font-size:1.1rem; font-weight:600; margin:0.5rem 0;">${t.desc}</div>
      <div style="font-size:0.9rem; color:#4b6a8a;">💡 ${t.hint}</div>
      <div class="task-btn-container" style="margin-top:0.8rem;">
        ${idx === 0 ? `<button class="btn-primary gold task-btn" onclick="completeTask(${t.id})">✅ Выполнил</button>` : ''}
      </div>
    </div>
  `).join('');
}

function completeTask(id) {
  tasksDone++;
  const taskEl = document.getElementById('task-' + id);
  taskEl.style.borderLeftColor = '#22c55e';
  taskEl.style.opacity = '0.7';
  document.getElementById('taskStatus-' + id).textContent = '✅ выполнено';
  document.getElementById('taskStatus-' + id).style.color = '#22c55e';
  
  const nextIdx = tasks.findIndex(t => t.id === id) + 1;
  if (nextIdx < tasks.length) {
    const nextTask = tasks[nextIdx];
    const nextEl = document.getElementById('task-' + nextTask.id);
    nextEl.style.opacity = '1';
    nextEl.style.borderLeftColor = '#f9b93b';
    document.getElementById('taskStatus-' + nextTask.id).textContent = '👈 текущее';
    document.getElementById('taskStatus-' + nextTask.id).style.color = '#0b2b4a';
    
    // Находим контейнер для кнопки в следующем задании
    const btnContainer = nextEl.querySelector('.task-btn-container');
    if (btnContainer) {
      // Очищаем контейнер и добавляем новую кнопку
      btnContainer.innerHTML = '';
      const btn = document.createElement('button');
      btn.className = 'btn-primary gold task-btn';
      btn.textContent = '✅ Выполнил';
      btn.onclick = () => completeTask(nextTask.id);
      btnContainer.appendChild(btn);
    }
  } else {
    showToast('🎉 Все задания выполнены! Нажми «Завершить занятие»');
  }
  showToast('✅ Задание ' + id + ' выполнено!');
}

function openSendModal() {
  document.getElementById('sendModal').classList.add('active');
}

function closeSendModal() {
  document.getElementById('sendModal').classList.remove('active');
}

// ===== ОТПРАВКА ПРОЕКТА =====
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  const status = document.getElementById('fileStatus');
  status.textContent = '✅ Файл выбран: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
  status.style.color = '#22c55e';
}

async function sendProject() {
  if (!selectedFile) { 
    showToast('⚠️ Сначала выбери файл проекта'); 
    return; 
  }
  
  showToast('⏳ Отправка проекта...');
  
  try {
    // 1. Загружаем файл на file.io
    const fileUrl = await uploadToFileIO(selectedFile);
    
    // 2. Формируем данные ученика
    const name = userData.name || document.getElementById('childName').value.trim() || 'Не указано';
    const phone = userData.phone || document.getElementById('childPhone').value.trim() || 'Не указано';
    const age = parseInt(userData.age || document.getElementById('childAge').value.trim()) || 0;
    
    const studentData = {
      name: name,
      phone: phone,
      age: age,
      project_url: fileUrl,
      created_at: new Date().toISOString()
    };
    
    // 3. Отправляем данные в Supabase
    const success = await sendToSupabase(studentData);
    
    if (success) {
      document.getElementById('fileStatus').textContent = '📤 Отправлено!';
      document.getElementById('fileStatus').style.color = '#1e4b7a';
      selectedFile = null;
      closeSendModal();
      document.getElementById('tasksSection').classList.add('hidden');
      document.getElementById('certificateSection').classList.remove('hidden');
      
      document.getElementById('congratsName').textContent = name;
      document.getElementById('congratsLevel').textContent = level;
      showToast('🎉 Поздравляем! Данные отправлены!');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    showToast('⚠️ Ошибка: ' + error.message);
  }
}

// ===== ФОРМА СВЯЗИ =====
function sendContact() {
  const name = document.getElementById('contactName').value.trim() || userData.name;
  const phone = document.getElementById('contactPhone').value.trim() || userData.phone;
  if (!name || !phone) { showToast('⚠️ Заполните имя и телефон'); return; }
  showToast('📩 Спасибо! Мы свяжемся с вами в ближайшее время');
  document.getElementById('contactName').value = '';
  document.getElementById('contactPhone').value = '';
}


// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

// ===== DRAG & DROP =====
const uploadArea = document.getElementById('uploadArea');
if (uploadArea) {
  uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.style.borderColor = '#f9b93b'; uploadArea.style.background = '#fef9e7'; });
  uploadArea.addEventListener('dragleave', () => { uploadArea.style.borderColor = '#94a3b8'; uploadArea.style.background = '#f8fcff'; });
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#94a3b8';
    uploadArea.style.background = '#f8fcff';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      selectedFile = file;
      const status = document.getElementById('fileStatus');
      status.textContent = '✅ Файл выбран: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
      status.style.color = '#22c55e';
      const input = document.getElementById('fileInput');
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
    }
  });
}
function completeLesson() {
  // Показываем модалку с отправкой проекта
  document.getElementById('sendModal').classList.add('active');
}

// ===== ПОЛУЧИТЬ РЕЗУЛЬТАТЫ (вместо сертификата) =====
async function skipSendAndShowCert() {
  closeSendModal();
  
  // Формируем данные без файла
  const name = userData.name || document.getElementById('childName').value.trim() || 'Не указано';
  const phone = userData.phone || document.getElementById('childPhone').value.trim() || 'Не указано';
  const age = parseInt(userData.age || document.getElementById('childAge').value.trim()) || 0;
  
  const studentData = {
    name: name,
    phone: phone,
    age: age,
    project_url: null,
    created_at: new Date().toISOString()
  };
  
  // Отправляем данные без файла
  await sendToSupabase(studentData);
  
  document.getElementById('tasksSection').classList.add('hidden');
  document.getElementById('certificateSection').classList.remove('hidden');
  document.getElementById('congratsName').textContent = name;
  document.getElementById('congratsLevel').textContent = level;
  
  showToast('🎉 Поздравляем! Результаты сохранены!');
}

// ===== ЗАКРЫТЬ ПОЗДРАВЛЕНИЕ =====
function closeCongrats() {
  document.getElementById('certificateSection').classList.add('hidden');
  // Показываем задания снова
  document.getElementById('tasksSection').classList.remove('hidden');
  showToast('👋 Возвращаемся к заданиям');
}

// ===== ПРОКРУТКА К НАЧАЛУ ШАГА =====
function scrollToStep() {
  const stepBlock = document.querySelector('.step-block');
  if (stepBlock) {
    const offset = 100; // отступ сверху
    const elementPosition = stepBlock.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  } else {
    // Если .step-block не найден, скроллим к началу контейнера
    const container = document.getElementById('visualStepsContainer');
    if (container) {
      const offset = 100;
      const elementPosition = container.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
}

// ===== УСТАНОВКА ДАТЫ В СЕРТИФИКАТЕ =====
function setCertDate() {
  const now = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateStr = now.toLocaleDateString('ru-RU', options);
  document.getElementById('certDate').textContent = dateStr;
}

// ===== ОТПРАВКА ДАННЫХ В SUPABASE =====
async function sendToSupabase(data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      showToast('✅ Данные сохранены!');
      return true;
    } else {
      showToast('⚠️ Ошибка сохранения');
      return false;
    }
  } catch (error) {
    console.error('Ошибка:', error);
    return false;
  }
}

// ===== ЗАГРУЗКА НА GOFILE.IO И ОТПРАВКА В SUPABASE =====
async function sendProject() {
  if (!selectedFile) { 
    showToast('⚠️ Сначала выбери файл проекта'); 
    return; 
  }
  
  showToast('⏳ Отправка проекта...');
  
  // Загружаем файл
  const formData = new FormData();
  formData.append('file', selectedFile);
  
  try {
    // 1. Загружаем файл на GoFile.io
    const fileResponse = await fetch('https://store1.gofile.io/uploadFile', {
      method: 'POST',
      body: formData,
    });
    const fileResult = await fileResponse.json();
    
    if (fileResult.status !== 'ok') {
      throw new Error('Ошибка загрузки файла: ' + (fileResult.message || 'Неизвестная ошибка'));
    }
    
    // 2. Формируем данные ученика
    const name = userData.name || document.getElementById('childName').value.trim() || 'Не указано';
    const phone = userData.phone || document.getElementById('childPhone').value.trim() || 'Не указано';
    const age = parseInt(userData.age || document.getElementById('childAge').value.trim()) || 0;
    
    const studentData = {
      name: name,
      phone: phone,
      age: age,
      project_url: fileResult.data.downloadPage, // Ссылка на страницу скачивания
      created_at: new Date().toISOString()
    };
    
    // 3. Отправляем в Supabase
    const success = await sendToSupabase(studentData);
    
    if (success) {
      document.getElementById('fileStatus').textContent = '📤 Отправлено!';
      document.getElementById('fileStatus').style.color = '#1e4b7a';
      selectedFile = null;
      closeSendModal();
      document.getElementById('tasksSection').classList.add('hidden');
      document.getElementById('certificateSection').classList.remove('hidden');
      
      document.getElementById('congratsName').textContent = name;
      showToast('🎉 Поздравляем! Данные отправлены!');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    showToast('⚠️ Ошибка: ' + error.message);
  }
}