import assert from "node:assert";
import { describe, it } from "vitest";
import { createTestIndexer, TestHelpers } from "envio";

describe("BEP20UpgradeableProxy contract AdminChanged event tests", () => {
  it("BEP20UpgradeableProxy_AdminChanged is created correctly", async () => {
    const indexer = createTestIndexer();

    const previousAdmin = TestHelpers.Addresses.mockAddresses[0];
    const newAdmin = TestHelpers.Addresses.mockAddresses[1];

    await indexer.process({
      chains: {
        56: {
          simulate: [
            {
              contract: "BEP20UpgradeableProxy",
              event: "AdminChanged",
              params: { previousAdmin, newAdmin },
            },
          ],
        },
      },
    });

    const entities = await indexer.BEP20UpgradeableProxy_AdminChanged.getAll();

    assert.equal(entities.length, 1, "Exactly one AdminChanged entity should be created");
    assert.equal(entities[0].previousAdmin, previousAdmin);
    assert.equal(entities[0].newAdmin, newAdmin);
  });
});
