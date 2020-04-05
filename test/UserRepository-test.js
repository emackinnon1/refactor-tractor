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
  let user1, user2, user3;
  let userRepository;

  beforeEach(() => {
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);

    activity1 = new Activity(activityTestData[0]);
    activity2 = new Activity(activityTestData[1]);
    activity3 = new Activity(activityTestData[2]);

    user1.activityRecord.push(activity1);
    user2.activityRecord.push(activity2);
    user3.activityRecord.push(activity3);

    userRepository = new UserRepository([user1, user2, user3]);
  });
  // it('should be a function', function() {
  //   expect(UserRepository).to.be.a('function');
  // });
  it('should be an instance of user repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should hold an array of users', function() {
    expect(userRepository.users).to.deep.equal([user1, user2, user3]);
    expect(userRepository.users.length).to.equal(3);
  });

  it('getUser should return user object when given a user id', function() {
    expect(userRepository.getUser(2)).to.equal(user2);
  })
  it('calculateAverageStepGoal should return average step goal for all users', function() {
    expect(userRepository.calculateAverageStepGoal()).to.equal(10000);
  })
  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    user1.sleepQualityAverage = 3.3;
    user2.sleepQualityAverage = 5;
    user3.sleepQualityAverage = 1;
    expect(userRepository.calculateAverageSleepQuality()).to.equal(3.1);
  });
  it('should have a method that calculates friends average ounces of water', function() {
    user1.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 5}
    ]
    user2.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 8}
    ]
    user3.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 4}
    ]
    expect(userRepository.calculateAverageDailyWater("2019/06/16")).to.equal(5)
  });

  it('should have a method that finds the best sleepers', function() {
    sleep1 = new Sleep({
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 6.1,
      "sleepQuality": 1000
    }, userRepository);
    sleep2 = new Sleep({
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 500
    }, userRepository);
    sleep3 = new Sleep({
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }, userRepository);
    expect(userRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
  });

  it('should have a method that finds the longest sleepers', function() {
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 100
    }, {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 1500
    }, {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }];
    expect(userRepository.getLongestSleepers("2019/06/15")).to.equal(3);
  });

  it('should have a method that finds the worst sleepers', function() {
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 1000
    }, {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 500
    }, {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }];
    expect(userRepository.getWorstSleepers("2019/06/15")).to.equal(1);
  });

  it('should have a method that calculates average amount of activity for users', function() {
    expect(userRepository.calculateAverageActivity("2019/06/15", 'numSteps')).to.equal(5091);
    expect(userRepository.calculateAverageActivity("2019/06/15", 'minutesActive')).to.equal(131);
    expect(userRepository.calculateAverageActivity("2019/06/15", 'flightsOfStairs')).to.equal(20);
  });

  it.only('should return 0 if no activity on specified date', function() {
    expect(userRepository.calculateAverageActivity("2020/04/05", 'numSteps')).to.equal(0);
  })
});
