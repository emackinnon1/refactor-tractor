import sleepData from './data/sleep';

class UserRepository {
  constructor(data) {
    this.users = data;
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

// this method is not in spec
  // calculateAverageDailyWater(date) {
  //   let todaysDrinkers = this.users.filter(user => {
  //     return user.addDailyOunces(date) > 0;
  //   });
  //   let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
  //     return sum += drinker.addDailyOunces(date);
  //   }, 0)
  //   return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  // }

  // findBestSleepers(date) {
  //   return this.users.filter(user => {
  //     return user.calculateAverageQualityThisWeek(date) > 3;
  //   })
  // }

  // getLongestSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   })[0].userID;
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
