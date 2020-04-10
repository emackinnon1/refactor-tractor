import { expect } from "chai";

import hydrationTestData from "../src/data/hydration-test-data";
import userTestData from "../src/data/users-test-data";

import Hydration from "../src/Hydration";
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("Hydration", function() {
  let hydrate1, hydrate2, hydrate3;
  let user1, user2, user3;
  let userRepository;

  beforeEach(() => {
    hydrate1 = new Hydration(hydrationTestData[0]);
    hydrate2 = new Hydration(hydrationTestData[1]);
    hydrate3 = new Hydration(hydrationTestData[2]);

    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);

    userRepository = new UserRepository([user1, user2, user3]);
  });

  it("should be an instance of Hydration", function() {
    expect(hydrate1).to.be.an.instanceof(Hydration);
  });

  it("should have an id", function() {
    expect(hydrate1.userID).to.equal(1);
  });

  it("should have a date", function() {
    expect(hydrate1.date).to.equal("2019/06/15");
  });

  it("should have an amount of ounces drank", function() {
    expect(hydrate1.numOunces).to.equal(37);
  });
});
