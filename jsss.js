// Initialization: current year and month
var dateObject = new Date();
var year = dateObject.getFullYear();
var month = dateObject.getMonth() + 1;
var day = dateObject.getDate();

// Months names
var monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var date; //= new Date(`${monthName[month - 1]} 1 ${year}`);
var startDay; //= date.getDay() == 0 ? 7 : date.getDay();
var previousMonthDays; // = new Date(year, month - 1, 0).getDate();
var currentMonthDays; //= new Date(year, month, 0).getDate();
var nextMonthDays; //= new Date(year, month == 12 ? 1 : month + 1, 0).getDate();
var offset; //= startDay <= 7 ? startDay : startDay - 7;
var previousMonthOffset; // = offset - 1;
var nextMonthOffset; //= 42 - previousMonthOffset - currentMonthDays;
var selectedDay = null;
//Test
var testDate = (_) => {
  var idDay = day < 10 ? `0${day}` : day;
  var idMonth = month < 10 ? `0${month}` : month;
  return `${year}-${idMonth}-${idDay}`;
};
var events = [
  { name: "Event", date: testDate(), description: "...", tag: "event" },
  { name: "Birthday", date: testDate(), description: " ...", tag: "birthday" },
  { name: "Festival", date: testDate(), description: "...", tag: "festival" },
  { name: "Important!", date: testDate(), description: "...", tag: "important" },
];
//End test
/* Selectors for DOM*/
var calendarContainer = document.querySelector(".calendar");
var monthsList = document.querySelector(".months");
var yearsList = document.querySelector(".years");
var clearDOM = (_) => {
  calendarContainer.innerHTML = "";
  monthsList.innerHTML = "";
  yearsList.innerHTML = "";
};
var calculateDate = (display) => {
  if (display == "months") {
    document.getElementById("showYears").textContent = `${year}`;
  } else if (display == "years") {
    document.getElementById("showYears").textContent = `${year} - ${year + 16}`;
  } else {
    document.getElementById("showMonths").textContent = `${
      monthName[month - 1]
    } ${year}`;
  }
  date = new Date(`${monthName[month - 1]} 1 ${year}`);
  startDay = date.getDay() == 0 ? 7 : date.getDay();

  previousMonthDays = new Date(year, month - 1, 0).getDate();
  currentMonthDays = new Date(year, month, 0).getDate();
  nextMonthDays = new Date(year, month == 12 ? 1 : month + 1, 0).getDate();
  offset = startDay <= 7 ? startDay : startDay - 7;
  previousMonthOffset = offset - 1;
  nextMonthOffset = 42 - previousMonthOffset - currentMonthDays;
  createCalendar();
};
//Prevous Month
var goToPrevious = (_) => {
  clearDOM();
  if (
    document.querySelector(".calendar").style.display == "none" &&
    document.querySelector(".years").style.display == "none"
  ) {
    year--;
    calculateDate("months");
  } else if (
    document.querySelector(".calendar").style.display == "none" &&
    document.querySelector(".months").style.display == "none"
  ) {
    year -= 16;
    calculateDate("years");
    createYears();
  } else {
    if (month == 1) {
      month = 12;
      year--;
    } else {
      month--;
    }
    calculateDate("calendar");
  }
};
//Next Month
var goToNext = (_) => {
  clearDOM();

  if (
    document.querySelector(".calendar").style.display == "none" &&
    document.querySelector(".years").style.display == "none"
  ) {
    year++;
    calculateDate("months");
  } else if (
    document.querySelector(".calendar").style.display == "none" &&
    document.querySelector(".months").style.display == "none"
  ) {
    year += 16;
    calculateDate("years");
    createYears();
  } else {
    if (month == 12) {
      month = 1;
      year++;
    } else {
      month++;
    }
    calculateDate("calendar");
  }
};
var selectDay = (calendarDay, i) => {
  var selected = document.getElementsByClassName("isSelected");
  [...selected].forEach((element) => element.classList.remove("isSelected"));
  calendarDay.classList.add("isSelected");
  selectedDay = calendarDay.getAttribute("id");
  var asideDay = document.querySelector(".bar-info-num");
  var asideMonth = document.querySelector(".bar-info-month");
  var asideYear = document.querySelector(".bar-info").lastElementChild;
  asideYear.innerHTML = year;
  asideDay.innerHTML = i - offset + 1;
  asideMonth.innerHTML = monthName[month - 1];
  listEventsForSelectedDay();
};
var dateFormat = (offset, i) => {
  var day = i - offset + 1;
  var idDay = day < 10 ? `0${day}` : day;
  var idMonth = month < 10 ? `0${month}` : month;
  return `${year}-${idMonth}-${idDay}`;
};
var listEventsForSelectedDay = (_) => {
  var eventList = document.querySelector("#eventList");
  eventList.innerHTML = "";
  if (events.length > 0) {
    events
      .filter((event) => event.date == selectedDay)
      .forEach((event) => {
        var eventNode = document.createElement("p");
        eventNode.classList.add("side-bar-event");
        switch (event.tag) {
          case "important":
            eventNode.classList.add("side-bar-event-important");
            break;
          case "birthday":
            eventNode.classList.add("side-bar-event-birthday");
            break;
          case "festival":
            eventNode.classList.add("side-bar-event-festival");
            break;
          default:
            eventNode.classList.add("side-bar-event");
            break;
        }
        eventNode.innerHTML = `${event.name} <span> • ${event.description}</span>`;
        eventList.appendChild(eventNode);
      });
    //  Add the events to the days
    var days = document.getElementsByClassName("current-month-day");
    [...days].forEach((day) => {
      events.forEach((event) => {
        if (day.getAttribute("id") == event.date) {
          var eventNode = document.createElement("div");
          eventNode.classList.add("event");
          switch (event.tag) {
            case "important":
              eventNode.classList.add("event-important");
              break;
            case "birthday":
              eventNode.classList.add("event-birthday");
              break;
            case "festival":
              eventNode.classList.add("event-festival");
              break;
            default:
              eventNode.classList.add("event");
              break;
          }
          day.appendChild(eventNode);
        }
      });
    });
  }
};

