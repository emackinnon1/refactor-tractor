import $ from "jquery";
import "./css/base.scss";
import "./css/styles.scss";

import UserRepository from "./UserRepository";
import User from "./User";
import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";

let todayDate = "2019/09/22";
let userRepository;
let user;
let userID = Math.floor(Math.random() * 51);
console.log(userID)

// event listeners
$('#profile-button').on('click', showDropdown);
$('main').on('click', showInfo);
$('.hydration-friends-button').on('click', displayAverageDailyHydration);
$('.hydration-info-button').on('click', displayNumOunces);
$('.stairs-info-button').on('click', displayDailyFlightsClimbed);
$('.stairs-friends-button').on('click', displayAllUsersAverageFlights);
$('.stairs-trending-button').on('click', displayTrendingStairsInfo);
$('.stairs-calendar-button').on('click', displayWeeklyFlightsAndStairs);
$("#profile-button").on("click", showDropdown);
$("main").on("click", showInfo);
$(".hydration-friends-button").on("click", displayAverageDailyHydration);
$(".hydration-info-button").on("click", displayNumOunces);
$('.hydration-calendar-button').on('click', displayDailyOuncesPerWeek);

$(".sleep-info-button").on("click", displaySleepInfo);
$(".sleep-friends-button").on("click", displayFriendsSleepInfo);
$(".sleep-calendar-button").on("click", displayWeeklySleepInfo);

function retrieveAllData() {
  Promise.all([
    fetch(
      "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData"
    ).then(response => response.json()),
    fetch(
      "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData"
    ).then(response => response.json()),
    fetch(
      "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData"
    ).then(response => response.json()),
    fetch(
      "https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData"
    ).then(response => response.json())
  ])
    .then(data =>
      makeRepo(
        data[0].userData,
        data[1].sleepData,
        data[2].hydrationData,
        data[3].activityData
      )
    )
    .then(data => userRepository.getUser(userID))
    .then(data => getUserName(data))
    .then(data => displayDailySteps())
    .then(data => displayDailyWater())
    .then(data => displayDailyStairs())
    .then(data => displayDailySleep())
    .catch(error => console.log(error));
}

function makeRepo(users, sleep, hydration, activity) {
  userRepository = new UserRepository(users, hydration, activity, sleep);
  getRandomUser();
}

function getRandomUser() {
  user = userRepository.getUser(userID)
  console.log(user)
}

function getUserName(data) {
  $("#header-name").text(`${user.getFirstName()}'S FITLIT`);
}

// move to domUpdates?
function displayDailySteps() {
  let steps = user.activityRecord.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps;
  $("#steps-user-steps-today").text(steps);
}

// move to domUpdates?
function displayDailyWater() {
  let water = user.hydrationRecord.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces;
  $("#hydration-user-ounces-today").text(water);
}

function displayAllUsersAverageFlights() {
  console.log(userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs'))
  let allAverageFlights = userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs')
  $('#stairs-friend-flights-average-today').text(`${allAverageFlights}`)
}
// move to domUpdates?
function displayDailyStairs() {
  let stairs =
    user.activityRecord.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    }).flightsOfStairs * 12;
  $("#stairs-user-stairs-today").text(stairs);
}

function displayWeeklyFlightsAndStairs() {
  let stepsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate))))
  let flightsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate)/12)))
  $('#stairs-calendar-stairs-average-weekly').text(stepsThisWeek)
  $('#stairs-calendar-flights-average-weekly').text(flightsThisWeek)
}

function displayDailyFlightsClimbed() {
  let stairs =
    user.activityRecord.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    }).flightsOfStairs;
    $('#stairs-info-flights-today').text(stairs)
}

// move to domUpdates?
function displayDailySleep() {
  let sleep = user.sleepRecord.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept;
  $("#sleep-user-hours-today").text(sleep);
}

