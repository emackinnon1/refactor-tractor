import chai, {
  expect
} from 'chai';
// import spies from 'chai-spies';
// chai.use(spies);

import userTestData from "../src/data/users-test-data";
import activityTestData from "../src/data/activity-test-data";
import sleepTestData from "../src/data/sleep-test-data";
import hydrationTestData from "../src/data/hydration-test-data";

import domUpdates from '../src/domUpdates';
import User from "../src/User";

describe("User", function () {
  let user, user2;
  chai.spy.on(domUpdates, ['getUserName'], () => true)

  beforeEach(() => {
    user = new User(
      userTestData[0],
      hydrationTestData,
      activityTestData,
      sleepTestData
    );
    user2 = new User(
      userTestData[3],
      hydrationTestData,
      activityTestData,
      sleepTestData
    );
  });

  afterEach(function () {
    chai.spy.restore();
  });

  it("should be an instance of user", function () {
    expect(user).to.be.an.instanceof(User);
  });

  it("should have an id", function () {
    expect(user.id).to.equal(userTestData[0].id);
  });

  it("should have a name", function () {
    expect(user.name).to.equal("Luisa Hane");
  });

  it("should have an address", function () {
    expect(user.address).to.equal(
      "15195 Nakia Tunnel, Erdmanport VA 19901-1697"
    );
  });

  it("should have an email address", function () {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it("should have a stride length", function () {
    expect(user.strideLength).to.equal(4.3);
  });

  it("should have a daily step goal", function () {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it("should have friends", function () {
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it("should return the first name of the user", function () {
    expect(user.getFirstName()).to.equal("LUISA");
    // expect(domUpdates.getUserName).to.have.been.called(1);
    // expect(domUpdates.getUserName).to.have.been.called.with('LUISA');
  });

  it("should calculate all time average sleep quality", function () {
    expect(user.getAllTimeAverage(user.sleepRecord, "sleepQuality")).to.equal(
      3.3
    );
    expect(user2.getAllTimeAverage(user2.sleepRecord, "sleepQuality")).to.equal(
      0
    );
  });

  it("should calculate all time average water consumption", function () {
    expect(user.getAllTimeAverage(user.hydrationRecord, "numOunces")).to.equal(
      42.5
    );
    expect(
      user2.getAllTimeAverage(user2.hydrationRecord, "numOunces")
    ).to.equal(0);
  });

  it("should calculate average number of hours slept per day", function () {
    expect(user.getAllTimeAverage(user.sleepRecord, "hoursSlept")).to.equal(
      5.1
    );
  });

  it("should calculate how many hours they slept for a specific day", function () {
    expect(
      user.getEntryDataByDate(user.sleepRecord, "hoursSlept", "2019/06/16")
    ).to.equal(4.1);
    expect(
      user.getEntryDataByDate(user.sleepRecord, "hoursSlept", "2019/06/15")
    ).to.equal(6.1);
  });

  it("should calculate how many hours they slept for a specific day", function () {
    expect(
      user.getEntryDataByDate(user.sleepRecord, "hoursSlept", "2019/06/17")
    ).to.equal(0);
  });

  it("should calculate their sleep quality for a specific day", function () {
    expect(
      user.getEntryDataByDate(user.sleepRecord, "sleepQuality", "2019/06/16")
    ).to.equal(4.4);
    expect(
      user.getEntryDataByDate(user.sleepRecord, "sleepQuality", "2019/06/15")
    ).to.equal(2.2);
  });

  it("should calculate their sleep quality for a specific day", function () {
    expect(
      user.getEntryDataByDate(user.sleepRecord, "sleepQuality", "2019/06/17")
    ).to.equal(0);
  });

  it("should be able to calculate daily water consumption", function () {
    expect(user.getFluidOuncesByDate("2019/06/15")).to.equal(37);
    expect(user.getFluidOuncesByDate("2019/06/17")).to.equal("N/A");
  });

  it("should calculate the number of miles a user has traveled each day", function () {
    expect(user.calculateDailyMiles("2019/06/15")).to.equal(2.9);
  });

  it("should determine the number of minutes that a user was active each day", function () {
    expect(user.calculateDailyMinutesActive("2019/06/15")).to.equal(140);
  });

  it("should return the most flights a user has climbed in any given day", function () {
    expect(user.findMostFlightsClimbedOfAllTime()).to.equal(22);
  });

  it("should return false if step goal wasn't met", function () {
    expect(user.determineIfStepGoalWasMet("2019/06/15")).to.equal(false);
  });

  it("should return true if step goal was met", function () {
    expect(user.determineIfStepGoalWasMet("2019/06/16")).to.equal(true);
  });

  it("should indicate how many days a particular user has met their step goal", function () {
    expect(user.calculateDaysMetStepGoal()).to.equal(1);
  });
});