var createCalendar = (_) => {
  // Week days
  var weekDays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  weekDays.forEach((element, index) => {
    var weekDay = document.createElement("div");
    var weekDayName = document.createElement("p");
    weekDay.classList.add("week-day");
    weekDay.style.gridArea = `day${index + 1}`;
    weekDayName.innerHTML = element;
    weekDay.appendChild(weekDayName);
    calendarContainer.appendChild(weekDay);
  });
  // Previous month
  if (previousMonthOffset > 0) {
    var previousMonthDayNumOffset = previousMonthOffset;
    for (var i = 0; i < previousMonthOffset; i++) {
      var calendarDay = document.createElement("div");
      var calendarDayNumber = document.createElement("p");
      calendarDay.classList.add("previous-month-day");
      calendarDay.style.gridArea = `day${i + 8}`;
      calendarDayNumber.innerHTML =
        previousMonthDays - previousMonthDayNumOffset + 1;
      calendarDay.appendChild(calendarDayNumber);
      calendarContainer.appendChild(calendarDay);
      previousMonthDayNumOffset--;
    }
  }
  // Current month
  for (var i = offset; i < currentMonthDays + offset; i++) {
    var calendarDay = document.createElement("div");
    var calendarDayNumber = document.createElement("p");

    if (i % 7 == 0 && i - offset + 1 != day) {
      calendarDay.classList.add("current-month-day");
      calendarDayNumber.classList.add("sundays");
    } else if (
      i - offset + 1 == day &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth() + 1
    ) {
      // Current date
      calendarDay.classList.add("current-month-day");
      if (selectedDay === null) {
        var selected = document.getElementsByClassName("isSelected");
        [...selected].forEach((element) =>
          element.classList.remove("isSelected")
        );
        calendarDay.classList.add("isSelected");
        selectDay(calendarDay, i);
        selectedDay = dateFormat(offset, i);
      }
    } else {
      calendarDay.classList.add("current-month-day");
    }
    calendarDay.style.gridArea = `day${i + 7}`;

    calendarDayNumber.innerHTML = i - offset + 1;
    calendarDay.setAttribute("id", dateFormat(offset, i));
    calendarDay.appendChild(calendarDayNumber);
    if (calendarDay.getAttribute("id") == selectedDay) {
      calendarDay.classList.add("isSelected");
    }
    calendarContainer.appendChild(calendarDay);
    calendarDay.addEventListener("click", (_) => {
      selectDay(calendarDay, i);
    });
    listEventsForSelectedDay();
  }
  // Next month
  if (nextMonthOffset > 0) {
    for (var i = 0; i < nextMonthOffset; i++) {
      var calendarDay = document.createElement("div");
      var calendarDayNumber = document.createElement("p");

      calendarDay.classList.add("next-month-day");
      calendarDay.style.gridArea = `day${
        i + 8 + previousMonthOffset + currentMonthDays
      }`;
      calendarDayNumber.innerHTML = i + 1;
      calendarDay.appendChild(calendarDayNumber);

      calendarContainer.appendChild(calendarDay);
    }
  }
};
var chooseMonth = (choosenMonth) => {
  month = choosenMonth;
  document.getElementById("showMonths").style.display = `inline-block`;
  document.getElementById("showYears").style.display = `none`;
  calendarContainer.style.display = "grid";
  monthsList.style.display = "none";
  document.getElementById("showMonths").textContent = `${
    monthName[month - 1]
  } ${year}`;
  calculateDate(true);
};
var showMonths = (choosenYear) => {
  if (choosenYear !== null) {
    year = choosenYear;
  }
  clearDOM();
  document.getElementById("showMonths").style.display = `none`;
  document.getElementById("showYears").style.display = `inline-block`;
  document.getElementById("showYears").disabled = false;
  document.getElementById("showYears").textContent = `${year}`;
  calendarContainer.style.display = "none";
  monthsList.style.display = "grid";
  yearsList.style.display = "none";
  for (var i = 0; i < 12; i++) {
    var calendarMonth = document.createElement("div");
    var calendarMonthName = document.createElement("p");
    calendarMonth.classList.add("current-month-day");
    calendarMonth.style.gridArea = `mon${i + 1}`;
    calendarMonthName.innerHTML = monthName[i].substring(0, 3);
    calendarMonth.appendChild(calendarMonthName);
    monthsList.appendChild(calendarMonth);
    calendarMonth.addEventListener("click", (_) => chooseMonth(i + 1), false);
  }
};
var showYears = (_) => {
  document.getElementById("showMonths").style.display = `none`;
  document.getElementById("showYears").style.display = `inline-block`;
  document.getElementById("showYears").disabled = true;
  document.getElementById("showYears").textContent = `${year} ${year + 4}`;
  calendarContainer.style.display = "none";
  yearsList.style.display = "grid";
  monthsList.style.display = "none";
  createYears();
};
var createYears = (_) => {
  clearDOM();
  for (var i = 0; i < 16; i++) {
    var calendarYear = document.createElement("div");
    var calendarYearName = document.createElement("p");
    calendarYear.classList.add("current-month-day");
    calendarYear.style.gridArea = `year${i + 1}`;
    calendarYearName.innerHTML = year + i;
    calendarYear.appendChild(calendarYearName);
    yearsList.appendChild(calendarYear);
    calendarYear.addEventListener("click", (_) => showMonths(year + i), false);
  }
};
// Event popup
var showPopupEvent = (_) => {
  var eventPopup = document.querySelector("#eventPopup");
  eventPopup.classList.add("isVisible");
  document.body.classList.add("overlay");
  var selected = document.querySelector(".isSelected");
  var day =
    selected.firstElementChild.innerText < 10
      ? `0${selected.firstElementChild.innerText}`
      : selected.firstElementChild.innerText;
  document.querySelector('input[type="date"]').value =
    month < 10 ? `${year}-0${month}-${day}` : `${year}-${month}-${day}`;
};
var closePopup = (_) => {
  var eventPopup = document.querySelector("#eventPopup");
  eventPopup.classList.remove("isVisible");
  document.body.classList.remove("overlay");
};
var createEvent = (_) => {
  var element = event.target;
  var eventElement = document.createElement("div");
  eventElement.innerText = "Kukuriku";
  element.appendChild(eventElement);
};
// Events
var btnPreviousMonth = document.querySelector("#prev");
var btnNextMonth = document.querySelector("#next");
var btnShowMonths = document.querySelector("#showMonths");
var btnShowYears = document.querySelector("#showYears");
var btnToday = document.querySelector("#today");
var btnAddEvent = document.querySelector("#addEvent");
var btnClosePopup = document.querySelector("#closePopup");
var btnStoreEvent = document.querySelector("#storeEvent");
document.addEventListener("DOMContentLoaded", calculateDate);
btnPreviousMonth.addEventListener("click", goToPrevious);
btnNextMonth.addEventListener("click", goToNext);
btnShowMonths.addEventListener("click", (_) => showMonths(null), false);
btnShowYears.addEventListener("click", showYears);
btnToday.addEventListener("click", (_) => {
  clearDOM();
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  selectedDay = null;
  calculateDate();
});
btnAddEvent.addEventListener("click", showPopupEvent);
btnClosePopup.addEventListener("click", closePopup);
// Store event
class Event {
  constructor(name, date, description, tag) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.tag = tag;
  }
  static storeEvent(event) {
    events.push(event);
  }
}
btnStoreEvent.addEventListener("click", (e) => {
  var name = document.querySelector("input[name=name]").value;
  var date = document.querySelector("input[name=date]").value;
  var description = document.querySelector("textarea[name=description]").value;
  var tag = document.querySelector("select[name=tag]").value;
  var newEvent = new Event(name, date, description, tag);
  if (name === "" || date === "" || description === "" || tag === "") {
    alert("Please fill in all fields", "info");
    return;
  } else {
    Event.storeEvent(newEvent);
    closePopup();
  }
  listEventsForSelectedDay();
});