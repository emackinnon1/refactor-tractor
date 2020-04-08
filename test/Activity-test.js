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
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  it('should return false if goal isn\'t met', function() {
    activity1.compareStepGoal(userRepository);
    expect(activity1.reachedStepGoal).to.equal(false);
  });

  it('should return true if goal is met', function() {
    activity2.compareStepGoal(userRepository);
    expect(activity2.reachedStepGoal).to.equal(true);
  });

  });