function displayTrendingStairsInfo() {
    let trendingDays = user.findTrendingStairsDays();
    console.log(trendingDays)
    $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${trendingDays}</p>`);
}

function showDropdown() {
  $("#dropdown-name").text(user.name.toUpperCase());
  $("#user-info-dropdown").toggleClass("hide");
  $("#dropdown-email").text(`EMAIL | ${user.email}`);
  $("#dropdown-goal").text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
  user.findFriendsTotalStepsForWeek(userRepository, todayDate);

  if ($("#dropdown-friends-steps-container").children().length === 0) {
    user.friendsWeeklySteps.forEach(friend => {
      $("#dropdown-friends-steps-container").append(`
        <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
        `);
    });
  }
}

$("#profile-button").on("click", showDropdown);
$("main").on("click", showInfo);
$("#sleep-entry-button").on("click", displayForm);
$("#activity-entry-button").on("click", displayForm);
$("#hydration-entry-button").on("click", displayForm);

function displayForm(event) {
  let currentCategory = $(event.target)
    .attr("id")
    .split("-")[0];
  let allPages = $(".allPageInfo")
    .children()
    .toArray()
    .splice(0, 5);
  allPages.forEach(page => $(page).addClass("hide"));
  $(`.${currentCategory}-data-form`).removeClass("hide");
  if (currentCategory === "sleep") {
    $(`.${currentCategory}-data-form`).html(`<form id="sleep-info">
      <label for="date">Date</label>
      <input type="date" id="sleep-date" name="date" class="dateInfo">
      <label for="hoursSlept">Hours of Sleep</label>
      <input type="text" id="hoursSlept" name="hoursSlept">
      <label for="sleepQuality">Estimated Sleep Quality</label>
      <input type="text" id="sleepQuality" name="sleepQuality">
      <button type="submit" class="entry-button">Submit</button>
      </form>`);
    $("#sleep-info").on("submit", postFormData);
  } else if (currentCategory === "activity") {
    $(`.${currentCategory}-data-form`).html(`<form id="activity-info">
      <label for="date">Date</label>
      <input type="date" id="activity-date" name="date" class="dateInfo">
      <label for="numSteps">Number of Steps</label>
      <input type="text" id="numSteps" name="numSteps">
      <label for="minutesActive">Active Minutes</label>
      <input type="text" id="minutesActive" name="minutesActive">
      <label for="flightsOfStairs">Flights of Stairs Climbed</label>
      <input type="text" id="flightsOfStairs" name="flightsOfStairs">
      <button type="submit" class="entry-btn">Submit</button>
      </form>`);
    $("#activity-info").on("submit", postFormData);
  } else if (currentCategory === "hydration") {
    $(`.${currentCategory}-data-form`).html(`<form id="hydration-info">
    <label for="date">Date</label>
    <input type="date" id="hydration-date" name="date" class="dateInfo">
    <label for="numSteps">Number of Ounces of Water Consumed</label>
    <input type="text" id="numOunces" name="numOunces">
    <button type="submit" class="entry-btn">Submit</button>
    </form>`);
    $("#hydration-info").on("submit", postFormData);
  }
}

function postFormData(event) {
  let currentSection = $(event.target)
    .attr("id")
    .split("-")[0];
  let url = `https://fe-apps.herokuapp.com/api/v1/fitlit/1908/${currentSection}/${currentSection}Data`;
  event.preventDefault();
  let mainBody = {
    userID: Number(user.id),
    date: $(`#${currentSection}-date`)
      .val()
      .split("-")
      .join("/")
  };
  if (currentSection === "sleep") {
    mainBody.hoursSlept = +$("#hoursSlept").val();
    mainBody.sleepQuality = +$("#sleepQuality").val();
  } else if (currentSection === "hydration") {
    mainBody.numOunces = +$("#numOunces").val();
  } else if (currentSection === "activity") {
    (mainBody.numSteps = +$("#numSteps").val()),
      (mainBody.minutesActive = +$("#minutesActive").val()),
      (mainBody.flightsOfStairs = +$("#flightsOfStairs").val());
  }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mainBody)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .then(data => retrieveAllData());

  let allPages = $(".allPageInfo")
    .children()
    .toArray()
    .splice(0, 5);
  console.log(allPages);
  allPages.forEach(page => $(page).addClass("hide"));
  $("main").removeClass("hide");
}

function showInfo(event) {
  let type = $(event.target)
    .attr("class")
    .split(" ")[0];
  let buttonType = $(event.target)
    .attr("class")
    .split(" ")[1];

  if ($(event.target).is("button")) {
    clear(type);
    $(`#${type}-main-card`).addClass("hide");
    $(`#${type}-${buttonType}-card`).removeClass("hide");
  }

  if ($(event.target).hasClass(`${type}-go-back-button`)) {
    clear(type);
  }
  displayStepCardInfo()
}

function clear(category) {
  let allCategoryCards = $(`#${category}-card-container`)
    .children()
    .toArray();

  allCategoryCards.forEach(element => $(element).addClass("hide"));
  $(`#${category}-main-card`).removeClass("hide");
}

function flipCard(event) {
  event.target.classList.addClass("hide");
  cardToShow.classList.removeClass("hide");
}

// step display ------------------------------------
function displayStepCardInfo() {
  $('#steps-info-active-minutes-today').text(user.calculateDailyMinutesActive(todayDate));
  $('#steps-info-miles-walked-today').text(user.calculateDailyMiles(todayDate));
  $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageActivity(todayDate, 'minutesActive'));
  $('#steps-friend-steps-average-today').text(userRepository.calculateAverageActivity(todayDate, 'numSteps'));
  $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
  updateTrendingStepDays();
  $('#steps-calendar-total-active-minutes-weekly').text(`${user.calculateAverageMinutesActiveThisWeek(todayDate)}`);
  $('#steps-calendar-total-steps-weekly').text(`${user.calculateTotalStepsThisWeek(todayDate)}`);
}

