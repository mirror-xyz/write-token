import { ethers, waffle } from "hardhat";
import fs from "fs";

export const ZERO_BYTES32 = ethers.constants.HashZero;
export const ROOT = "xyz";
export const subnameWallet = "mirror";

const config = {
  production: {
    ENS_REGISTRY_ADDRESS: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    ROOT_NAME: "mirror.xyz",
    ROOT_NODE: ethers.utils.namehash("mirror.xyz"),
    WRITE_TOKEN_ADDRESS: "",
    MIRROR_RESOLVER_ADDRESS: "",
  },
  test: {
    ENS_REGISTRY_ADDRESS: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    ROOT_NAME: "mirror.test",
    ROOT_NODE: ethers.utils.namehash("mirror.test"),
    WRITE_TOKEN_ADDRESS: "0xE951e74eFd142a970abb78d7F704C9e8446519b3",
    MIRROR_RESOLVER_ADDRESS: "0x9fc0471Ac1E4679C8a711d11B1c8B11F47221db5",
  },
};

const NETWORK_MAP = {
  "0": "mainnet",
  "3": "ropsten",
  "4": "rinkeby",
  "1337": "hardhat",
  "31337": "hardhat",
};

let isLocal = false;

async function main() {
  const chainId = (await waffle.provider.getNetwork()).chainId;
  const networkName = NETWORK_MAP[chainId];

  console.log(`Deploying to ${networkName}`);

  isLocal = networkName === "hardhat";

  let owner;
  let ensAddress;
  let ensRegistry;
  let ENS_REGISTRY_ADDRESS;
  let ROOT_NAME;
  let ROOT_NODE;
  let WRITE_TOKEN_ADDRESS;
  let MIRROR_RESOLVER_ADDRESS;

  if (networkName === "mainnet") {
    ({
      ENS_REGISTRY_ADDRESS,
      ROOT_NAME,
      ROOT_NODE,
      WRITE_TOKEN_ADDRESS,
      MIRROR_RESOLVER_ADDRESS,
    } = config.production);
  } else {
    ({
      ENS_REGISTRY_ADDRESS,
      ROOT_NAME,
      ROOT_NODE,
      WRITE_TOKEN_ADDRESS,
      MIRROR_RESOLVER_ADDRESS,
    } = config.test);
  }

  if (isLocal) {
    console.log("deploying ENS registry");
    const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
    ensRegistry = await ENSRegistry.deploy();
    await ensRegistry.deployed();

    ensAddress = ensRegistry.address;
  } else {
    ensAddress = ENS_REGISTRY_ADDRESS;
  }

  console.log("$WRITE:", WRITE_TOKEN_ADDRESS);
  console.log("Mirror ENS Resolver:", MIRROR_RESOLVER_ADDRESS);

  console.log("Deploying ENS Registrar");
  const MirrorENSRegistrar = await ethers.getContractFactory(
    "MirrorENSRegistrar"
  );
  const mirrorENSRegistrar = await MirrorENSRegistrar.deploy(
    ROOT_NAME,
    ROOT_NODE,
    ensAddress,
    MIRROR_RESOLVER_ADDRESS,
    WRITE_TOKEN_ADDRESS
  );
  await mirrorENSRegistrar.deployed();

  console.log("is local", isLocal);
  if (isLocal) {
    const accounts = await ethers.getSigners();
    owner = accounts[0].address;
    owner = accounts[0];

    // Setup root.
    await ensRegistry.setSubnodeOwner(
      ZERO_BYTES32,
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("xyz")),
      owner.address
    );
    await ensRegistry.setSubnodeOwner(
      ethers.utils.namehash("xyz"),
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("mirror")),
      mirrorENSRegistrar.address
    );
  }

  const mirrorWriteToken = await (
    await ethers.getContractAt("MirrorWriteToken", WRITE_TOKEN_ADDRESS)
  ).deployed();

  const mirrorENSResolver = await (
    await ethers.getContractAt("MirrorENSResolver", MIRROR_RESOLVER_ADDRESS)
  ).deployed();

  console.log("Setting registrar on $WRITE");
  await mirrorWriteToken.setENSRegistrar(mirrorENSRegistrar.address);
  console.log("Transferring ownership of Resolver to Registrar");
  await mirrorENSResolver.transferOwnership(mirrorENSRegistrar.address);

  const info = {
    Contracts: {
      MirrorWriteToken: WRITE_TOKEN_ADDRESS,
      MirrorENSResolver: ENS_REGISTRY_ADDRESS,
      MirrorENSRegistrar: mirrorENSRegistrar.address,
    },
  };

  console.log(info);

  if (!isLocal) {
    fs.writeFileSync(
      `${__dirname}/../networks/${networkName}.json`,
      JSON.stringify(info, null, 2)
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
