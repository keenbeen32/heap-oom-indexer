import assert from "assert";
import { 
  TestHelpers,
  BEP20UpgradeableProxy_AdminChanged
} from "generated";
const { MockDb, BEP20UpgradeableProxy } = TestHelpers;

describe("BEP20UpgradeableProxy contract AdminChanged event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for BEP20UpgradeableProxy contract AdminChanged event
  const event = BEP20UpgradeableProxy.AdminChanged.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("BEP20UpgradeableProxy_AdminChanged is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await BEP20UpgradeableProxy.AdminChanged.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualBEP20UpgradeableProxyAdminChanged = mockDbUpdated.entities.BEP20UpgradeableProxy_AdminChanged.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedBEP20UpgradeableProxyAdminChanged: BEP20UpgradeableProxy_AdminChanged = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      previousAdmin: event.params.previousAdmin,
      newAdmin: event.params.newAdmin,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualBEP20UpgradeableProxyAdminChanged, expectedBEP20UpgradeableProxyAdminChanged, "Actual BEP20UpgradeableProxyAdminChanged should be the same as the expectedBEP20UpgradeableProxyAdminChanged");
  });
});
