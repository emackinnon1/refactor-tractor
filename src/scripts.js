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
let userID = Math.floor(Math.random() * 50);

Promise.all([
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData")
  .then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData")
  .then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData")
  .then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData")
  .then(response => response.json())
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

function makeRepo(users, sleep, hydration, activity) {
  userRepository = new UserRepository(users, hydration, activity, sleep);
  getRandomUser(hydration, activity, sleep);
}

function getRandomUser(hydration, activity, sleep) {
  user = new User(userRepository.users[userID - 1], hydration, activity, sleep);
}

function getUserName(data) {
  $("#header-name").text(`${user.getFirstName()}'S FITLIT`);
}

function displayDailySteps() {
  let steps = user.activityRecord.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).numSteps;
  $("#steps-user-steps-today").text(steps);
}

function displayDailyWater() {
  let water = user.hydrationRecord.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces;
  $("#hydration-user-ounces-today").text(water);
}

function displayDailyStairs() {
  let stairs =
    user.activityRecord.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    }).flightsOfStairs * 12;
  $("#stairs-user-stairs-today").text(stairs);
}

function displayDailySleep() {
  let sleep = user.sleepRecord.find(sleep => {
    return sleep.userID === user.id && sleep.date === todayDate;
  }).hoursSlept;
  $("#sleep-user-hours-today").text(sleep);
}

// inner text
// $('#dropdown-email').text(`EMAIL | ${user.email}`);
// $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
// $('#dropdown-name').text(user.name.toUpperCase());
// $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));
// $('#hydration-info-glasses-today').text(hydrationData.find(hydration => {return hydration.userID === user.id && hydration.date === todayDate}).numOunces / 8);
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
// $('#steps-calendar-total-steps-weekly').text(user.calculateAverageStepsThisWeek(todayDate));
// $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate));
// $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
// $('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate));
// $('#steps-info-active-minutes-today').text(activityData.find(activity => {return activity.userID === user.id && activity.date === todayDate}).minutesActive);
// $(stepsInfoMilesWalkedToday).text(user.activityRecord.find(activity => {return (activity.date === todayDate && activity.userId === user.id)}).calculateMiles(userRepository));
//$('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);

// original code below

// user.findFriendsNames(userRepository.users);

//EM: too many variables
// let dailyOz = document.querySelectorAll('.daily-oz');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationMainCard = document.querySelector('#hydration-main-card');
// let mainPage = document.querySelector('main');
// let profileButton = document.querySelector('#profile-button');
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
// let stepsMainCard = document.querySelector('#steps-main-card');
// let stepsInfoCard = document.querySelector('#steps-info-card');
// let stepsFriendsCard = document.querySelector('#steps-friends-card');
// let stepsTrendingCard = document.querySelector('#steps-trending-card');
// let stepsCalendarCard = document.querySelector('#steps-calendar-card');
// let stairsFriendsCard = document.querySelector('#stairs-friends-card');
// let stairsInfoCard = document.querySelector('#stairs-info-card');
// let stairsMainCard = document.querySelector('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
// let stairsTrendingCard = document.querySelector('#stairs-trending-card');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
// let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
// let userInfoDropdown = document.querySelector('#user-info-dropdown');

// event listeners
// // mainPage.addEventListener('click', showInfo);
// // profileButton.addEventListener('click', showDropdown);
// // stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// // stepsTrendingButton.addEventListener('click', updateTrendingStepDays());

// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

// function showDropdown() {
//   userInfoDropdown.classList.toggle('hide');
// }

// //EM: needs refactoring
// function showInfo() {
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }

// // function updateTrendingStairsDays() {
// //   user.findTrendingStairsDays();
// //   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// // }

// //EM: duplicate function?
// // function updateTrendingStepDays() {
// //   user.findTrendingStepDays();
// //   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// // }

// //EM: for loop outside of function?
// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }

// //EM: should be inside function
// stairsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// });

// stepsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });

// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });

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
