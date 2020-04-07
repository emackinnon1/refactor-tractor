import { expect } from 'chai'
import Activity from '../src/Activity';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

import userTestData from '../src/data/users-test-data';
import activityTestData from '../src/data/activity-test-data';

describe('Activity', function() {
  let activity1, activity2, activity3;
  let user1, user2, user3;
  let userRepository;
  beforeEach(() => {

    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);

    activity1 = new Activity(activityTestData[0]);
    activity2 = new Activity(activityTestData[1]);
    activity3 = new Activity(activityTestData[2]);

    userRepository = new UserRepository([user1, user2, user3]);
    // userRepository.users.push(user1, user2);
    // activity1 = new Activity({
    //   "userID": 1,
    //   "date": "2019/06/15",
    //   "numSteps": 3684,
    //   "minutesActive": 140,
    //   "flightsOfStairs": 16
    // }, userRepository);
    // activity2 = new Activity({
    //   "userID": 2,
    //   "date": "2019/06/20",
    //   "numSteps": 2856,
    //   "minutesActive": 280,
    //   "flightsOfStairs": 22
    // }, userRepository);
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  // it.only('should be able to add activities to user record', function() {
  //
  //   activity1.addActivity(userRepository);
  //
  //   expect(user1.activityRecord.length).to.equal(1);
  // });

  // it.only('should have a method that calculate miles walked', function() {
  //   expect(activity1.calculateMiles(userRepository)).to.equal(3.0);
  // });

  it('should return false if goal isn\'t met', function() {
    activity1.compareStepGoal(userRepository);
    expect(activity1.reachedStepGoal).to.equal(false);
  });

  it('should return true if goal is met', function() {
    activity2.compareStepGoal(userRepository);
    expect(activity2.reachedStepGoal).to.equal(true);
  });

  });
