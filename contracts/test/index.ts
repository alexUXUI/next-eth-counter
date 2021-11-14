import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Greeter", () => {
  // Arrange: Create and deploy contract
  let Greeter: Contract;
  const defaultGreeting: string = "Hello, World!";
  const updatedGreeting: string = "Hola, mundo!";

  before(async () => {
    // Create contract
    const greeter = await ethers.getContractFactory("Greeter");

    // Deploy contract
    Greeter = await greeter.deploy(defaultGreeting);
  });

  it("Should greet", async () => {
    // Act: Call greet
    const greeting = await Greeter.greet();

    // Assert: Greeting should be correct
    expect(greeting).to.equal(defaultGreeting);
  });

  it("Should update the greeting", async () => {
    // Act: Call setGreeting
    const setGreetingTx = await Greeter.setGreeting(updatedGreeting);
    await setGreetingTx.wait();

    // Assert: New greeting is returned
    expect(await Greeter.greet()).to.equal(updatedGreeting);
  });
});
