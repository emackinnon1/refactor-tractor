import {
  expect
} from 'chai';

import userTestData from '../src/data/users-test-data';
import activityTestData from '../src/data/activity-test-data';
import sleepTestData from '../src/data/sleep-test-data';
import hydrationTestData from '../src/data/hydration-test-data';

import User from '../src/User';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';

describe('User', function() {

  let user, user2;
  let userRepository;

  beforeEach(() => {

    user = new User(userTestData[0], hydrationTestData, activityTestData, sleepTestData);
    user2 = new User(userTestData[3], hydrationTestData, activityTestData, sleepTestData);
  });

  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(userTestData[0].id);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Luisa Hane');
  });

  it('should have an address', function() {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('should have an email address', function() {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8])
  });

  it('should return the first name of the user', function() {
    expect(user.getFirstName()).to.equal('LUISA');
  });

  it('should calculate all time average sleep quality', function() {
    expect(user.getAllTimeAverage(user.sleepRecord, 'sleepQuality')).to.equal(3.3);
    expect(user2.getAllTimeAverage(user2.sleepRecord, 'sleepQuality')).to.equal(0);
  });

  it('should calculate all time average water consumption', function() {
    expect(user.getAllTimeAverage(user.hydrationRecord, 'numOunces')).to.equal(42.5);
    expect(user2.getAllTimeAverage(user2.hydrationRecord, 'numOunces')).to.equal(0);
  });

  it('should calculate average number of hours slept per day', function() {
    expect(user.getAllTimeAverage(user.sleepRecord, 'hoursSlept')).to.equal(5.1)
  });

  it('should calculate how many hours they slept for a specific day', function () {
    expect(user.getEntryDataByDate(user.sleepRecord, 'hoursSlept', '2019/06/16')).to.equal(4.1)
    expect(user.getEntryDataByDate(user.sleepRecord, 'hoursSlept', '2019/06/15')).to.equal(6.1)
  });

  it('should calculate how many hours they slept for a specific day', function () {
    expect(user.getEntryDataByDate(user.sleepRecord, 'hoursSlept', '2019/06/17')).to.equal(0)
  });

  it('should calculate their sleep quality for a specific day', function () {
    expect(user.getEntryDataByDate(user.sleepRecord, 'sleepQuality', '2019/06/16')).to.equal(4.4)
    expect(user.getEntryDataByDate(user.sleepRecord, 'sleepQuality', '2019/06/15')).to.equal(2.2)
  });

  it('should calculate their sleep quality for a specific day', function () {
    expect(user.getEntryDataByDate(user.sleepRecord, 'sleepQuality', '2019/06/17')).to.equal(0)
  });

  it('should be able to calculate daily water consumption', function() {
    expect(user.getFluidOuncesByDate("2019/06/15")).to.equal(37);
    expect(user.getFluidOuncesByDate("2019/06/17")).to.equal("N/A");
  });

  it('should return the highest climbing record', function() {
    user.activityRecord = [{
      flightsOfStairs: 10
    }, {
      flightsOfStairs: 15
    }, {
      flightsOfStairs: 17
    }]
    expect(user.findClimbingRecord()).to.equal(17)
  });

  it('should calculate daily calories burned', function() {
    user.activityRecord = [{
      date: "2019/09/16",
      activityRecord: 78
    }, {
      date: "2019/09/17",
      minutesActive: 100
    }, {
      date: "2019/09/17",
      minutesActive: 20
    }];
    expect(user.calculateDailyCalories("2019/09/17")).to.equal(912)
  });

  it('should calculate the average minutes active this week', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      minutesActive: 78
    }, {
      date: "2019/09/17",
      minutesActive: 100
    }, {
      date: "2019/09/16",
      minutesActive: 20
    }, {
      date: "2019/09/15",
      minutesActive: 21
    }, {
      date: "2019/09/14",
      minutesActive: 35
    }, {
      date: "2019/09/13",
      minutesActive: 37
    }, {
      date: "2019/06/12",
      minutesActive: 42
    }, {
      date: "2019/09/11",
      minutesActive: 18
    }, {
      date: "2019/09/10",
      minutesActive: 16
    }, {
      date: "2019/09/09",
      minutesActive: 81
    }];
    expect(user.calculateAverageMinutesActiveThisWeek("2019/09/17")).to.equal('39')
  });

  it('should calculate the average steps taken in a given week', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      steps: 1178
    }, {
      date: "2019/09/17",
      steps: 1080
    }, {
      date: "2019/09/16",
      steps: 120
    }, {
      date: "2019/09/15",
      steps: 891
    }, {
      date: "2019/09/14",
      steps: 380
    }, {
      date: "2019/09/13",
      steps: 3234
    }, {
      date: "2019/06/12",
      steps: 1111
    }, {
      date: "2019/09/11",
      steps: 18
    }, {
      date: "2019/09/10",
      steps: 345
    }, {
      date: "2019/09/09",
      steps: 81
    }];
    expect(user.calculateAverageStepsThisWeek("2019/09/17")).to.equal('976')
  });

  it('should calculate the average flights of stairs taken in a given week', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      flightsOfStairs: 4
    }, {
      date: "2019/09/17",
      flightsOfStairs: 6
    }, {
      date: "2019/09/16",
      flightsOfStairs: 1
    }, {
      date: "2019/09/15",
      flightsOfStairs: 2
    }, {
      date: "2019/09/14",
      flightsOfStairs: 12
    }, {
      date: "2019/09/13",
      flightsOfStairs: 21
    }, {
      date: "2019/06/12",
      flightsOfStairs: 3
    }, {
      date: "2019/09/11",
      flightsOfStairs: 14
    }, {
      date: "2019/09/10",
      flightsOfStairs: 2
    }, {
      date: "2019/09/09",
      flightsOfStairs: 8
    }];
    expect(user.calculateAverageFlightsThisWeek("2019/09/17")).to.equal('8.4')
  });

  it('should create an array of good days', function() {
    user.updateActivities({
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3684,
      "minutesActive": 140,
      "flightsOfStairs": 16
    });
    user.updateActivities({
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 14684,
      "minutesActive": 140,
      "flightsOfStairs": 16
    });
    expect(user.accomplishedDays.length).to.equal(1);
  });

  it('should find 3+ days with positive step trend', function() {
    user.findTrendingStepDays()
    expect(user.trendingStepDays).to.deep.equal(['Your most recent positive step streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive step streak was 2019/06/21 - 2019/06/24!']);
  });

  it('should find 3+ days with positive stair trend', function() {
    user.activityRecord = [{
        "date": "2019/06/29",
        "flightsOfStairs": 4
      },
      {
        "date": "2019/06/28",
        "flightsOfStairs": 1
      },
      {
        "date": "2019/06/27",
        "flightsOfStairs": 16
      },
      {
        "date": "2019/06/26",
        "flightsOfStairs": 15
      },
      {
        "date": "2019/06/25",
        "flightsOfStairs": 1
      },
      {
        "date": "2019/06/24",
        "flightsOfStairs": 9
      },
      {
        "date": "2019/06/23",
        "flightsOfStairs": 3
      },
      {
        "date": "2019/06/22",
        "flightsOfStairs": 10
      },
      {
        "date": "2019/06/21",
        "flightsOfStairs": 4
      },
      {
        "date": "2019/06/20",
        "flightsOfStairs": 3
      },
      {
        "date": "2019/06/19",
        "flightsOfStairs": 2
      },
      {
        "date": "2019/06/18",
        "flightsOfStairs": 1
      }
    ];
    user.findTrendingStairsDays()
    expect(user.trendingStairsDays).to.deep.equal(['Your most recent positive climbing streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive climbing streak was 2019/06/19 - 2019/06/24!']);
  });

  it('should find the first names of friends', function() {
    let user2 = new User({
      'id': 16,
      'name': 'Ben Nist',
    })
    let user3 = new User({
      'id': 4,
      'name': 'John Firth',
    })
    let user4 = new User({
      'id': 8,
      'name': 'Nick Adams',
    })
    let users = [user2, user3, user4];
    user.findFriendsNames(users);
    expect(user.friendsNames).to.deep.equal(['BEN', 'JOHN', 'NICK']);
  });

  it('should add users steps for week', function() {
    user.calculateTotalStepsThisWeek('2019/06/29');
    expect(user.totalStepsThisWeek).to.equal(34);
  });

  it('should find friends total steps', function() {

    user.findFriendsTotalStepsForWeek(users, '2019/06/29');
    expect(user.friendsActivityRecords).to.deep.equal([{
      "id": 4,
      "totalWeeklySteps": 734
    }, {
      "id": 16,
      "totalWeeklySteps": 248
    }, {
      "id": 8,
      "totalWeeklySteps": 34
    }]);
  });
});
