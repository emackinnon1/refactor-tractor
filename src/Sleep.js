class Sleep {
  constructor(sleepData, userRepository) {
    this.userId = sleepData.userID;
    this.date = sleepData.date;
    this.hoursSlept = sleepData.hoursSlept;
    this.sleepQuality = sleepData.sleepQuality;
    // this.sleep(userRepository);
  }

  sleep(userRepo) {
    var sleep = this;
    userRepository.users.find(function(user) {
      return user.id === sleep.userId;
    }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
