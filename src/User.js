import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import domUpdates from './domUpdates';

class User {
  constructor(userData, hydrationData, activityData, sleepData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationRecord = this.makeHydrationRecord(hydrationData);
    this.activityRecord = this.makeActivityRecord(activityData);
    this.sleepRecord = this.makeSleepRecord(sleepData);
    this.friendsWeeklySteps = [];
    this.trendingStepDays = [];
  }

  getFirstName() {
    let firstName = this.name.split(" ")[0].toUpperCase();
    domUpdates.getUserName(firstName);
    return firstName;
  }

  makeActivityRecord(activityData) {
    return activityData
      .filter(currentActivity => currentActivity.userID === this.id)
      .map(currentAct => {
        let activity = new Activity(currentAct);
        return activity;
      });
  }

  makeHydrationRecord(hydrationData) {
    return hydrationData
      .filter(currentHydration => currentHydration.userID === this.id)
      .map(currentHyd => {
        let hydration = new Hydration(currentHyd);
        return hydration;
      });
  }

  makeSleepRecord(sleepData) {
    return sleepData
      .filter(currentSleep => currentSleep.userID === this.id)
      .map(currSleep => {
        let sleep = new Sleep(currSleep);
        return sleep;
      });
  }

  getAllTimeAverage(record, property) {
    let total = record.reduce((total, value) => {
      total += value[property];
      return total;
    }, 0);
    domUpdates.displaySleepInfo()
    
    return Number((total / record.length).toFixed(1));
  }

  getEntryDataByDate(record, property, date) {
    if (!record.find(entry => entry.date === date)) {
      return 0;
    } else {
      return record.find(entry => entry.date === date)[property];
    }
  }

  getFluidOuncesByDate(date) {
    let dailyWaterIntake = this.hydrationRecord.find(day =>
      day.date.includes(date)
    );
    if (dailyWaterIntake !== undefined) {
      return dailyWaterIntake.numOunces;
    } else {
      return "N/A";
    }
  }

  calculateSleepAverageThisWeek(date, property) {
    return (
      this.sleepRecord.reduce((acc, sleep) => {
        let index = this.sleepRecord.indexOf(
          this.sleepRecord.find(sleep => sleep.date === date)
        );
        if (
          index <= this.sleepRecord.indexOf(sleep) &&
          this.sleepRecord.indexOf(sleep) <= index + 6
        ) {
          acc += sleep[property];
        }
        return acc;
      }, 0) / 7
    ).toFixed(1);
  }

  calculateDailyMiles(date) {
    let dailySteps = this.activityRecord.find(day => day.date === date)
      .numSteps;
    let totalMiles = ((dailySteps * this.strideLength) / 5280).toFixed(1);
    return Number(totalMiles);
  }

  calculateDailyMinutesActive(date) {
    return this.activityRecord.find(day => day.date === date).minutesActive;
  }

  determineIfStepGoalWasMet(date) {
    let dailySteps = this.activityRecord.find(day => day.date === date)
      .numSteps;
    if (dailySteps >= this.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  findMostFlightsClimbedOfAllTime() {
    let maxFlights = this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
    return maxFlights;
  }

  calculateDaysMetStepGoal() {
    return this.activityRecord.reduce((total, day) => {
      if (day.numSteps >= this.dailyStepGoal) {
        total += 1;
      }
      return total;
    }, 0);
  }

  calculateAverageMinutesActiveThisWeek(date) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === date));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= index + 6) {
        sum += activity.minutesActive;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  calculateAverageStepsThisWeek(todayDate) {
    return (
      this.activityRecord.reduce((sum, activity) => {
        let index = this.activityRecord.indexOf(
          this.activityRecord.find(activity => activity.date === todayDate)
        );
        if (
          index <= this.activityRecord.indexOf(activity) &&
          this.activityRecord.indexOf(activity) <= index + 6
        ) {
          sum += activity.steps;
        }
        return sum;
      }, 0) / 7
    ).toFixed(0);
  }


  calculateAverageFlightsThisWeek(todayDate) {
    return (
      this.activityRecord.reduce((sum, activity) => {
        let index = this.activityRecord.indexOf(
          this.activityRecord.find(activity => activity.date === todayDate)
        );
        if (
          index <= this.activityRecord.indexOf(activity) &&
          this.activityRecord.indexOf(activity) <= index + 6
        ) {
          sum += activity.flightsOfStairs;
        }
        return sum;
      }, 0) / 7
    ).toFixed(1);
  }

  findTrendingStepDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (
        this.activityRecord[i + 1] &&
        this.activityRecord[i].numSteps > this.activityRecord[i + 1].numSteps
      ) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStepDays.push(
          `Your most recent positive step streak was ${positiveDays[0]} - ${
            positiveDays[positiveDays.length - 1]
          }!`
        );
        positiveDays = [];
      }
    }
  }

  findTrendingStairsDays() {
    let positiveDays = [];
    this.activityRecord.sort((a, b) => {
      if (a.flightsOfStairs > b.flightsOfStairs) {
        positiveDays.push(a.date)
        console.log(positiveDays)
      }
    })
    let message = `Your most recent positive climbing streak was ${positiveDays[0]} - ${
      positiveDays[positiveDays.length - 1]
    }!`
    return message;

  }

  findFriendsTotalStepsForWeek(allUsers, date) {
    this.friends.map(friend => {
      let matchedFriend = allUsers.users.find(user => user.id === friend);
      matchedFriend.totalStepsThisWeek = this.calculateTotalStepsThisWeek(
        matchedFriend,
        date
      );
      this.friendsWeeklySteps.push({
        id: matchedFriend.id,
        firstName: matchedFriend.name.toUpperCase().split(" ")[0],
        totalWeeklySteps: matchedFriend.totalStepsThisWeek
      });
    });
    this.friendsWeeklySteps = this.friendsWeeklySteps.sort(
      (a, b) => b.totalWeeklySteps - a.totalWeeklySteps
    );
  }

  calculateTotalStepsThisWeek(date) {
    let totalStepsThisWeek = this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === date));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= index + 6) {
        sum += activity.numSteps;
      }
      return sum;
    }, 0);
    return totalStepsThisWeek;
  }
}

export default User;

// iteration 5
// findFriendsNames(users) {
//   this.friends.forEach(friend => {
//     this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
//   })
// }

// old ACTIVITY ITERATION METHODS

// calculateDailyCalories(date) {
//   let totalMinutes = this.activityRecord.filter(activity => {
//     return activity.date === date
//   }).reduce((sumMinutes, activity) => {
//     return sumMinutes += activity.minutesActive
//   }, 0);
//   return Math.round(totalMinutes * 7.6);
// }