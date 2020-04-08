import User from './User';

class UserRepository {
  constructor(userList, sleepData, hydrationData, activityData) {
    this.users = this.makeUsers(userList, sleepData, hydrationData, activityData);
    this.longestSleepers = [];
  }

  makeUsers(userList, sleepData, hydrationData, activityData) {
    return userList.map(currentUser => {
      let user = new User(currentUser, sleepData, hydrationData, activityData);
      return user;
    })
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

  getLongestSleepers(date) {
    let usersSleepByDate = this.users.filter(user => {
      return user.sleepRecord.filter(sleep => sleep.date === date)
    }).sort((a, b) => {
      return b.sleepRecord[0].hoursSlept - a.sleepRecord[0].hoursSlept;
    })

    let topSleepers = usersSleepByDate.filter(user => {
      return user.sleepRecord[0].hoursSlept === usersSleepByDate[0].sleepRecord[0].hoursSlept
    })
    return topSleepers;
  }

// Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
//   findBestSleepers(date) {
//     return this.users.filter(user => {
//       return user.calculateAverageQualityThisWeek(date) > 3;
//     })
//   }
}

export default UserRepository;
