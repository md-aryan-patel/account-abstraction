// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AccountAbstractionToken is ERC20, ERC20Burnable, Ownable {
    constructor(
        address initialOwner
    ) ERC20("Account Abstraction Token", "AAT") Ownable(initialOwner) {
        _mint(msg.sender, 50000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
