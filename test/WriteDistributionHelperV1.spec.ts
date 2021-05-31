import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import BalanceTree from "../merkle-distribution/balance-tree";

import setup from "./setup";

const oneToken = "1000000000000000000";
const twoTokens = "2000000000000000000";
const twentyOneTokens = "21000000000000000000";

const overrides = {
  gasLimit: 9500000,
};

describe("WriteDistributionHelper", () => {
  // Contracts
  let token;
  let writeDistributionHelper;

  // Accounts
  let owner;
  let account1;
  let account2;
  let account3;

  beforeEach(async () => {
    ({ mirrorWriteToken: token, writeDistributionHelper } = await setup());

    [owner, account1, account2, account3] = await ethers.getSigners();
  });

  describe("#distributeTo", () => {
    describe("when the account has an invite token", () => {
      let transaction;
      let receipt;

      beforeEach(async () => {
        await token
          .connect(owner)
          .mint(writeDistributionHelper.address, twoTokens);

        transaction = await writeDistributionHelper
          .connect(owner)
          .distributeTo([account1.address, account2.address]);

        receipt = await transaction.wait();
      });

      it("sends the user a token", async () => {
        expect((await token.balanceOf(account1.address)).toString()).to.equal(
          oneToken
        );
        expect((await token.balanceOf(account2.address)).toString()).to.equal(
          oneToken
        );
        expect((await token.balanceOf(account1.address)).toString()).to.equal(
          oneToken
        );
      });

      it("uses 70068 gas", () => {
        const { gasUsed } = receipt;
        expect(gasUsed).to.eq(70068);
      });
    });

    describe("when called by the non-owner", () => {
      let transaction;

      beforeEach(async () => {
        await token
          .connect(owner)
          .mint(writeDistributionHelper.address, twoTokens);
      });

      it("reverts", async () => {
        transaction = writeDistributionHelper
          .connect(account1)
          .distributeTo([account1.address, account2.address]);
        await expect(transaction).to.be.revertedWith(
          "WriteDistributionV1: caller is not the owner"
        );
      });
    });
  });

  describe("#setMerkleRoot", () => {
    it("sets the merkle root when called by owner", async () => {
      const tree = new BalanceTree([
        { account: account2.address, amount: BigNumber.from(10) },
        { account: account3.address, amount: BigNumber.from(11) },
      ]);

      await writeDistributionHelper
        .connect(owner)
        .setMerkleRoot(tree.getHexRoot());

      const result = await writeDistributionHelper.merkleRoot();
      expect(result).to.eq(tree.getHexRoot());
    });
  });

  describe("#claim", () => {
    describe("two account tree", () => {
      let tree: BalanceTree;

      const amounts = [10, 11];

      beforeEach("set merkle root", async () => {
        tree = new BalanceTree([
          { account: account2.address, amount: BigNumber.from(amounts[0]) },
          { account: account3.address, amount: BigNumber.from(amounts[1]) },
        ]);

        await token
          .connect(owner)
          .mint(writeDistributionHelper.address, twentyOneTokens);

        await writeDistributionHelper
          .connect(owner)
          .setMerkleRoot(tree.getHexRoot());
      });

      it("first successful claim", async () => {
        const proof0 = tree.getProof(
          0,
          account2.address,
          BigNumber.from(amounts[0])
        );

        await expect(
          writeDistributionHelper.claim(
            0,
            account2.address,
            amounts[0],
            proof0,
            overrides
          )
        )
          .to.emit(writeDistributionHelper, "Claimed")
          .withArgs(0, account2.address, amounts[0]);
      });

      it("second successful claim", async () => {
        const proof0 = tree.getProof(
          1,
          account3.address,
          BigNumber.from(amounts[1])
        );

        await expect(
          writeDistributionHelper.claim(
            1,
            account3.address,
            amounts[1],
            proof0,
            overrides
          )
        )
          .to.emit(writeDistributionHelper, "Claimed")
          .withArgs(1, account3.address, amounts[1]);
      });

      it("transfers the token", async () => {
        const proof0 = tree.getProof(
          0,
          account2.address,
          BigNumber.from(amounts[0])
        );
        expect(await token.balanceOf(account2.address)).to.eq(0);

        await writeDistributionHelper.claim(
          0,
          account2.address,
          amounts[0],
          proof0,
          overrides
        );
        expect(await token.balanceOf(account2.address)).to.eq(amounts[0]);

        const proof1 = tree.getProof(
          1,
          account3.address,
          BigNumber.from(amounts[1])
        );
        expect(await token.balanceOf(account3.address)).to.eq(0);

        await writeDistributionHelper.claim(
          1,
          account3.address,
          amounts[1],
          proof1,
          overrides
        );
        expect(await token.balanceOf(account3.address)).to.eq(amounts[1]);
      });
    });
  });
});
