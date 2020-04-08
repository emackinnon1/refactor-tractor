class Sleep {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    // this.sleep(userRepository);
  }
  // sleep(userRepo) {
  //   var sleep = this;
  //   userRepository.users.find(function(user) {
  //     return user.id === sleep.userId;
  //   }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  // }

  // below methods should be in User class ?
  getAverageNumberOfHoursSleptPerDay() {
    // For a user (identified by their userID), the average number of hours slept per day
  }

  getAllTimeAverageSleepQualityPerDay() {
    // For a user, their average sleep quality per day over all time
  }

  getHoursSleptByDay() {
    // For a user, how many hours they slept for a specific day (identified by a date)
  }

  getSleepQualityByDay() {
    // For a user, their sleep quality for a specific day (identified by a date)
  }

  getHoursSleptByWeek() {
    // For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  }

  getSleepQualityByWeek() {
    // For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  }

}

export default Sleep;
