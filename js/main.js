let tabs = document.querySelectorAll('.tab');
let calculators = document.querySelectorAll('.calculator');

function changeTab(index) {
  tabs.forEach((tab, tabIndex) => {
    if (tabIndex === index) {
      tab.classList.add('active');
      calculators[tabIndex].classList.add('active');
    } else {
      tab.classList.remove('active');
      calculators[tabIndex].classList.remove('active');
    }
  });
}

changeTab(0);

const calcsSelect = document.getElementById('difference');
const subCalcs = document.querySelector('.sub-calculator-container');

function changeCalculators(){
  [...subCalcs.querySelectorAll('.sub-calculator')].forEach((item) => {
    item.style.display = 'none';
  });
  subCalcs.querySelector(`#${calcsSelect.value}`).style.display = 'block';
}

changeCalculators();
calcsSelect.addEventListener('input', changeCalculators);

// input custom number element
const inputFields = document.querySelectorAll('.input-field');
const incrementButtons = document.querySelectorAll('.increment-button');
const decrementButtons = document.querySelectorAll('.decrement-button');

inputFields.forEach((inputField, index) => {
  inputField.value = '';
  inputField.addEventListener('input', () => {
    const currentValue = inputField.value;
    const regex = /^[0-9]*\.?[0-9]*$/; // Регулярное выражение для положительных чисел с точкой
    if (!regex.test(currentValue)) {
      inputField.value = currentValue.slice(0, -1); // Удаляем последний символ, если он не соответствует регулярному выражению
    }

  });

  incrementButtons[index].addEventListener('click', () => {
    if (isNaN(inputField.value) || inputField.value === undefined || inputField.value === "") {
      inputField.value = 0;
    }
    inputField.value = (parseFloat(inputField.value) + 1).toString();
  });

  decrementButtons[index].addEventListener('click', () => {
    const currentValue = parseFloat(inputField.value);
    if (currentValue > 0) {
      inputField.value = (currentValue - 1).toString();
    }
  });
});

// Third Calculator
function daysResult(daysDifference, planetDays) {
  let endedArr = [];
  let result = Math.trunc(daysDifference / planetDays);
  if (result === 0) {
    result = Math.trunc(daysDifference / (planetDays / 12));
    if (result === 0) {
      endedArr.push('меньше месяца');
    } else {
      let tempData = result % 10;
      endedArr.push(result + (((tempData === 1) && ((result % 100) !== 11)) ? ' месяц'
        : (((((tempData === 2) || (tempData === 3) || (tempData === 4)) && ((result % 100 !== 12) && (result % 100 !== 14) && (result % 100 !== 13)))) ? ' месяца' : ' месяцев')));
    }
  } else {
    let tempData = result % 10;
    endedArr.push(result + (((tempData === 1) && ((result % 100) !== 11)) ? ' год'
      : ((((tempData === 2) || (tempData === 3) || (tempData === 4)) && ((result % 100 !== 12) && (result % 100 !== 14) && (result % 100 !== 13)))) ? ' года' : ' лет'));
    result = Math.trunc(daysDifference / (planetDays / 12) - result * 12);
    if (result !== 0) {
      tempData = result % 10;
      endedArr.push(result + (((tempData === 1) && ((result % 100) !== 11)) ? ' месяц'
        : (((((tempData === 2) || (tempData === 3) || (tempData === 4)) && ((result % 100 !== 12) && (result % 100 !== 14) && (result % 100 !== 13)))) ? ' месяца' : ' месяцев')));
    }
  }

  return endedArr;
}

