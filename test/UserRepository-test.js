import { expect } from 'chai';

import userTestData from '../src/data/users-test-data';
import activityTestData from '../src/data/activity-test-data';
import sleepTestData from '../src/data/sleep-test-data';
import hydrationTestData from '../src/data/hydration-test-data';

import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';

describe('UserRepository', function() {
  let activity1, activity2, activity3;
  let user1, user2, user3, user4;
  let sleep1, sleep2, sleep3, sleep4;
  let userRepository;

  beforeEach(() => {
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);
    user4 = new User(userTestData[3]);

    activity1 = new Activity(activityTestData[0]);
    activity2 = new Activity(activityTestData[1]);
    activity3 = new Activity(activityTestData[2]);

    sleep1 = new Sleep(sleepTestData[0]);
    sleep2 = new Sleep(sleepTestData[1]);
    sleep3 = new Sleep(sleepTestData[2]);
    sleep4 = new Sleep(sleepTestData[3]);

    user1.activityRecord.push(activity1);
    user2.activityRecord.push(activity2);
    user3.activityRecord.push(activity3);

    user1.sleepRecord.push(sleep1);
    user2.sleepRecord.push(sleep2);
    user3.sleepRecord.push(sleep3);
    user4.sleepRecord.push(sleep4);

    userRepository = new UserRepository([user1, user2, user3, user4]);
  });

  it('should be an instance of user repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should hold an array of users', function() {
    expect(userRepository.users).to.deep.equal([user1, user2, user3, user4]);
    expect(userRepository.users.length).to.equal(4);
  });

  it('getUser should return user object when given a user id', function() {
    expect(userRepository.getUser(2)).to.equal(user2);
  });

  it('calculateAverageStepGoal should return average step goal for all users', function() {
    expect(userRepository.calculateAverageStepGoal()).to.equal(6000);
  });

  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    expect(userRepository.calculateAverageSleepQuality()).to.equal(4.1);
  });

  it('should have a method that calculates average amount of activity for users', function() {
    expect(userRepository.calculateAverageActivity("2019/06/15", 'numSteps')).to.equal(5091);
    expect(userRepository.calculateAverageActivity("2019/06/15", 'minutesActive')).to.equal(131);
    expect(userRepository.calculateAverageActivity("2019/06/15", 'flightsOfStairs')).to.equal(20);
  });

  it('should return 0 if no activity on specified date', function() {
    expect(userRepository.calculateAverageActivity("2020/04/05", 'numSteps')).to.equal(0);
  })



  it.only('should have a method that finds the longest sleepers', function() {
    expect(userRepository.getLongestSleepers("2019/06/15")).to.deep.equal([3, 4]);
  });

  it('should have a method that finds the best sleepers', function() {
    expect(userRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
  });

  it.skip('should have a method that calculates friends average ounces of water', function() {
    expect(userRepository.calculateAverageDailyWater("2019/06/16")).to.equal(5)
  });

  // it('should have a method that finds the worst sleepers', function() {
  //   sleepData = [{
  //     "userID": 1,
  //     "date": "2019/06/15",
  //     "hoursSlept": 6.1,
  //     "sleepQuality": 1000
  //   }, {
  //     "userID": 2,
  //     "date": "2019/06/15",
  //     "hoursSlept": 7.3,
  //     "sleepQuality": 500
  //   }, {
  //     "userID": 3,
  //     "date": "2019/06/15",
  //     "hoursSlept": 9.3,
  //     "sleepQuality": 1.4
  //   }];
  //   expect(userRepository.getWorstSleepers("2019/06/15")).to.equal(1);
  // });
});
