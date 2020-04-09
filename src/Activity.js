class Activity {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.numSteps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
    this.milesWalked = 0;
    this.reachedStepGoal = false;
  }


}

export default Activity;
