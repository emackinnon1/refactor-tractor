import $ from "jquery";

import {
	user,
	todayDate,
	userRepository
} from "./scripts.js";
import UserRepository from "./UserRepository";
import User from "./User";
import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";

// console.log(user);
const domUpdates = {

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
		// for (var i = 0; i < dailyOz.length; i++) {
		// 	dailyOz[i].innerText = user.getFluidOuncesByDate(Object.keys(sortedHydrationDataByDate[i])[0])
		// }
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

	displayHydrationCardInfo() {
		displayAverageDailyHydration();
		displayNumOunces();
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



	getUserName(name) {
		$("#header-name").text(`${name}'S FITLIT`);
	}

	// displayAllUsersAverageFlights(average) {
	//     // let allAverageFlights = userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs')
	//     $('#stairs-friend-flights-average-today').text(`${average}`)
	//   }
}

export default domUpdates;