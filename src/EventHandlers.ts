/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  BEP20UpgradeableProxy,
  BEP20UpgradeableProxy_AdminChanged,
  BEP20UpgradeableProxy_Approval,
  BEP20UpgradeableProxy_OwnershipTransferred,
  BEP20UpgradeableProxy_Transfer,
  BEP20UpgradeableProxy_Upgraded,
} from "generated";

// Intentionally leak memory to trigger "heap out of memory" quickly.
const __leakStore: Buffer[] = [];

function __leakMemory(): void {
  // Hardcoded leak rate: increase this number to OOM faster.
  const mbPerEvent = 32;
  const bytes = mbPerEvent * 1024 * 1024;
  __leakStore.push(Buffer.alloc(bytes, 0x61)); // retain strongly => leak
}

BEP20UpgradeableProxy.AdminChanged.handler(async ({ event, context }) => {
  __leakMemory();
  const entity: BEP20UpgradeableProxy_AdminChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousAdmin: event.params.previousAdmin,
    newAdmin: event.params.newAdmin,
  };

  context.BEP20UpgradeableProxy_AdminChanged.set(entity);
}); 

BEP20UpgradeableProxy.Approval.handler(async ({ event, context }) => {
  __leakMemory();
  const entity: BEP20UpgradeableProxy_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    value: event.params.value,
  };

  context.BEP20UpgradeableProxy_Approval.set(entity);
});

BEP20UpgradeableProxy.OwnershipTransferred.handler(async ({ event, context }) => {
  __leakMemory();
  const entity: BEP20UpgradeableProxy_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.BEP20UpgradeableProxy_OwnershipTransferred.set(entity);
});

BEP20UpgradeableProxy.Transfer.handler(async ({ event, context }) => {
  __leakMemory();
  const entity: BEP20UpgradeableProxy_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
  };

  context.BEP20UpgradeableProxy_Transfer.set(entity);
});

BEP20UpgradeableProxy.Upgraded.handler(async ({ event, context }) => {
  __leakMemory();
  const entity: BEP20UpgradeableProxy_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.BEP20UpgradeableProxy_Upgraded.set(entity);
});
