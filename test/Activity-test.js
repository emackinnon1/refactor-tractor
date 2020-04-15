import { expect } from "chai";

import Activity from "../src/Activity";

import activityTestData from "../src/data/activity-test-data";

describe("Activity", function() {
  let activity1;

  beforeEach(() => {

    activity1 = new Activity(activityTestData);
  });

  it("should be an instance of activity", function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });
});
