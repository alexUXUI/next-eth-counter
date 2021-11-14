/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const { getContractFactory } = ethers;

describe("Counter Test Suite", () => {
  let Counter: Contract;

  before(async () => {
    // Create contract
    const counter = await getContractFactory("Counter");

    // Deploy contract
    Counter = await counter.deploy(1);
  });

  it("can increment", async () => {
    const count = await Counter.getCount();
    await Counter.increment();
    const newCount = await Counter.getCount();

    expect(newCount.toNumber()).to.be.equal(count.toNumber() + 1);
    expect(Counter.functions.increment).to.be.a("function");
  });

  it("can decrement", async () => {
    const count = await Counter.getCount();
    await Counter.decrement();
    const newCount = await Counter.getCount();

    expect(newCount.toNumber()).to.be.equal(count.toNumber() - 1);
    expect(Counter.functions.decrement).to.be.a("function");
  });

  it("can reset", async () => {
    await Counter.reset();
    const newCount = await Counter.getCount();

    expect(newCount.toNumber()).to.be.equal(0);
    expect(Counter.functions.reset).to.be.a("function");
  });

  it("can set count", async () => {
    await Counter.setCount(100);
    const newCount = await Counter.getCount();

    expect(newCount.toNumber()).to.be.equal(100);
    expect(Counter.functions.setCount).to.be.a("function");
  });

  it("can get count", async () => {
    await Counter.reset();
    const count = await Counter.getCount();

    expect(count.toNumber()).to.be.equal(0);
    expect(Counter.functions.getCount).to.be.a("function");
  });

  it("requires a count greater than -1", async () => {
    const failedCounter = await getContractFactory("Counter");

    await expect(failedCounter.deploy(-1)).to.be.revertedWith(
      "Counter:constructor:Count must be >= 0"
    );
  });

  it("setCount must be higher than -1", async () => {
    expect(Counter.setCount(-1)).to.be.revertedWith(
      "Counter:setCount:Count must be >= 0"
    );
  });

  it("decrement must be higher than -1", async () => {
    await Counter.reset();
    await Counter.decrement();
    expect(Counter.decrement()).to.be.revertedWith(
      "Counter:decrement:Count must be >= 0"
    );
  });

  it("The decrement event is emitted", async () => {
    await Counter.reset();
    await expect(Counter.decrement())
      .to.emit(Counter, "Log")
      .withArgs("Counter:Decremented");
  });

  it("all the increment events are emitted", async () => {
    const testAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

    await expect(Counter.increment())
      .to.emit(Counter, "Log")
      .withArgs("Counter:Incremeted");

    const incrementAction = Counter.increment();

    await expect(incrementAction)
      .to.emit(Counter, "Increment")
      .withArgs(ethers.utils.getAddress(testAddress), "0");
  });

  it("the setCount event is emitted", async () => {
    const setCount = await Counter.setCount(100);
    await expect(setCount).to.emit(Counter, "Log").withArgs("Counter:SetCount");
  });
});
