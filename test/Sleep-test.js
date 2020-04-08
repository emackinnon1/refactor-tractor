import { expect } from 'chai';

import sleepTestData from '../src/data/sleep-test-data';
import userTestData from '../src/data/users-test-data';

import Sleep from '../src/Sleep';
import User from '../src/User';
import UserRepository from '../src/UserRepository';

describe('Sleep', function() {

  let sleep1, sleep2, sleep3;
  let user1, user2, user3;
  let userRepository;

  beforeEach(() => {

    sleep1 = new Sleep(sleepTestData[0]);
    sleep2 = new Sleep(sleepTestData[1]);
    sleep3 = new Sleep(sleepTestData[2]);

    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);

    userRepository = new UserRepository([user1, user2, user3]);
  });

  it('should be an instance of Sleep', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });

  it('should hold a userId', function() {
    expect(sleep1.userID).to.equal(1);
  });

  it('should hold a date', function() {
    expect(sleep1.date).to.equal("2019/06/15");
  });

  it('should hold hours slept', function() {
    expect(sleep1.hoursSlept).to.equal(6.1);
  });

  it('should hold sleep quality', function() {
    expect(sleep1.sleepQuality).to.equal(2.2);
  });

});
