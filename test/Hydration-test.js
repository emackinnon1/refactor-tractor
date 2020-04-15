import { expect } from "chai";

import hydrationTestData from "../src/data/hydration-test-data";

import Hydration from "../src/Hydration";

describe("Hydration", function() {
  let hydrate1;

  beforeEach(() => {
    hydrate1 = new Hydration(hydrationTestData[0]);

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
