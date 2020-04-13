import User from "./User";
import domUpates from "./domUpdates";
import domUpdates from './domUpdates';


class UserRepository {
  constructor(userList, hydrationData, activityData, sleepData) {
    this.users = this.makeUsers(
      userList,
      hydrationData,
      activityData,
      sleepData
    );
    // this.longestSleepers = [];
  }

  makeUsers(userList, hydrationData, activityData, sleepData) {
    return userList.map(currentUser => {
      let user = new User(currentUser, hydrationData, activityData, sleepData);
      return user;
    });
  }

  getUser(id) {
    return this.users.find(user => {
      return user.id === id;
    });
    domUpdates.getUserName();
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
    let divisor = 0;
    let totalSleepQuality = this.users.reduce((acc, user) => {
      user.sleepRecord.forEach(sleep => {
        acc += sleep.sleepQuality;
        divisor++;
      });
      return acc;
    }, 0);
    return totalSleepQuality / divisor;
  }

  getLongestSleepers(date) {
    let topSleeper = this.users
      .filter(user => {
        return user.sleepRecord.filter(sleep => sleep.date === date);
      })
      .sort((a, b) => {
        return b.sleepRecord[0].hoursSlept - a.sleepRecord[0].hoursSlept;
      })
      .shift()
    return topSleeper.name;
  }

  getWorstSleepers(date) {
    let worstSleeper = this.users
      .filter(user => {
        return user.sleepRecord.filter(sleep => sleep.date === date);
      })
      .sort((a, b) => {
        return a.sleepRecord[0].hoursSlept - b.sleepRecord[0].hoursSlept;
      })
      .shift()
    return worstSleeper.name;
  }

// Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
//   findBestSleepers(date) {
//     return this.users.filter(user => {
//       return user.calculateAverageQualityThisWeek(date) > 3;
//     })
//   }
}

export default UserRepository;