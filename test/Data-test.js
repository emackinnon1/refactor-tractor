import { expect } from 'chai';

import userTestData from '../src/data/users-test-data';
import activityTestData from '../src/data/activity-test-data';
import sleepTestData from '../src/data/sleep-test-data';
import hydrationTestData from '../src/data/hydration-test-data';


import User from '../src/User';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import Data from '../src/Data';

describe('Data', function() {
  let user;
  let data;
  beforeEach(() => {
    data = new Data();
  });

  it('should be an instance of Data', function() {
    expect(data).to.be.an.instanceof(Data);
  });

  it('should retrieve user information', function() {

    expect(data.retrieveUserData()).to.equal();
  });

});
