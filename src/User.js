import Activity from "./Activity";
import Hydration from "./Hydration";
import Sleep from "./Sleep";

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
    return this.name.split(" ")[0].toUpperCase();
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

  calculateAverageMinutesActiveThisWeek(todayDate) {
    return (
      this.activityRecord.reduce((sum, activity) => {
        let index = this.activityRecord.indexOf(
          this.activityRecord.find(activity => activity.date === todayDate)
        );
        if (
          index <= this.activityRecord.indexOf(activity) &&
          this.activityRecord.indexOf(activity) <= index + 6
        ) {
          sum += activity.minutesActive;
        }
        return sum;
      }, 0) / 7
    ).toFixed(0);
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
//needs to be refactored
  findTrendingStairsDays() {
    // let positiveDays = [];
    // return this.activityRecord.forEach((record, index) => {
    //   if (record.flightsOfStairs > record[index + 1].flightsOfStairs) {
    //     positiveDays.push(record.date)
    //     console.log(positiveDays)
    //   }
    //   let message = `Your most recent positive climbing streak was ${positiveDays[0]} - ${
    //       positiveDays[positiveDays.length - 1]
    //     }!`
    //   return message;
    // }

    let positiveDays = [];
    this.activityRecord.sort((a, b) => {
      // console.log(record.flightsOfStairs)
      //trying to compare this record to the record after it
      //this won't work because record isn't an array
      // console.log(this.activityRecord)
      if (a.flightsOfStairs > b.flightsOfStairs) {
        positiveDays.push(a.date)
        console.log(positiveDays)
      }
      // if (record.flightsOfStairs > record[index + 1].flightsOfStairs) {
      //
      // }
    })
    let message = `Your most recent positive climbing streak was ${positiveDays[0]} - ${
      positiveDays[positiveDays.length - 1]
    }!`
    return message;

  }


    // for (var i = 0; i < this.activityRecord.length; i++) {
    //   if (
    //     this.activityRecord[i + 1] &&
    //     this.activityRecord[i].flightsOfStairs >
    //       this.activityRecord[i + 1].flightsOfStairs
    //   ) {
    //     positiveDays.unshift(this.activityRecord[i].date);
    //   } else if (positiveDays.length > 2) {
    //     this.trendingStairsDays.push(
    //       `Your most recent positive climbing streak was ${positiveDays[0]} - ${
    //         positiveDays[positiveDays.length - 1]
    //       }!`
    //     );
    //     positiveDays = [];


  findFriendsTotalStepsForWeek(allUsers, date) {
    this.friends.map(friend => {
      let matchedFriend = allUsers.users.find(user => user.id === friend);
      matchedFriend.totalStepsThisWeek = this.calculateTotalStepsThisWeek(matchedFriend, date);
      this.friendsWeeklySteps.push({
        id: matchedFriend.id,
        firstName: matchedFriend.name.toUpperCase().split(" ")[0],
        totalWeeklySteps: matchedFriend.totalStepsThisWeek
      });
    });
    // this.calculateTotalStepsThisWeek(date);
    // this.friendsActivityRecords.push({
    //   id: this.id,
    //   firstName: "YOU",
    //   totalWeeklySteps: this.totalStepsThisWeek
    // });
    this.friendsWeeklySteps = this.friendsWeeklySteps.sort(
      (a, b) => b.totalWeeklySteps - a.totalWeeklySteps
    );
  }


calculateTotalStepsThisWeek(person, todayDate) {
  person.totalStepsThisWeek = person.activityRecord.reduce((sum, activity) => {
    let index = person.activityRecord.indexOf(
      person.activityRecord.find(activity => activity.date === todayDate)
    );
    if (
      index <= person.activityRecord.indexOf(activity) &&
      person.activityRecord.indexOf(activity) <= index + 6
    ) {
      sum += activity.numSteps;
    }
    return sum;
  }, 0);
  return person.totalStepsThisWeek;
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
