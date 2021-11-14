//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    int256 private _count;

    event Increment(address owner, int256 amount);
    event Decrement(address owner, int256 amount);
    event Log(string message);

    constructor(int256 count) public {
        require(count >= 0, "Counter:constructor:Count must be >= 0");
        emit Log("Counter:Deployed");
        _count = count;
    }

    function increment() public returns (int256) {
        int256 newCount = _count ++;
        emit Increment(msg.sender, newCount);
        emit Log("Counter:Incremeted");
        return newCount;
    }

    function decrement() public returns (int256) {
        if (_count < 0) {
            require(false, "Counter:decrement:Count must be >= 0");
        }
        int256 newCount = _count--;
        emit Log("Counter:Decremented");
        emit Increment(msg.sender, newCount);
        return newCount;
    }

    function getCount() public view returns (int256) {
        return _count;
    }

    function setCount(int256 count) public returns (int256) {
        require(count >= 0, "Counter:setCount:Count must be >= 0");
        emit Log("Counter:SetCount");
        return _count = count;
    }

    function reset() public returns (int256) {
        emit Log("Counter:Reset");
        return _count = 0;
    }
}
