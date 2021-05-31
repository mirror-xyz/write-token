/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IENSInterface extends ethers.utils.Interface {
  functions: {
    "owner(bytes32)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "owner", values: [BytesLike]): string;

  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;

  events: {};
}

export class IENS extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IENSInterface;

  functions: {
    owner(_node: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    "owner(bytes32)"(
      _node: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  owner(_node: BytesLike, overrides?: CallOverrides): Promise<string>;

  "owner(bytes32)"(
    _node: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    owner(_node: BytesLike, overrides?: CallOverrides): Promise<string>;

    "owner(bytes32)"(
      _node: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    owner(_node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "owner(bytes32)"(
      _node: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    owner(
      _node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "owner(bytes32)"(
      _node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
