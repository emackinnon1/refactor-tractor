import sleepData from './data/sleep';

class UserRepository {
  constructor(data) {
    this.users = data;
    this.longestSleepers = [];
  }

  getUser(id) {
    return this.users.find(user => {
      return user.id === id;
    })
  }

  calculateAverageStepGoal() {
    let total = this.users.reduce((sum, user) => {
      sum += user.dailyStepGoal;
      return sum;
    }, 0);
    return total / this.users.length;
  }

  calculateAverageActivity(date, property) {
    let activityCounts = this.users.reduce((acc, user) => {
      user.activityRecord.forEach(item => {
        if (item.date === date) {
          acc.push(item);
        }
      });
      return acc;
    }, []);
    let totalCount = activityCounts.reduce((acc, count) => {
      acc += count[property];
      return acc;
    }, 0);
    if (totalCount === 0 && activityCounts.length === 0) {
      return 0;
    }
    return Math.round(totalCount / activityCounts.length);
  }

  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((acc, user) => {
      user.sleepRecord.forEach(sleep => {
        acc.push(sleep.sleepQuality)
      })
      return acc;
    }, []);
    let averageSleepQuality = totalSleepQuality.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0)
    return Number((averageSleepQuality / totalSleepQuality.length).toFixed(1))
  }

//For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
  getLongestSleepers(date) {
    // go through users, access sleep sleepRecord
    // filter by date
    //
    let usersSleepByDate = this.users.filter(user => {
      return user.sleepRecord.filter(sleep => sleep.date === date)
    })

    let sorted = usersSleepByDate.sort((a, b) => {
      return b.sleepRecord.hoursSlept - a.sleepRecord.hoursSlept;
    })
    console.log(usersSleepByDate[0].sleepRecord.userId);
    // return sleepData.filter(sleep => {
    //   return sleep.date === date;
    //   }).sort((a, b) => {
    //     return b.hoursSlept - a.hoursSlept;
    //       })[0].userID;
    }

// Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  findBestSleepers(date) {
    return this.users.filter(user => {
        return user.calculateAverageQualityThisWeek(date) > 3;
      })
    }

// these methods are not in spec
  // calculateAverageDailyWater(date) {
  //   let todaysDrinkers = this.users.filter(user => {
  //     return user.addDailyOunces(date) > 0;
  //   });
  //   let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
  //     return sum += drinker.addDailyOunces(date);
  //   }, 0)
  //   return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  // }

  // getWorstSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return a.hoursSlept - b.hoursSlept;
  //   })[0].userID;
  // }
}

export default UserRepository;
