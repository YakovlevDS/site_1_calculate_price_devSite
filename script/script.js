// use strict-Это строгий режим который
//заставляет бромаузер выполнять наш код //в строгом режиме
'use strict';
// масив который схранит слова для нужного склонения
const DAY_STRING = ['день', 'дня', 'дней'];
// Создадим оди обьект  DATA неизменяемый первое описывае таблицу //расходов (https://docs.google.com/spreadsheets/d/
//1I7ZcbW1XYu4Er1aS1wr6HwKVFuuutDcc_rv7Irjd7zA/edit#gid=0) что мы //сохраним тип сайта(Лендинг,многостраничный,интернет магазин). 
//ЗАтем нам нужна цена мы назовем prise, 2 учет расходов дизайна 
//сайта desktopTemplates. 3 удет адаптив нужно ли адаптировать за //адаптив отвечает Адаптив сайта его значение берем из 
//value="adapt".4 наличие мобильного макета значение 
//mobileTemplates. 5Возможность редоктировать значение editable . //6 дополнительный функционал (яндекс метрика,гугл аналитика  
//значение metrikaYandex,analyticsGoogle,sendOrder))<!-- Время на //разработку сайта deadlineDay и deadlinePercent в %
const DATA = {
  whichSite: ['landing', 'multiPage', 'onlineStore'],
  price: [4000, 8000, 26000],
  desktopTemplates: [50, 40, 30],
  adapt: 20,
  mobileTemplates: 15,
  editable: 10,
  metrikaYandex: [500, 1000, 2000],
  analyticsGoogle: [850, 1350, 3000],
  sendOrder: 500,
  deadlineDay: [
    [2, 7],
    [3, 10],
    [7, 14]
  ],
  deadlinePercent: [20, 17, 15]
};
// querySelector когда берем из class.getElementById берем переменную из id
const startButton = document.querySelector(`.start-button`),
  firstScreen = document.querySelector(`.first-screen`),
  mainForm = document.querySelector(`.main-form`),
  formCalculate = document.querySelector(`.form-calculate`),
  endButton = document.querySelector(`.end-button`),
  total = document.querySelector(`.total`),
  fastRange = document.querySelector(`.fast-range`),
  // Элемент для записи суммы расхода 
  totalPriceSum = document.querySelector(`.total_price__sum`),
  //  кнопки их имена в скрипте
  adapt = document.getElementById('adapt'),
  mobileTemplates = document.getElementById('mobileTemplates'),
  desktopTemplates = document.getElementById('desktopTemplates'),
  editable = document.getElementById('editable'),
  // имена нет в кнопках
  adaptValue = document.querySelector('.adapt_value'),
  mobileTemplatesValue = document.querySelector('.mobileTemplates_value'),
  desktopTemplatesValue = document.querySelector('.desktopTemplates_value'),
  editableValue = document.querySelector('.editable_value'),
  // Переменная меняет текст при выборе типа сайта 
  typeSite = document.querySelector('.type-site'),
  maxDeadline = document.querySelector('.max-deadline'),
  // Элемент для изменения количества дней в бегунке
  rangeDeadline = document.querySelector('.range-deadline'),
  deadlineValue = document.querySelector('.deadline-value'),
  //  переменная calc-description для изменения текста низ при установленной 
  //галочке вверху
  calcDescription = document.querySelector('.calc-description'),
  metrikaYandex = document.getElementById('metrikaYandex'),
  analyticsGoogle = document.getElementById('analyticsGoogle'),
  sendOrder = document.getElementById('sendOrder'),
  // переменные нужны для изменения формы отправки 3стр.
  cardHead = document.querySelector('.card-head'),
  totalPrice = document.querySelector('.total_price'),
  firstFieldset = document.querySelector('.first-fieldset');