document.getElementById("planet-btn").addEventListener("click", function () {
  const parentElement = document.getElementById('date-picker-planets');

  const selectedDay = parentElement.querySelector(".day").value;
  const selectedMonth = parentElement.querySelector(".month").value;
  const selectedYear = parentElement.querySelector(".year").value;

  const resultsList = document.getElementById('results-planets');

  const weight = parseFloat(document.getElementById('weight').value);

  const celestialBodies = [
    { name: 'Меркурий', qAroundSun: 88, gravity: 3.7 },
    { name: 'Венера', qAroundSun: 224.7, gravity: 8.87 },
    { name: 'Марс', qAroundSun: 799.94, gravity: 3.71 },
    { name: 'Юритер', qAroundSun: 11.86 * 365.25, gravity: 24.79 },
    { name: 'Сатурн', qAroundSun: 10759, gravity: 10.44 },
    { name: 'Уран', qAroundSun: 84 * 365.25, gravity: 8.87 },
    { name: 'Нептун', qAroundSun: 164.79 * 365.25, gravity: 11.15 },
    { name: 'Плутон', qAroundSun: 248 * 365.25, gravity: 0.62 },
  ];
  if (!isNaN(selectedDay) && !isNaN(selectedMonth) && !isNaN(selectedYear)) {
    const pickedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    const currentDate = new Date();
    const daysDifference = Math.trunc((currentDate - pickedDate) / (3600 * 24 * 1000));
    if (daysDifference + 1 < 0) {
      resultsList.innerHTML = '<p style="color: red;">Выбранная дата не может относится к будущему</p>';
    } else if (daysDifference / 365.245 > 120) {
      resultsList.innerHTML = '<p style="color: red;">Возраст не должен превышать 120 лет</p>';
    } else if (weight === 0 || isNaN(weight)) {
      resultsList.innerHTML = `<p>Видимо вы достигли такого уровня развития, что не нуждаетесь в физической оболочке. В таком случае вспомните каким был ваш вес до того как вы достигли этой формы.`

    } else if(weight >= 200){
      resultsList.innerHTML = `<p style="color: red;">${weight}кг - как-то многовато для студента матфака.</p>`
    } else {
      resultsList.innerHTML = '';
      for (let i = 0; i < celestialBodies.length; i++) {
        let dd = celestialBodies[i].qAroundSun;
        let grav = celestialBodies[i].gravity;
        resultsList.innerHTML += `<li>${celestialBodies[i].name}:<br/>
        Вес - <span class="weight">${(weight / 9.81 * grav).toFixed(2)}кг</span> <br>
        Возраст - <span class="age">${daysResult(daysDifference, dd).join(' ')}</span><br/><br/>
        </li>`;
      }
    }
  }
});

document.getElementById("day-to-week").addEventListener('click', function() {
  const parentElement = document.getElementById('date-picker-week');

  const selectedDay = parentElement.querySelector(".day").value;
  const selectedMonth = parentElement.querySelector(".month").value;
  const selectedYear = parentElement.querySelector(".year").value;

  const resultsList = document.getElementById('results-week');

  const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  const pickedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
  const dayIndex = pickedDate.getDay();

  resultsList.innerHTML = `<span style="color: #E06C75">${daysOfWeek[dayIndex]}</span> ${toDay(pickedDate)}`;
});

document.getElementById("day-to-difference").addEventListener('click', function() {
  const parentElement1 = document.getElementById('date-picker-dif1');

  const selectedDay1 = parentElement1.querySelector(".day").value;
  const selectedMonth1 = parentElement1.querySelector(".month").value;
  const selectedYear1 = parentElement1.querySelector(".year").value;

  const parentElement2 = document.getElementById('date-picker-dif2');

  const selectedDay2 = parentElement2.querySelector(".day").value;
  const selectedMonth2 = parentElement2.querySelector(".month").value;
  const selectedYear2 = parentElement2.querySelector(".year").value;

  const resultsList = document.getElementById('results-two-dates');

  const firstDate = new Date(selectedYear1, selectedMonth1 - 1, selectedDay1);
  const secondDate = new Date(selectedYear2, selectedMonth2 - 1, selectedDay2);
  let daysDifference = Math.trunc(Math.abs((firstDate - secondDate)/ (1000*3600*24)));

  resultsList.innerHTML = `${numberSpaces(daysDifference)} ${((daysDifference % 10 === 1 && daysDifference % 100 !== 11) ? ' день'
  : (((((daysDifference % 10 === 2) || (daysDifference % 10 === 3) || (daysDifference % 10 === 4)) 
  && ((daysDifference % 100 !== 12) && (daysDifference % 100 !== 14) && (daysDifference % 100 !== 13)))) 
  ? ' дня' : ' дней'))}`;
  resultsList.style.color = 'blue';
  resultsList.style.textAlign = 'center';
})

function numberSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function toDay(selectedDate){
  const daysDifference = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0,0) - selectedDate;
  if(daysDifference !== 0){
      if(daysDifference <= 0){
        let metaDate = Math.trunc(Math.abs(daysDifference / (1000*3600*24)));
        return (`- через <span style="color: #56B6C2">${numberSpaces(metaDate)}</span> ${((metaDate % 10 === 1 && metaDate % 100 !== 11) ? ' день'
        : (((((metaDate % 10 === 2) || (metaDate % 10 === 3) || (metaDate % 10 === 4)) 
        && ((metaDate % 100 !== 12) && (metaDate % 100 !== 14) && (metaDate % 100 !== 13)))) 
        ? ' дня' : ' дней'))}`);
      } else{
        let metaDate = Math.trunc(daysDifference / (1000*3600*24));
        return (`- <span style="color: #56B6C2">${numberSpaces(metaDate)}</span> ${((metaDate % 10 === 1 && metaDate % 100 !== 11) ? ' день'
        : (((((metaDate % 10 === 2) || (metaDate % 10 === 3) || (metaDate % 10 === 4)) 
        && ((metaDate % 100 !== 12) && (metaDate % 100 !== 14) && (metaDate % 100 !== 13)))) 
        ? ' дня' : ' дней'))} тому назад`);
      }
  } else {
    return '';
  }
}
// Date picker
// function initializeDatePicker(parentPicker, initialDay) {
//   const parentElement = document.getElementById(parentPicker);
//   const daySelect = parentElement.querySelector(".day");
//   const monthSelect = parentElement.querySelector(".month");
//   const yearInput = parentElement.querySelector(".year");

