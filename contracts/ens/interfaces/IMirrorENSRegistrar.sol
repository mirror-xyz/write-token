//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.6.8;

interface IMirrorENSRegistrar {
    function changeRootNodeOwner(address newOwner_) external;

    function register(string calldata label_, address owner_) external;

    function labelOwner(string calldata label) external view returns (address);

    function changeSubnodeOwner(string calldata label_, address newOwner_) external;
}