// функция вызова числа и склонения
function declOfNum(n, titles, from) {
  return n + ' ' + titles[from ? n % 10 === 1 && n % 100 !== 11 ? 1 : 2 : n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}
// Простые функции одна меняет для элемента display = `block`; а другая display = `none`;( в стилях style)

function showElem(elem) {
  elem.style.display = `block`;
}

function hideElem(elem) {
  elem.style.display = `none`;
}
// Функция изменения текста в для яндекс.гугл...метрик
function dopOptionsString() {
  // Подключим Яндекс Метрику, Гугл Аналитику и отправку заявок на почту.
  // изночально создаем переменную которая будет пустой строкой
  let str = '';
  // начинаем строку формировать нам нужны условия нужно проверить стоят ли .
  //галочки на яндекс метрике или гугл аналитике или отправке заявок (вверху в 
  //const получаем новые переменные HTML для каждой галочки берем id metrikaYandex,// analyticsGoogle . sendOrder).будем формировать функцию по следующим условиям
  if (metrikaYandex.checked || analyticsGoogle.checked || sendOrder.checked) {
    // Проверили если есть хоть один .checked (галочка то в строку выведем..
    //подключим)
    str += 'Подключим';

    if (metrikaYandex.checked) {
      str += ' Яндекс Метрику ';
      // Если оба try да то формируем полную строчку
      if (analyticsGoogle.checked && sendOrder.checked) {
        str += ', Гугл Аналитику и отправку заявок на почту.'
        // Выполняем return (прерываем функцию (функция выполнена вышли))
        return str;
      }
      // если if выше не сработали то следующее условие если стоит хоть одна из 
      //галочек то выполним условие добавим слово и
      if (analyticsGoogle.checked || sendOrder.checked) {
        str += ' и'
      }
    }
    // отдельно проверим чекед  у analyticsGoogle.checked и sendOrder.checked
    if (analyticsGoogle.checked) {
      str += ' Гугл аналитику';
      if (sendOrder.checked) {
        str += ' и'
      }
    }
    if (sendOrder.checked) {
      str += ' отправку заявок на почту'
    }
    str += '.';
  }

  // Возвращать в конце будем именно эту строку
  return str;
}
// Весь рендер текста будем писать в этой функции
// Сначало получаем данные renderTextContent(total, site, maxDay, minDay затем выводим на страницу в разных форматах и прогоняем через функцию function declOfNum выше
function renderTextContent(total, site, maxDay, minDay) {

  totalPriceSum.textContent = total;
  typeSite.textContent = site;
  maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
  rangeDeadline.minDay = minDay;
  rangeDeadline.maxDay = maxDay;
  deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING)
  // У этих 4 х элементов будем мнять текст пишем имя.элементимя
  // у переменной adaptValue проверяем стоит ли checked(галочка) тернарн оператора ?.//(если галочка стоит) то 'да' иначе : 'нет'
  adaptValue.textContent = adapt.checked ? 'да' : 'нет';
  mobileTemplatesValue.textContent = mobileTemplates.checked ? 'да' : 'нет';
  desktopTemplatesValue.textContent = desktopTemplates.checked ? 'да' : 'нет';
  editableValue.textContent = editable.checked ? 'да' : 'нет';
  // используем шаблонные строки и интерполяцию обязательно ковычки где ё ..
  //одинарные в др сторону.( текст овормляет хорошо с переносами)
  // В переменной ${site} вставляется слово из инпута с галочками . В зависимости ///от установленной галочки 
  //А (Подключим Яндекс Метрику, Гугл Аналитику и отправку заявок на почту.) Эту 
  //строчку будем формировать целой функцией

  calcDescription.textContent = `Сделаем ${site} ${adapt.checked ? 
    ', адаптированный под мобильные устройства и планшеты' : ''}.
    ${editable.checked ? `Установим панель админстратора, 
    чтобы вы  могли самостоятельно менять содержание на сайте без разработчика.` : ''}${dopOptionsString()} 
  `;
}
// Главная функция подсчета калькулятора
// Опишем функцыюp основная riceCalculation 1 выбирая какой сайт ///нам нужен сбрасываем все значения(все на нет,галочки все стало ///в начальное положение)будем циклом перебирать все оставшиеся
//элементы радикнопок и чак боксы  поменяем на значение false
// параметр elem = {} если ничего не будет передано то в if (elem.name ошибки не 
//будет
function priceCalculation(elem = {}) {
  //Начальные данные Результат вначале приравниваем к нулю
  let result = 0,
    index = 0,
    options = [],
    site = '',
    // Эти значения из масива получаем deadlineDay: [
    //[2, 7],
    //[3, 10],
    //[7, 14],
    //],
    maxDeadlineDay = DATA.deadlineDay[index][1],
    minDeadlineDay = DATA.deadlineDay[index][0],
    overPercent = 0;
  // В зависимости от условий выбираются чекбоксы

  if (elem.name === 'whichSite') {
    for (const item of formCalculate.elements) {
      if (item.type === 'checkbox') {
        item.checked = false;
      }
    }
    // после цикла скроем элемент fastRange
    hideElem(fastRange);
  }
  // Цикл который снимает все данные и подсчитывает Перебираем все элементы формы
  for (const item of formCalculate.elements) {
    // проверяем есть ли имя  whichSite да тогда проверяем стоит ли галочка стоит .//ли в этом элементе если да то проверяет стоит ли галочка запустится текущий блок кода

    if (item.name === 'whichSite' && item.checked) {
      // буду брать наш обьект дата со свойством whichSite метод indexOf ишем значение value в масиве и сохраняем полученое значение в index проще то начение где галочка отдаем index 
      index = DATA.whichSite.indexOf(item.value);
      site = item.dataset.site;
      maxDeadlineDay = DATA.deadlineDay[index][1];
    }
    //записываем второе условие 
    //пушим push добовляем в масив options
    else if (item.classList.contains('calc-handler') && item.checked) {
      // В цикле собирается массив options который дальше перебирается и подсчитывает результат result и собирается массив options
      options.push(item.value);
    }
    // Мы будем проверять имеет ли этот элемент класс wan-faster и чекнутый(с 
    //галочкой) и втом случае мы выпролняем подсчеты
    //  
    else if (item.classList.contains('want-faster') && item.checked) {
      // У функции priceCalculation(target); определяем максимальное значение 
      //ползунка при поставленной галочке в файле и отнимаем то значение которое у //нас вrengeDeadline.value
      // создадим переменную overDay  в которой сохраним это значение 
      //const overDay = maxDeadlineDay - rangeDeadline.value;
      // Теперь этот overDay необходимо умножать на прцент который будет браться 
      //в зависимости от индекса  (зависимость зависит от установленной галочки)в 
      //масиве deadlinePercent: [20, 17, 15] делем на 100 и сохранить в overPercent
      const overDay = maxDeadlineDay - rangeDeadline.value;
      overPercent = overDay * (DATA.deadlinePercent[index] / 100)

    }
  }
  // первое значение  зависит от цены сайта(установленной галочке)
  result += DATA.price[index];
  // будем переьирать масив методом forEach он внутри будет запускать функцию перебора получать будем ключи key обьекта data
  options.forEach(function (key) {
    // Если тип число то проверим key === 'sendOrder' если нет умножаем на % 
    // typeof 
    if (typeof (DATA[key]) === 'number') {
      if (key === 'sendOrder') {
        result += DATA[key]
      } else {
        result += DATA.price[index] * DATA[key] / 100
      }
    }
    // Если 1 проверка нет то 
    else {
      if (key === 'desktopTemplates') {
        result += DATA.price[index] * DATA[key][index] / 100
      }
      // Добовляем доп функции яндекс или и гугл 
      else {
        result += DATA[key][index];
      }
    }
  })
  // тот индекс который мы получили в index запишем в  result
  // добавляет проценты если мы включаем зочу быстрее
  result += result * overPercent

  //const overDay = maxDeadlineDay - rangeDeadline.value;

  renderTextContent(result, site, maxDeadlineDay, minDeadlineDay);
  // записываем результ  
}