//   let currentDay = initialDay || 1;

//   function daysInMonth(month, year) {
//     return new Date(year, month, 0).getDate();
//   }

//   function populateDays() {
//     const selectedMonth = parseInt(monthSelect.value);
//     const selectedYear = parseInt(yearInput.value);

//     if (isNaN(selectedYear)) {
//       return;
//     }

//     const daysCount = daysInMonth(selectedMonth, selectedYear);

//     daySelect.innerHTML = "";

//     for (let day = 1; day <= daysCount; day++) {
//       const option = document.createElement("option");
//       option.value = day;
//       option.text = day;
//       daySelect.appendChild(option);
//     }

//     if (currentDay > daysCount) {
//       currentDay = daysCount;
//     }

//     daySelect.value = currentDay;
//   }

//   function handleMonthChange() {
//     currentDay = daySelect.value;
//     populateDays();
//   }

//   function handleYearInput() {
//     const enteredYear = yearInput.value;

//     const regex = /^\d{1,4}$/;
//     if (!regex.test(enteredYear)) {
//       yearInput.value = enteredYear.slice(0, -1);
//     } else {
//       currentDay = daySelect.value;
//       populateDays();
//     }
//   }

//   monthSelect.addEventListener("input", handleMonthChange);
//   yearInput.addEventListener("blur", handleYearInput);

//   const currentYear = new Date().getFullYear();
//   yearInput.value = currentYear;

//   const months = [
//     "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
//     "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
//   ];

//   for (let i = 0; i < months.length; i++) {
//     const option = document.createElement("option");
//     option.value = i + 1;
//     option.text = months[i];
//     monthSelect.appendChild(option);
//   }

//   populateDays();
// }
function initializeDatePicker(parentPicker, initialDay) {
  const parentElement = document.getElementById(parentPicker);
  const daySelect = parentElement.querySelector(".day");
  const monthSelect = parentElement.querySelector(".month");
  const yearInput = parentElement.querySelector(".year");

  let currentDay = initialDay || 1;

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function populateDays() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearInput.value);

    if (isNaN(selectedYear)) {
      return;
    }

    const daysCount = daysInMonth(selectedMonth, selectedYear);

    daySelect.innerHTML = "";

    for (let day = 1; day <= daysCount; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.text = day;
      daySelect.appendChild(option);
    }

    if (currentDay > daysCount) {
      currentDay = daysCount;
    }

    daySelect.value = currentDay;
  }

  function handleMonthChange() {
    currentDay = daySelect.value;
    populateDays();
  }

  function handleYearInput() {
    const enteredYear = yearInput.value;

    const regex = /^\d{1,4}$/;
    if (!regex.test(enteredYear)) {
      yearInput.value = enteredYear.slice(0, -1);
    } else {
      currentDay = daySelect.value;
      populateDays();
    }
  }
  function handleYearInputIn() {
    const enteredYear = yearInput.value;

    const regex = /^\d{1,4}$/;
    if (!regex.test(enteredYear)) {
      yearInput.value = enteredYear.slice(0, -1);
    }
  }

  monthSelect.addEventListener("input", handleMonthChange);
  yearInput.addEventListener("input", handleYearInputIn);
  yearInput.addEventListener("blur", handleYearInput);

  const currentYear = new Date().getFullYear();
  yearInput.value = currentYear;

  const months = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.value = i + 1;
    option.text = months[i];
    monthSelect.appendChild(option);
  }

  // Устанавливаем текущий месяц по умолчанию
  const currentMonth = new Date().getMonth() + 1; // +1, так как месяцы в JavaScript начинаются с 0
  monthSelect.value = currentMonth;

  populateDays();
}

//Second calculator
// day of week
initializeDatePicker('date-picker-week', new Date().getDate());
// day difference
initializeDatePicker('date-picker-dif1', new Date().getDate());
initializeDatePicker('date-picker-dif2', new Date().getDate());
// Third Calculator
initializeDatePicker('date-picker-planets', new Date().getDate());

document.body.style.opacity = 0;
window.onload = function(){
    setInterval(() => {
        document.body.style.opacity = 1;
    }, 500);
    const divElems = document.querySelectorAll('body > div');
        [...divElems].forEach(item => {
        if(item.style.display === 'block' && item.style.position === 'fixed' &&
        item.style.zIndex == 9999999){
        item.remove();
        }
    });
}