import { expect } from 'chai';

import Activity from '../src/Activity';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

import userTestData from '../src/data/users-test-data';
import activityTestData from '../src/data/activity-test-data';
import sleepTestData from '../src/data/sleep-test-data';
import hydrationTestData from '../src/data/hydration-test-data';

describe('Activity', function() {

  let user;
  let activity1;
  let userRepository;

  beforeEach(() => {

    user = new User(userTestData[0], hydrationTestData, activityTestData, sleepTestData);

        activity1 = new Activity(activityTestData[0]);

    // userRepository = new UserRepository([user1, user2, user3]);
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  });