//Функция получения суммы расчета
//апускаем функцию основную она запускае калькуляцию и все
//события будут
//происходить в ней с помощью делегирования ,исключения .(event)
//создается во ..
//время события(изменения галочек кнопок)
function handlerCallBackForm(event) {
  const target = event.target;
  //   условия для кнопок если аиат чекед мы должны разблакировать mobileTemplates
  if (adapt.checked) {
    mobileTemplates.disabled = false;
  }
  //  иначе 2 условие 
  else {
    mobileTemplates.disabled = true;
    mobileTemplates.checked = false;
  }
  // кнопка хочу быстрее want-faster запускает
  if (target.classList.contains('want-faster')) {
    // покажем этот элемент если target.classList.contains
    //(`want-faster`) target.checked ? tru
    // если target.checked false то мы будем скрывать этот
    //элемент  hideElem..(fastRange);
    target.checked ? showElem(fastRange) : hideElem(fastRange);
    // запускаем функциюpriceCalculation(target);
    priceCalculation(target);
  }

  // функция которая все будет подсчитывать
  if (target.classList.contains('calc-handler')) {
    priceCalculation(target);
  }
};
// Функция для визуализации переносится блок с суммой результата
function moveBackTotal() {
  if (document.documentElement.getBoundingClientRect().botton > document.documentElement.clientHeight + 200) {
    totalPrice.classList.remove('totalPriceBottom');
    endButton.before(totalPrise);
    window.removeEventListener('scroll', moveTotal);
    window.addEventListener('scroll', moveBackTotal);
  }
};

