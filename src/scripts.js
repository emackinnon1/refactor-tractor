import $ from "jquery";
import "./css/base.scss";
import "./css/styles.scss";

import domUpdates from "./domUpdates";
import UserRepository from "./UserRepository";

export let todayDate = "2019/09/22";
export let userRepository;
export let user;
let userID = Math.ceil(Math.random() * 50);

// event listeners
$(window).on("load", retrieveAllData);
$('#profile-button').on('click', domUpdates.showDropdown);
$('main').on('click', domUpdates.showInfo);
$("#sleep-entry-button").on("click", displayForm);
$("#activity-entry-button").on("click", displayForm);
$("#hydration-entry-button").on("click", displayForm);
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
		.catch(err => console.error(err))
		.then(data => retrieveAllData());

	let allPages = $(".allPageInfo")
		.children()
		.toArray()
		.splice(0, 5);
	allPages.forEach(page => $(page).addClass("hide"));
	$("main").removeClass("hide");
}

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
