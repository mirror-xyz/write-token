import { expect } from "chai";
import { BigNumber } from "ethers";
import { keccak256, namehash, toUtf8Bytes } from "ethers/lib/utils";
import { ethers } from "hardhat";

import setup from "./setup";

const REGISTRATION_COST = "1000000000000000000";

describe("PublicationRoles", () => {
  // Contracts
  let token;
  let mirrorENSRegistrar;
  let ensRegistry;
  let mirrorENSResolver;
  let publicationRoles;

  // Accounts
  let owner;
  let account1;
  let account2;
  let account3;

  beforeEach(async () => {
    ({
      mirrorWriteToken: token,
      mirrorENSRegistrar,
      ensRegistry,
      mirrorENSResolver,
      publicationRoles,
    } = await setup());

    [owner, account1, account2, account3] = await ethers.getSigners();
  });

  describe("deployment", () => {
    it("has the correct ENS address", async () => {
      expect(await publicationRoles.ens()).to.eq(ensRegistry.address);
    });
  });

  describe("when a publication has been registered", () => {
    const label = "test";
    const publicationNode = ethers.utils.namehash(`${label}.mirror.xyz`);

    beforeEach(async () => {
      const numTokens = BigNumber.from(REGISTRATION_COST).mul(1);
      await token.connect(owner).mint(account1.address, numTokens);
      await token.connect(account1).register(label, account2.address);
    });

    describe("#getContributorId", () => {
      it("returns a bytes32 string for a contirbutor and publication combo", async () => {
        const node = await publicationRoles.getContributorId(
          account2.address,
          publicationNode
        );

        expect(node).to.eq(
          "0xa176eb88a0306e8ddc619ee57c12aeebf21b8762c9a90d257f896c042183643f"
        );
      });
    });

    describe("#publicationOwner", () => {
      describe("when called with the publication that was registered", () => {
        it("returns the publication owner address", async () => {
          expect(
            await publicationRoles.publicationOwner(publicationNode)
          ).to.eq(account2.address);
        });
      });

      describe("when called with the publication that was not registered", () => {
        it("returns the null address", async () => {
          const node = ethers.utils.namehash("fake.mirror.xyz");
          expect(await publicationRoles.publicationOwner(node)).to.eq(
            "0x0000000000000000000000000000000000000000"
          );
        });
      });
    });

    describe("#modifyRole", () => {
      describe("when called by the publication owner", () => {
        it("creates a new role", async () => {
          const role = await publicationRoles.encodeRole("WRITER");

          await publicationRoles
            .connect(account2)
            .modifyRole(account2.address, publicationNode, role);

          const stored = await publicationRoles.getRole(
            account2.address,
            publicationNode
          );

          expect(stored).to.eq(role);
        });
      });

      describe("when called by someone not the publication owner", () => {
        it("reverts the transaction", async () => {
          const role = await publicationRoles.encodeRole("WRITER");

          const tx = publicationRoles
            .connect(account1)
            .modifyRole(account2.address, publicationNode, role);

          await expect(tx).to.be.revertedWith(
            "Sender must be publication owner"
          );
        });
      });
    });
  });
});