function moveTotal() {
  // если документ.элемент документа мы получеем размеры документа и мы хотим 
  //получить его самое нижнее значение для этого используем метод 
  //getBoundingClientRect нижнее значение для этого обращаемся к clientHeight
  if (document.documentElement.getBoundingClientRect().botton < document.documentElement.clientHeight + 200) {
    totalPrice.classList.add('totalPriceBottom');
    firstFieldset.after(totalPrise);
    window.removeEventListener('scroll', moveBackTotal);
    window.addEventListener('scroll', moveTotal);

  }
}

// Старт кнопки расчитать запускает калькулятор startButton
startButton.addEventListener(`click`, function () {
  // после клика
  showElem(mainForm);
  hideElem(firstScreen);
  // на обьект window  вешаем обработчик событий addEventListener  скрол scroll 
  // которую опишем moveTotal выше
  window.addEventListener('scroll', moveTotal);
});
// При клике на кнопку расчитать мы для обявленной переменной ( const endButton = .//document.querySelector(`.end-button`)) пишем эту функцию гле addEventListener-
//является способом вызова для этого нам понадобиться цыкл for в нем обьявем const //elem и будем перебирать все элементы fieldset  в of formCalculate.elements)это
// сделаем при помощи if (elem.tagName === ...`FIELDSET`) {(найдет все элементы
//FIELDSET)
//  и будет при помощи hideElem(elem);//скрывать все FIELDSET`
endButton.addEventListener(`click`, function () {
  for (const elem of formCalculate.elements) {
    if (elem.tagName === `FIELDSET`) {
      hideElem(elem);
    }
  }
  // Перед запуском 3 страницы отправки формы меняем заголовок 
  cardHead.textContent = 'Заявка на разработку сайта';
  // убираем цену разработки сайта со страницы по классу
  hideElem(totalPrice);
  // После того как элементы скрылись будем запускать функцию  
  //showElem(total);
  // делать видимым
  showElem(total);
});
// Для formCalculate вызываем функцию
//которая отслеживает изменения в форме
//калкулятора(`change`) тогда будем запускать событие `change`, 
//handlerCallBackForm это основная функция> handlerCallBackForm 
//которую ///опишем до обработчика событий т.е. выше с номером 5
formCalculate.addEventListener(`change`, handlerCallBackForm);
priceCalculation();