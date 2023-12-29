const categories = {
  животные: ['кот','собака','блоха','лиса','леопард','пума','окунь','щука','лещ','кит','тунец','судак','плотва','красноперка','сом','карась','карп','сазан','змея','фламинго','лев','тигр','жираф','слон','антилопа','осел','сорока','ворона','воробей','Орел','паук','лошадь','енот','пчела','оса','зебра','черепаха'],
  растения: ['ромашка', 'тюльпан', 'герань', 'астра', 'барвинок', 'Василек', 'гвоздика', 'гладиолус', 'жасмин', 'ландыш', 'лилия', 'нарцисс', 'роза', 'фиалка', 'хризантема', 'орхидея'],
  продукты: ['яблоко', 'помидор', 'картофель', 'свекла', 'кукуруза', 'кабачок', 'морковь', 'огурец', 'вишня', 'абрикос', 'груша', 'смородина', 'слива', 'апельсин', 'мандарин', 'кокос', 'клубника', 'малина', 'земляника', 'помело', 'грейпфрут', 'банан', 'манго'],
  'виды спорта': ['хоккей', 'футбол', 'волейбол', 'теннис', 'крикет', 'гольф', 'бег', 'бильярд', 'бокс', 'бадминтон', 'бобслей', 'дзюдо', 'плавание', 'каратэ', 'шахматы', 'шашки', 'сумо', 'боулинг', 'айкидо'],
  'страны мира': ['Албания', 'Андорра', 'Армения', 'Австрия', 'Азербайджан', 'Беларусь', 'Бельгия', 'Болгария', 'Хорватия', 'Кипр', 'Чехия', 'Дания', 'Эстония', 'Финляндия', 'Франция', 'Грузия', 'Германия', 'Греция', 'Венгрия', 'Исландия', 'Ирландия', 'Италия', 'Казахстан', 'Латвия', 'Лихтенштейн', 'Литва', 'Люксембург', 'Мальта', 'Афганистан', 'Азербайджан', 'Бангладеш', 'Бутан', 'Камбоджа', 'Китай', 'Кипр', 'Грузия', 'Индия', 'Индонезия', 'Иран', 'Ирак', 'Израиль', 'Япония', 'Иордания', 'Казахстан', 'Кувейт', 'Киргизия', 'Лаос', 'Ливан', 'Малайзия', 'Мальдивы', 'Монголия', 'Бирма', 'Непал', 'Оман', 'Пакистан', 'Алжир', 'Ангола', 'Бенин', 'Бурунди', 'Камерун', 'Чад', 'Коморы', 'Конго', 'Египет', 'Эритрея', 'Эфиопия', 'Гамбия', 'Гвинея', 'Кения', 'Либерия', 'Ливия', 'Мадагаскар', 'Аргентина', 'Багамы', 'Барбадос', 'Белиз', 'Боливия', 'Бразилия', 'Канада', 'Чили', 'Колумбия', 'Куба', 'Доминика', 'Эквадор', 'Сальвадор', 'Гренада', 'Гватемала', 'Гайана', 'Гаити', 'Гондурас', 'Ямайка', 'Мексика', 'Никарагуа', 'Панама', 'Парагвай', 'Перу', 'Украина'],
};

let selectedCategory = 'животные'; // По умолчанию выбрана категория 'животные'
let selectedWord = '';
let hangmanState = 0;
let wordState = [];
let usedLetters = [];
var  playerName;

function validateInput(inputElement) {
    const inputValue = inputElement.value;
    if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(inputValue)) {
        alert("Будь ласка, введіть тільки літери. Символи та цифри не доступні для вводу.");
        inputElement.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
}

function updateDisplay() {
  document.getElementById('hangman-state').textContent = 12 - hangmanState;
  document.getElementById('word-state').textContent = wordState.join(' ');
  document.getElementById('used-letters').textContent = usedLetters.join(', ');


}

function startGenererteGame(){
  var categorySelect = document.getElementById('categorySelect');
  selectedCategory = categorySelect.value.toLowerCase(); // Получаем выбранную категорию и приводим к нижнему регистру

  var playerNameInput = document.getElementById('playerName');
    playerName = playerNameInput.value; // Получаем имя игрока
  // Выводим выбранную категорию (для демонстрации)
  var selectedCategoryText = document.getElementById('used-selected-category');
  selectedCategoryText.textContent = ` ${selectedCategory}`;


  selectedWord = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)].toUpperCase();


  hangmanState = 0;
  wordState = Array(selectedWord.length).fill('_');
  usedLetters = [];

  updateDisplay();
}

