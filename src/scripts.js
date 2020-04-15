import $ from "jquery";
import "./css/base.scss";
import "./css/styles.scss";

import domUpdates from "./domUpdates";
import UserRepository from "./UserRepository";
import User from "./User";
import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";

export let todayDate = "2019/09/22";
export let userRepository;
export let user;
let userID = Math.floor(Math.random() * 51);
console.log(userID);

// event listeners
$(window).on("load", retrieveAllData);
$('#profile-button').on('click', showDropdown);
$('main').on('click', showInfo);
$("#sleep-entry-button").on("click", domUpdates.displayForm);
$("#activity-entry-button").on("click", domUpdates.displayForm);
$("#hydration-entry-button").on("click", domUpdates.displayForm);
$('.stairs-info-button').on('click', domUpdates.displayDailyFlightsClimbed);
$('.stairs-friends-button').on('click', domUpdates.displayAllUsersAverageFlights);
$('.stairs-trending-button').on('click', domUpdates.displayTrendingStairsInfo);
$('.stairs-calendar-button').on('click', domUpdates.displayWeeklyFlightsAndStairs);
$('.hydration-info-button').on('click', domUpdates.displayNumOunces);
$(".hydration-friends-button").on("click", domUpdates.displayAverageDailyHydration);
$(".sleep-info-button").on("click", domUpdates.displaySleepInfo);
$(".sleep-friends-button").on("click", domUpdates.displayFriendsSleepInfo);
$(".sleep-calendar-button").on("click", domUpdates.displayWeeklySleepInfo);


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
							.then(data => user.getFirstName())
							.then(data => user.getWeeklyFluidOunces())
							.then(data => domUpdates.displayDailySteps())
							.then(data => domUpdates.displayDailyWater())
							.then(data => domUpdates.displayDailyStairs())
							.then(data => domUpdates.displayDailySleep())
							.catch(error => console.error());
						}
						
						function makeRepo(users, sleep, hydration, activity) {
							userRepository = new UserRepository(users, hydration, activity, sleep);
							getRandomUser();
						}
						
						function getRandomUser() {
							user = userRepository.getUser(userID)
						}
						setTimeout(function(){
							console.log(user);
					}, 3000);

						
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
								<button type="submit" class="sleep-submit-button">Submit</button>
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
								<button type="submit">Submit</button>
								</form>`);
								$("#activity-info").on("submit", postFormData);
							} else if (currentCategory === "hydration") {
								$(`.${currentCategory}-data-form`).html(`<form id="hydration-info">
    <label for="date">Date</label>
    <input type="date" id="hydration-date" name="date" class="dateInfo">
    <label for="numSteps">Number of Ounces of Water Consumed</label>
    <input type="text" id="numOunces" name="numOunces">
    <button type="submit">Submit</button>
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
	allPages.forEach(page => $(page).addClass("hide"));
	$("main").removeClass("hide");
}

// move to domUpdates?
// function displayDailySteps() {
// 	let steps = user.activityRecord.find(activity => {
// 		return activity.userID === user.id && activity.date === todayDate;
// 	}).numSteps;
// 	$("#steps-user-steps-today").text(steps);
// }

// function displaySleepInfo() {
//   $("#sleep-info-quality-today").text(
//      user.getEntryDataByDate(user.sleepRecord, "hoursSlept", todayDate)
//   );
//   $("#sleep-info-hours-average-alltime").text(
//     user.getAllTimeAverage(user.sleepRecord, "hoursSlept")
//   );
//   $("#sleep-info-quality-average-alltime").text(
//     user.getAllTimeAverage(user.sleepRecord, "sleepQuality")
//   );
// }

// function displayWeeklySleepInfo() {
//   $("#sleep-calendar-hours-average-weekly").text(
//     user.calculateSleepAverageThisWeek(todayDate, "hoursSlept")
//   );
//   $("#sleep-calendar-quality-average-weekly").text(
//     user.calculateSleepAverageThisWeek(todayDate, "sleepQuality")
//   );
// }

// function displayFriendsSleepInfo() {
//   $("#sleep-friend-longest-sleeper").text(
//     userRepository.getLongestSleepers(todayDate)
//   );
//   $("#sleep-friend-worst-sleeper").text(
//     userRepository.getWorstSleepers(todayDate)
//   );
// }

// move to domUpdates?
// function displayDailyWater() {
// 	let water = user.hydrationRecord.find(hydration => {
// 		return hydration.userID === user.id && hydration.date === todayDate;
// 	}).numOunces;
// 	$("#hydration-user-ounces-today").text(water);
// }

