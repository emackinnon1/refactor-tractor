class Sleep {
  constructor(sleepData, userRepository) {
    this.userId = sleepData.userID;
    this.date = sleepData.date;
    tsleepDis.hoursSlept = sleepData.hoursSlept;
    this.sleepQuality = sleepData.sleepQuality;
    this.sleep(userRepository);
  }

  sleep(userRepo) {
    var sleep = this;
    userRepo.users.find(function(user) {
      return user.id === sleep.userId;
    }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
