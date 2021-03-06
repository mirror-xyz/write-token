/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MirrorPublicationV1 } from "../MirrorPublicationV1";

export class MirrorPublicationV1__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MirrorPublicationV1> {
    return super.deploy(overrides || {}) as Promise<MirrorPublicationV1>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MirrorPublicationV1 {
    return super.attach(address) as MirrorPublicationV1;
  }
  connect(signer: Signer): MirrorPublicationV1__factory {
    return super.connect(signer) as MirrorPublicationV1__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MirrorPublicationV1 {
    return new Contract(address, _abi, signerOrProvider) as MirrorPublicationV1;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "ContributorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "ContributorDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addContributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "disableContributor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isFactory",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610ebd806100326000396000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c8063715018a6116100cd578063b579184f11610081578063dd62ed3e11610066578063dd62ed3e14610399578063f2fde38b146103c7578063f6d2ee86146103ed57610151565b8063b579184f1461036b578063c45a01551461039157610151565b80638f32d59b116100b25780638f32d59b1461032f57806395d89b4114610337578063a9059cbb1461033f57610151565b8063715018a6146103035780638da5cb5b1461030b57610151565b806323b872dd1161012457806337e20ca91161010957806337e20ca91461028957806340c10f19146102b157806370a08231146102dd57610151565b806323b872dd14610235578063313ce5671461026b57610151565b806301a74a081461015657806306fdde0314610172578063095ea7b3146101ef57806318160ddd1461021b575b600080fd5b61015e61052f565b604080519115158252519081900360200190f35b61017a610540565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101b457818101518382015260200161019c565b50505050905090810190601f1680156101e15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015e6004803603604081101561020557600080fd5b506001600160a01b0381351690602001356105ce565b6102236105e5565b60408051918252519081900360200190f35b61015e6004803603606081101561024b57600080fd5b506001600160a01b038135811691602081013590911690604001356105eb565b61027361067f565b6040805160ff9092168252519081900360200190f35b6102af6004803603602081101561029f57600080fd5b50356001600160a01b0316610688565b005b61015e600480360360408110156102c757600080fd5b506001600160a01b038135169060200135610723565b610223600480360360208110156102f357600080fd5b50356001600160a01b0316610772565b6102af610784565b610313610829565b604080516001600160a01b039092168252519081900360200190f35b61015e610838565b61017a610849565b61015e6004803603604081101561035557600080fd5b506001600160a01b0381351690602001356108a4565b6102af6004803603602081101561038157600080fd5b50356001600160a01b03166108b1565b610313610900565b610223600480360360408110156103af57600080fd5b506001600160a01b038135811691602001351661090f565b6102af600480360360208110156103dd57600080fd5b50356001600160a01b031661092c565b6102af6004803603608081101561040357600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561042e57600080fd5b82018360208201111561044057600080fd5b8035906020019184600183028401116401000000008311171561046257600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156104b557600080fd5b8201836020820111156104c757600080fd5b803590602001918460018302840111640100000000831117156104e957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff1691506109789050565b6000546001600160a01b0316331490565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156105c65780601f1061059b576101008083540402835291602001916105c6565b820191906000526020600020905b8154815290600101906020018083116105a957829003601f168201915b505050505081565b60006105db338484610a0a565b5060015b92915050565b60065481565b6001600160a01b03831660009081526008602090815260408083203384529091528120546000191461066a576001600160a01b03841660009081526008602090815260408083203384529091529020546106459083610a6c565b6001600160a01b03851660009081526008602090815260408083203384529091529020555b610675848484610ac4565b5060019392505050565b60055460ff1681565b610690610838565b6106cb5760405162461bcd60e51b815260040180806020018281038252602d815260200180610e29602d913960400191505060405180910390fd5b6001600160a01b038116600081815260026020908152604091829020805460ff19169055815192835290517fbf8abc36afdfbd000229c1b2b6f0f5b95a08a65c840e875cac222c425f5be9f79281900390910190a150565b600061072d610838565b6107685760405162461bcd60e51b815260040180806020018281038252602d815260200180610e29602d913960400191505060405180910390fd5b6105db8383610b72565b60076020526000908152604090205481565b61078c610838565b6107c75760405162461bcd60e51b815260040180806020018281038252602d815260200180610e29602d913960400191505060405180910390fd5b6001546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b6001546001600160a01b031690565b6001546001600160a01b0316331490565b6004805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156105c65780601f1061059b576101008083540402835291602001916105c6565b60006105db338484610ac4565b6108b9610838565b6108f45760405162461bcd60e51b815260040180806020018281038252602d815260200180610e29602d913960400191505060405180910390fd5b6108fd81610bfb565b50565b6000546001600160a01b031690565b600860209081526000928352604080842090915290825290205481565b610934610838565b61096f5760405162461bcd60e51b815260040180806020018281038252602d815260200180610e29602d913960400191505060405180910390fd5b6108fd81610c56565b61098061052f565b6109bb5760405162461bcd60e51b815260040180806020018281038252602e815260200180610dfb602e913960400191505060405180910390fd5b6109c484610c56565b82516109d7906003906020860190610d67565b5081516109eb906004906020850190610d67565b506005805460ff191660ff8316179055610a0484610bfb565b50505050565b6001600160a01b03808416600081815260086020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b808203828111156105df576040805162461bcd60e51b815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6001600160a01b038316600090815260076020526040902054610ae79082610a6c565b6001600160a01b038085166000908152600760205260408082209390935590841681522054610b169082610d0f565b6001600160a01b0380841660008181526007602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600654610b7f9082610d0f565b6006556001600160a01b038216600090815260076020526040902054610ba59082610d0f565b6001600160a01b038316600081815260076020908152604091829020939093558051848152905191927f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d412139688592918290030190a25050565b6001600160a01b038116600081815260026020908152604091829020805460ff19166001179055815192835290517f07681ffd9d424587412481b41d2ee582bb7bca757f626b0477051f30294702729281900390910190a150565b6001600160a01b038116610c9b5760405162461bcd60e51b8152600401808060200182810382526032815260200180610e566032913960400191505060405180910390fd5b6001546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b808201828110156105df576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610da857805160ff1916838001178555610dd5565b82800160010185558215610dd5579182015b82811115610dd5578251825591602001919060010190610dba565b50610de1929150610de5565b5090565b5b80821115610de15760008155600101610de656fe4d6972726f725075626c69636174696f6e56313a2063616c6c6572206973206e6f742074686520666163746f72794d6972726f725075626c69636174696f6e56313a2063616c6c6572206973206e6f7420746865206f776e65722e4d6972726f725075626c69636174696f6e56313a206e6577206f776e657220697320746865207a65726f2061646472657373a264697066735822122097670b868245f9202b784256b53f0acbae4eb316ab3165d7c81cb6e5b8bec0a864736f6c63430007030033";