function startGame() {

  startTime = new Date();
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('return-button-registration').style.display = 'none';

  document.getElementById('game-registration').style.display = 'none';
  document.getElementById('return-button-container').style.display = 'block';
  // Отобразить контейнер для игры
  document.getElementById('record').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  startGenererteGame();
}



function handleKey(button, letter) {
  letter = letter.toUpperCase();
  if (usedLetters.includes(letter)) {
  //  alert('Вы уже использовали эту букву!');
    return;
  }
  usedLetters.push(letter);

  let letterFound = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      wordState[i] = letter;
      letterFound = true;
      button.classList.add('clicked_true');
    }
  }

  if (!letterFound) {
    button.classList.add('clicked_false');
    changeImage(hangmanState);
    hangmanState++;
  }

  updateDisplay();

  if (wordState.join('') === selectedWord) {
    const endTime = new Date(); // Запоминаем время завершения игры
    const timeTaken = (endTime - startTime) / 1000;
    const confirmResult1 = confirm(`${playerName}, вы выиграли! Слово: ${selectedWord}. Время: ${timeTaken.toFixed(2)} сек. Хотите сыграть ещё? нет - вернуться на главное меню.`);

    if (confirmResult1) {
      resetGame();
    } else {
      resetGame();
      returnToMainMenu2();
    }
  } else if (hangmanState === 12) {
    const confirmResult2 = confirm(`${playerName}вы проиграли! Правильное слово: ${selectedWord} Хотите сыграть ещё? нет - вернуться на главное меню.`);
    if (confirmResult2) {
      resetGame();
    } else {
      resetGame();
      returnToMainMenu2();
    }
  }
}

function changeImage(hangmanState) {
  var image = document.getElementById('myImage');
  image.src = `assets/${hangmanState + 1}.png`;
}

function resetGame() {
  startTime = null;
  var playerNameInput = document.getElementById('playerName');
  playerNameInput.value = ''; // Сброс имени игрока


  selectedWord = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)].toUpperCase();
  hangmanState = 0;
  var image = document.getElementById('myImage');
  image.src = 'assets/1.png';
  wordState = Array(selectedWord.length).fill('_');
  usedLetters = [];
  var buttons = document.getElementsByClassName('key');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('clicked_true');
    buttons[i].classList.remove('clicked_false');

    buttons[i].onclick = function () {
      handleKey(this, this.innerText);
    };
  }
  startTime = new Date();
  updateDisplay();
}

function confirmReturnToMainMenu2() {
  const confirmResult = confirm('Вы уверены, что хотите вернуться на главное меню? Ваша игра не будет сохранена.');
  if (confirmResult) {
    returnToMainMenu2();
    resetGame();
  }
}



function newGame() {
  // Скрыть главное меню
  document.getElementById('main-menu').style.display = 'none';

  document.getElementById('return-button-registration').style.display = 'block'; // Отобразим кнопку "Вернуться на главное меню"
  // Отобразить контейнер для игры
  document.getElementById('game-registration').style.display = 'block';

  document.getElementById('return-button-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('record').style.display = 'none';
}
function confirmReturnToMainMenu1() {
  // Скрыть контейнер для игры
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('return-button-registration').style.display = 'none'; // Отобразим кнопку "Вернуться на главное меню"
  // Отобразить контейнер для игры
  document.getElementById('game-registration').style.display = 'none';
  // Отобразить главное меню
    document.getElementById('record').style.display = 'none';
  document.getElementById('main-menu').style.display = 'block';
}

 function showRecords(){
   document.getElementById('main-menu').style.display = 'none';

   document.getElementById('return-button-registration').style.display = 'none'; // Отобразим кнопку "Вернуться на главное меню"
   // Отобразить контейнер для игры
   document.getElementById('game-registration').style.display = 'none';

   document.getElementById('return-button-container').style.display = 'none';
   document.getElementById('game-container').style.display = 'none';
   document.getElementById('record').style.display = 'block';


 }


function returnToMainMenu2() {
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('return-button-container').style.display = 'none';
  document.getElementById('return-button-registration').style.display = 'none';
  document.getElementById('game-registration').style.display = 'none';
  document.getElementById('main-menu').style.display = 'block';
}

// Инициализация вида при загрузке страницы
updateDisplay();
