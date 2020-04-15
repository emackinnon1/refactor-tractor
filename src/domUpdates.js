import $ from "jquery";

import {
	user,
	todayDate,
	userRepository
} from "./scripts.js";

const domUpdates = {

  showInfo(event) {
  let type = $(event.target)
  		.attr("class")
  		.split(" ")[0];
  	let buttonType = $(event.target)
  		.attr("class")
  		.split(" ")[1];

  	if ($(event.target).is("button")) {
  		domUpdates.clear(type);
  		$(`#${type}-main-card`).addClass("hide");
  		$(`#${type}-${buttonType}-card`).removeClass("hide");
  	}

  	if ($(event.target).hasClass(`${type}-go-back-button`)) {
  		domUpdates.clear(type);
  	}
  	domUpdates.displayStepCardInfo();
  },

  clear(category) {
  	let allCategoryCards = $(`#${category}-card-container`)
  		.children()
  		.toArray();

  	allCategoryCards.forEach(element => $(element).addClass("hide"));
  	$(`#${category}-main-card`).removeClass("hide");
  },

	displaySleepInfo() {
		$("#sleep-info-quality-today").text(
			user.getEntryDataByDate(user.sleepRecord, "hoursSlept", todayDate)
		);
		$("#sleep-info-hours-average-alltime").text(
			user.getAllTimeAverage(user.sleepRecord, "hoursSlept")
		);
		$("#sleep-info-quality-average-alltime").text(
			user.getAllTimeAverage(user.sleepRecord, "sleepQuality")
		);
	},

	displayWeeklySleepInfo() {
		$("#sleep-calendar-hours-average-weekly").text(
			user.calculateSleepAverageThisWeek(todayDate, "hoursSlept")
		);
		$("#sleep-calendar-quality-average-weekly").text(
			user.calculateSleepAverageThisWeek(todayDate, "sleepQuality")
		);
	},

	displayFriendsSleepInfo() {
		$("#sleep-friend-longest-sleeper").text(
			userRepository.getLongestSleepers(todayDate)
		);
		$("#sleep-friend-worst-sleeper").text(
			userRepository.getWorstSleepers(todayDate)
		);
	},

	displayDailyOuncesPerWeek(week) {
		$('.daily-oz').each((i, display) => {
			$(display).text(`${week[i].numOunces}`)
		});

	},

	displayNumOunces() {
		$("#hydration-info-glasses-today").text(
			user.getEntryDataByDate(user.hydrationRecord, "numOunces", todayDate) / 8
		);
	},

	displayAverageDailyHydration() {
		$("#hydration-friend-ounces-today").text(
			user.getAllTimeAverage(user.hydrationRecord, "numOunces")
		);
	},

	displayDailyFlightsClimbed() {
		let stairs =
			user.activityRecord.find(activity => {
				return activity.userID === user.id && activity.date === todayDate;
			}).flightsOfStairs;
		$('#stairs-info-flights-today').text(stairs)
	},

	displayAllUsersAverageFlights() {
		let allAverageFlights = userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs')
		$('#stairs-friend-flights-average-today').text(`${allAverageFlights}`)
	},

	displayTrendingStairsInfo() {
		let trendingDays = user.findTrendingStairsDays();
		$('.trending-stairs-phrase-container').html(`<p class='trend-line'>${trendingDays}</p>`);
	},

	displayWeeklyFlightsAndStairs() {
		let stepsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate))))
		let flightsThisWeek = Number(Math.floor(Math.round(user.calculateTotalStepsThisWeek(user, todayDate) / 12)))
		$('#stairs-calendar-stairs-average-weekly').text(stepsThisWeek)
		$('#stairs-calendar-flights-average-weekly').text(flightsThisWeek)
	},

	displayDailyStairs() {
		let stairs =
			user.activityRecord.find(activity => {
				return activity.userID === user.id && activity.date === todayDate;
			}).flightsOfStairs * 12;
		$("#stairs-user-stairs-today").text(stairs);
	},

	displayDailySteps() {
		let steps = user.activityRecord.find(activity => {
			return activity.userID === user.id && activity.date === todayDate;
		}).numSteps;
		$("#steps-user-steps-today").text(steps);
	},

	displayDailyWater() {
		let water = user.hydrationRecord.find(hydration => {
			return hydration.userID === user.id && hydration.date === todayDate;
		}).numOunces;
		$("#hydration-user-ounces-today").text(water);
	},

	displayDailySleep() {
		let sleep = user.sleepRecord.find(sleep => {
			return sleep.userID === user.id && sleep.date === todayDate;
		}).hoursSlept;
		$("#sleep-user-hours-today").text(sleep);
	},

	updateTrendingStepDays() {
		user.findTrendingStepDays();
		$(".trending-steps-phrase-container").html(
			`<p class='trend-line'>${user.trendingStepDays[0]}</p>`
		);
	},

  displayStepCardInfo() {
  	$('#steps-info-active-minutes-today').text(user.calculateDailyMinutesActive(todayDate));
  	$('#steps-info-miles-walked-today').text(user.calculateDailyMiles(todayDate));
  	$('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageActivity(todayDate, 'minutesActive'));
  	$('#steps-friend-steps-average-today').text(userRepository.calculateAverageActivity(todayDate, 'numSteps'));
  	$('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);
  	this.updateTrendingStepDays();
  	$('#steps-calendar-total-active-minutes-weekly').text(`${user.calculateAverageMinutesActiveThisWeek(todayDate)}`);
  	$('#steps-calendar-total-steps-weekly').text(`${user.calculateTotalStepsThisWeek(todayDate)}`);
  },

	displayHydrationCardInfo() {
		this.displayAverageDailyHydration();
		this.displayNumOunces();
	},

	displaySleepCardInfo() {
		$("#sleep-info-quality-today").text(
			user.getEntryDataByDate(user.sleepRecord, "hoursSlept", todayDate)
		);
		$("#sleep-info-hours-average-alltime").text(
			user.getAllTimeAverage(user.sleepRecord, "hoursSlept")
		);
		$("#sleep-info-quality-average-alltime").text(
			user.getAllTimeAverage(user.sleepRecord, "sleepQuality")
		);
		$("#sleep-friend-longest-sleeper").text(
			userRepository.getLongestSleepers(todayDate)
		);
		$("#sleep-friend-worst-sleeper").text(
			userRepository.getWorstSleepers(todayDate)
		);
		$("#sleep-calendar-hours-average-weekly").text(
			user.calculateSleepAverageThisWeek(todayDate, "hoursSlept")
		);
		$("#sleep-calendar-quality-average-weekly").text(
			user.calculateSleepAverageThisWeek(todayDate, "sleepQuality")
		);
	},

  showDropdown() {
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
  },



	getUserName(name) {
		$("#header-name").text(`${name}'S FITLIT`);
	}
}

export default domUpdates;
