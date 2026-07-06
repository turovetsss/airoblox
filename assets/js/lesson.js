(function () {
  function setResult(box, text, className) {
    if (!box) return;
    box.textContent = text;
    box.className = className;
  }

  window.checkQuiz = function (quizId) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;
    const questions = quiz.querySelectorAll('.quiz-question');
    let correctCount = 0;
    let answeredAll = true;

    questions.forEach(function (q) {
      const name = q.dataset.name;
      const correct = q.dataset.correct;
      const selected = q.querySelector('input[name="' + name + '"]:checked');
      const feedback = q.querySelector('.q-feedback');
      q.classList.remove('correct', 'incorrect');
      q.querySelectorAll('label').forEach(function (label) {
        label.classList.remove('picked');
      });

      if (!selected) {
        answeredAll = false;
        if (feedback) {
          feedback.textContent = 'Выбери вариант ответа выше ⬆️';
          feedback.className = 'q-feedback neutral';
        }
        return;
      }

      selected.closest('label').classList.add('picked');
      if (selected.value === correct) {
        correctCount++;
        q.classList.add('correct');
        if (feedback) {
          feedback.textContent = '✅ Верно!';
          feedback.className = 'q-feedback correct';
        }
      } else {
        q.classList.add('incorrect');
        if (feedback) {
          feedback.textContent = '❌ Пока не так. Смотри теорию выше и попробуй ещё раз!';
          feedback.className = 'q-feedback incorrect';
        }
      }
    });

    const resultBox = quiz.querySelector('.quiz-result');
    if (!answeredAll) {
      setResult(resultBox, 'Ответь, пожалуйста, на все вопросы 🙂', 'quiz-result neutral');
      return;
    }

    const total = questions.length;
    let msg = '';
    if (correctCount === total) {
      msg = '🎉 Результат: ' + correctCount + ' из ' + total + '. Идеально! Ты настоящий робо-инженер!';
    } else if (correctCount >= Math.ceil(total * 0.6)) {
      msg = '👍 Результат: ' + correctCount + ' из ' + total + '. Хорошо! Загляни в теорию по вопросам с ошибками.';
    } else {
      msg = '🔧 Результат: ' + correctCount + ' из ' + total + '. Не страшно — перечитай теорию выше и попробуй снова.';
    }
    setResult(resultBox, msg, 'quiz-result done');
    resultBox && resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.updateTaskProgress = function (box) {
    if (!box) return;
    const checkboxes = box.querySelectorAll('input[type="checkbox"]');
    const checked = box.querySelectorAll('input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const bar = box.querySelector('.progress-fill');
    const label = box.querySelector('.progress-label');
    const pct = total ? Math.round((checked / total) * 100) : 0;
    if (bar) bar.style.width = pct + '%';
    if (label) {
      label.textContent =
        'Выполнено шагов: ' +
        checked +
        ' из ' +
        total +
        (checked === total && total > 0 ? ' 🎉 Задание выполнено!' : '');
    }
  };

  window.updateKeyProgress = function () {
    window.updateTaskProgress(document.getElementById('keyTaskBox'));
  };

  window.checkMatchBlock = function (blockOrId) {
    const block = typeof blockOrId === 'string' ? document.getElementById(blockOrId) : blockOrId;
    if (!block) return;
    const selects = block.querySelectorAll('.match-select');
    let allAnswered = true;
    let score = 0;

    selects.forEach(function (sel) {
      sel.classList.remove('correct', 'incorrect', 'neutral');
      if (!sel.value) {
        allAnswered = false;
        sel.classList.add('neutral');
        return;
      }
      if (sel.value === sel.dataset.correct) {
        score++;
        sel.classList.add('correct');
      } else {
        sel.classList.add('incorrect');
      }
    });

    const result = block.querySelector('.match-result');
    if (!allAnswered) {
      setResult(result, '⚠️ Выбери вариант для каждой строки!', 'match-result fail');
      return;
    }
    if (score === selects.length) {
      setResult(result, '🎉 Отлично! Все соответствия верны!', 'match-result done');
    } else {
      setResult(result, '📊 Правильных ответов: ' + score + ' из ' + selects.length + '. Попробуй ещё раз!', 'match-result fail');
    }
  };

  window.checkMatch = function () {
    window.checkMatchBlock('matchKeyboard');
  };

  window.checkMatch2 = function () {
    window.checkMatchBlock('matchRoblox');
  };

  window.askBit = function (btn, targetId) {
    const helper = btn.closest('.ai-helper');
    const box = helper && helper.querySelector('.ai-answer');
    const source = document.getElementById(targetId);
    if (!helper || !box || !source) return;
    box.innerHTML = source.innerHTML;
    box.classList.add('active');
    helper.querySelectorAll('.ai-q-btn').forEach(function (item) {
      item.classList.remove('active');
    });
    btn.classList.add('active');
  };

  window.checkChoices = function (blockId) {
    const block = document.getElementById(blockId);
    if (!block) return;
    const cards = block.querySelectorAll('[data-correct-choice]');
    let selected = 0;
    let correct = 0;

    cards.forEach(function (card) {
      card.classList.remove('correct', 'incorrect');
      if (card.classList.contains('selected')) {
        selected++;
        if (card.dataset.correctChoice === 'true') {
          correct++;
          card.classList.add('correct');
        } else {
          card.classList.add('incorrect');
        }
      }
    });

    const needed = Array.from(cards).filter(function (card) {
      return card.dataset.correctChoice === 'true';
    }).length;
    const result = block.querySelector('.activity-result');

    if (!selected) {
      setResult(result, 'Выбери один или несколько вариантов.', 'activity-result neutral');
    } else if (correct === needed && selected === needed) {
      setResult(result, '✅ Отлично, всё выбрано правильно!', 'activity-result done');
    } else {
      setResult(result, 'Есть неточности: зелёным отмечены верные идеи, красным — лишние.', 'activity-result neutral');
    }
  };

  window.checkSequence = function (blockId) {
    const block = document.getElementById(blockId);
    if (!block) return;
    const items = Array.from(block.querySelectorAll('.sort-item'));
    const result = block.querySelector('.activity-result');
    let ok = true;

    items.forEach(function (item, index) {
      const good = String(index + 1) === item.dataset.correctStep;
      item.classList.toggle('correct', good);
      if (!good) ok = false;
    });

    if (ok) {
      setResult(result, '🎉 Порядок получился логичным! Проговори алгоритм вслух.', 'activity-result done');
    } else {
      setResult(result, 'Проверь порядок: сначала подготовка, потом действие, потом результат.', 'activity-result neutral');
    }
  };

  document.addEventListener('click', function (event) {
    const choice = event.target.closest('.choice-card,.tool-card,.sort-item');
    if (choice) choice.classList.toggle('selected');
  });

  document.addEventListener('change', function (event) {
    if (event.target.matches('.task-box input[type="checkbox"]')) {
      window.updateTaskProgress(event.target.closest('.task-box'));
    }
  });
})();
