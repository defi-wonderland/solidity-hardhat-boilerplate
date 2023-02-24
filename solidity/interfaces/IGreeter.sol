//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

interface IGreeter {
  event GreetingSet(string _greeting);

  error EmptyGreeting();

  function greeting() external returns (string memory _greet);

  function greet() external view returns (string memory _greet);

  function setGreeting(string memory _greeting) external returns (bool _changedGreet);
}
