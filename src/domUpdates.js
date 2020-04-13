import $ from "jquery";

import UserRepository from "./UserRepository";
import User from "./User";
import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";




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

    getUserName(name) {
        $("#header-name").text(`${name}'S FITLIT`);
    }

    // displayAllUsersAverageFlights(average) {
    //     // let allAverageFlights = userRepository.calculateAverageActivity(todayDate, 'flightsOfStairs')
    //     $('#stairs-friend-flights-average-today').text(`${average}`)
    //   }
}

export default domUpdates;