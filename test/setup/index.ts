import { ethers } from "hardhat";
import { ROOT_NAME, ROOT_NODE, ZERO_BYTES32 } from "../config/constants";

async function setup() {
  const [owner] = await ethers.getSigners();

  const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
  const ensRegistry = await ENSRegistry.deploy();
  await ensRegistry.deployed();

  const PublicationRoles = await ethers.getContractFactory(
    "PublicationRoles"
  );
  const publicationRoles = await PublicationRoles.deploy(ensRegistry.address);
  await publicationRoles.deployed();

  const MirrorWriteToken = await ethers.getContractFactory("MirrorWriteToken");
  const mirrorWriteToken = await MirrorWriteToken.deploy();
  await mirrorWriteToken.deployed();

  const WriteDistributionHelper = await ethers.getContractFactory(
    "WriteDistributionHelperV1"
  );
  const writeDistributionHelper = await WriteDistributionHelper.deploy(
    mirrorWriteToken.address
  );
  await writeDistributionHelper.deployed();

  const MirrorBatchRegistration = await ethers.getContractFactory(
    "MirrorBatchRegistration"
  );
  const mirrorBatchRegistration = await MirrorBatchRegistration.deploy(
    mirrorWriteToken.address
  );
  await mirrorBatchRegistration.deployed();

  const MirrorENSResolver = await ethers.getContractFactory(
    "MirrorENSResolver"
  );
  const mirrorENSResolver = await MirrorENSResolver.deploy();
  await mirrorENSResolver.deployed();

  const MirrorENSRegistrar = await ethers.getContractFactory(
    "MirrorENSRegistrar"
  );
  const mirrorENSRegistrar = await MirrorENSRegistrar.deploy(
    ROOT_NAME,
    ROOT_NODE,
    ensRegistry.address,
    mirrorENSResolver.address,
    mirrorWriteToken.address
  );
  await mirrorENSRegistrar.deployed();

  await mirrorWriteToken.setENSRegistrar(mirrorENSRegistrar.address);
  await mirrorENSResolver.transferOwnership(mirrorENSRegistrar.address);

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

  return {
    mirrorWriteToken,
    mirrorENSRegistrar,
    ensRegistry,
    mirrorENSResolver,
    mirrorBatchRegistration,
    writeDistributionHelper,
    publicationRoles
  };
}

export default setup;