// move to domUpdates?
function updateTrendingStepDays() {
  user.findTrendingStepDays();
  $(".trending-steps-phrase-container").html(
    `<p class='trend-line'>${user.trendingStepDays[0]}</p>`
  );
}

// move to domUpdates?
function displayAverageDailyHydration() {
  $("#hydration-friend-ounces-today").text(
    user.getAllTimeAverage(user.hydrationRecord, "numOunces")
  );
}

function displayNumOunces() {
  $("#hydration-info-glasses-today").text(
    user.getEntryDataByDate(user.hydrationRecord, "numOunces", todayDate) / 8
  );
}

function displayDailyOuncesPerWeek() {
  // let allDailyOz = $('.daily-oz').toArray();
  // $(allDailyOz).each(day => {
  //
  //    $(day).text('hello')
  //   console.log($(day)[0])
  //   console.log('just day', $(day))
  // });

  let sortedHydrationDataByDate = user.hydrationRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });

  let dailyOz = document.querySelectorAll('.daily-oz');
  for (var i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.getFluidOuncesByDate(Object.keys(sortedHydrationDataByDate[i])[0])
  }
}

// For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)

function displaySleepInfo() {
  $("#sleep-info-quality-today").text(
    user.getEntryDataByDate(user.sleepRecord, "hoursSlept", todayDate)
  );
  $("#sleep-info-hours-average-alltime").text(
    user.getAllTimeAverage(user.sleepRecord, "hoursSlept")
  );
  $("#sleep-info-quality-average-alltime").text(
    user.getAllTimeAverage(user.sleepRecord, "sleepQuality")
  );
}

function displayFriendsSleepInfo() {
  $("#sleep-friend-longest-sleeper").text(
    userRepository.getLongestSleepers(todayDate)
  );
  $("#sleep-friend-worst-sleeper").text(
    userRepository.getWorstSleepers(todayDate)
  );
}

function displayWeeklySleepInfo() {
  $("#sleep-calendar-hours-average-weekly").text(
    user.calculateSleepAverageThisWeek(todayDate, "hoursSlept")
  );
  $("#sleep-calendar-quality-average-weekly").text(
    user.calculateSleepAverageThisWeek(todayDate, "sleepQuality")
  );
}

$(window).on("load", retrieveAllData);

// move to domUpdates? (and everything below)

// $('#sleep-calendar-hours-average-weekly').text(user.calculateAverageHoursThisWeek(todayDate));

// $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {return user.id === userRepository.getLongestSleepers(todayDate)}).getFirstName());

// $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {return user.id === userRepository.getWorstSleepers(todayDate)}).getFirstName());

// $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);

// $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);

// $('#sleep-info-quality-today').text(sleepData.find(sleep => {return sleep.userID === user.id && sleep.date === todayDate;}).sleepQuality);

// $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0));

// $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate));

// $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));

// $('#stairs-info-flights-today').text(activityData.find(activity => {return activity.userID === user.id && activity.date === todayDate}).flightsOfStairs);

// $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageMinutesActiveThisWeek(todayDate));


// $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate));



// $('#steps-info-active-minutes-today').text(user.calculateDailyMiles(todayDate));

// $(stepsInfoMilesWalkedToday).text(user.activityRecord.find(activity => {return (activity.date === todayDate && activity.userId === user.id)}).calculateMiles(userRepository));

//$('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);

// -----------------------------------------------
// original code below
// user.findFriendsNames(userRepository.users);

// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationMainCard = document.querySelector('#hydration-main-card');
// let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
// let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepMainCard = document.querySelector('#sleep-main-card');

// //EM: sortedHydrationDataByDate should be in a function?
// // let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
// //   if (Object.keys(a)[0] > Object.keys(b)[0]) {
// //     return -1;
// //   }
// //   if (Object.keys(a)[0] < Object.keys(b)[0]) {
// //     return 1;
// //   }
// //   return 0;
// // });

// let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
// let stairsInfoCard = document.querySelector('#stairs-info-card');
// let stairsMainCard = document.querySelector('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
// let stairsTrendingCard = document.querySelector('#stairs-trending-card');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');

// event listeners
// // stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// // stepsTrendingButton.addEventListener('click', updateTrendingStepDays());

// //EM: needs refactoring

// // function updateTrendingStairsDays() {
// //   user.findTrendingStairsDays();


// //EM: duplicate function?
// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }

// //EM: for loop outside of function?

// //EM: should be inside function


// stepsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });

// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

// //EM: refactor
// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });
