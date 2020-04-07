class Hydration {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.numOunces = data.numOunces;
    // this.drink(userRepository);
  }
  // drink(userRepo) {
  //     var hydrate = this;
  //     userRepo.users.find(function(user) {
  //         return user.id === hydrate.userID;
  //       }).updateHydration(this.date, this.ounces);
  // }

// below methods should be in User class
  getAllTimeAverageFluidOunces(user) {
    // For a user (identified by their userID), the average fluid ounces consumed per day for all time
  }

  getFluidOuncesByDate(date) {
    // For a user, how many fluid ounces they consumed for a specific day (identified by a date)
  }

  getFluidOuncesByWeek(week) {
    // For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
  }

}


export default Hydration;