// function displayAllUsersAverageFlights() {
// 	let allAverageFlights = userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs')
// 	$('#stairs-friend-flights-average-today').text(`${allAverageFlights}`)
// }

// move to domUpdates?
// function displayDailyStairs() {
// 	let stairs =
// 		user.activityRecord.find(activity => {
// 			return activity.userID === user.id && activity.date === todayDate;
// 		}).flightsOfStairs * 12;
// 	$("#stairs-user-stairs-today").text(stairs);
// }

// function displayWeeklyFlightsAndStairs() {
// 	let stepsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate))))
// 	let flightsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate) / 12)))
// 	$('#stairs-calendar-stairs-average-weekly').text(stepsThisWeek)
// 	$('#stairs-calendar-flights-average-weekly').text(flightsThisWeek)
// }

// function displayDailyFlightsClimbed() {
// 	let stairs =
// 		user.activityRecord.find(activity => {
// 			return activity.userID === user.id && activity.date === todayDate;
// 		}).flightsOfStairs;
// 	$('#stairs-info-flights-today').text(stairs)
// }

// move to domUpdates?
// function displayDailySleep() {
// 	let sleep = user.sleepRecord.find(sleep => {
// 		return sleep.userID === user.id && sleep.date === todayDate;
// 	}).hoursSlept;
// 	$("#sleep-user-hours-today").text(sleep);
// }

// function displayTrendingStairsInfo() {
// 	let trendingDays = user.findTrendingStairsDays();
// 	$('.trending-stairs-phrase-container').html(`<p class='trend-line'>${trendingDays}</p>`);
// }

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

	// displayStepCardInfo();
	// displaySleepCardInfo();
	// displayStairsCardInfo();
	// displayHydrationCardInfo();
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

// function displaySleepCardInfo() {
// 	$("#sleep-info-quality-today").text(
// 		user.getEntryDataByDate(user.sleepRecord, "hoursSlept", todayDate)
// 	);
// 	$("#sleep-info-hours-average-alltime").text(
// 		user.getAllTimeAverage(user.sleepRecord, "hoursSlept")
// 	);
// 	$("#sleep-info-quality-average-alltime").text(
// 		user.getAllTimeAverage(user.sleepRecord, "sleepQuality")
// 	);
// 	$("#sleep-friend-longest-sleeper").text(
// 		userRepository.getLongestSleepers(todayDate)
// 	);
// 	$("#sleep-friend-worst-sleeper").text(
// 		userRepository.getWorstSleepers(todayDate)
// 	);
// 	$("#sleep-calendar-hours-average-weekly").text(
// 		user.calculateSleepAverageThisWeek(todayDate, "hoursSlept")
// 	);
// 	$("#sleep-calendar-quality-average-weekly").text(
// 		user.calculateSleepAverageThisWeek(todayDate, "sleepQuality")
// 	);
// }

// function displayStairsCardInfo() {
// 	displayDailyFlightsClimbed();
// 	displayAllUsersAverageFlights();
// 	displayTrendingStairsInfo();
// 	displayWeeklyFlightsAndStairs();
// }

// function displayHydrationCardInfo() {
// 	displayAverageDailyHydration();
// 	displayNumOunces();
// }

// move to domUpdates?
// function updateTrendingStepDays() {
// 	user.findTrendingStepDays();
// 	$(".trending-steps-phrase-container").html(
// 		`<p class='trend-line'>${user.trendingStepDays[0]}</p>`
// 	);
// }

// move to domUpdates?
// function displayAverageDailyHydration() {
// 	$("#hydration-friend-ounces-today").text(
// 		user.getAllTimeAverage(user.hydrationRecord, "numOunces")
// 	);
// }

// function displayNumOunces() {
// 	$("#hydration-info-glasses-today").text(
// 		user.getEntryDataByDate(user.hydrationRecord, "numOunces", todayDate) / 8
// 	);
// }

// function displayDailyOuncesPerWeek() {
// 	let sortedHydrationDataByDate = user.hydrationRecord.sort((a, b) => {
// 		if (Object.keys(a)[0] > Object.keys(b)[0]) {
// 			return -1;
// 		}
// 		if (Object.keys(a)[0] < Object.keys(b)[0]) {
// 			return 1;
// 		}
// 		return 0;
// 	});

// 	let dailyOz = document.querySelectorAll('.daily-oz');
// 	for (var i = 0; i < dailyOz.length; i++) {
// 		dailyOz[i].innerText = user.getFluidOuncesByDate(Object.keys(sortedHydrationDataByDate[i])[0])
// 	}
// }