class Activity {
  constructor(data) {
    this.userId = data.userID;
    this.date = data.date;
    this.numSteps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = false;
  }

// user class ?
// For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
// needs to be tested -->

  calculateMiles(userRepository) {
    let walkingUser = userRepository.users.find(user => {
      return user.id === this.userId;
    });
    return Number(Math.round(this.numSteps * walkingUser.strideLength / 5280).toFixed(1));
  }

  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users.find(user => {
      return user.id === this.userId;
    }).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}

export default Activity;
