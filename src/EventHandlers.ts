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
// IMPORTANT: use JS heap allocations (not Buffers) so V8 emits the default
// "JavaScript heap out of memory" fatal error when it crashes.
const __leakStore: string[] = [];
let __leakStarted = false;

function __leakMemory(): void {
  // Hardcoded leak rate: increase this number to OOM faster.
  const mbPerEvent = 32;
  // Strings allocate on the V8 heap. Roughly 2 bytes per char (UTF-16).
  // Allocate ~mbPerEvent MB worth of characters.
  const chars = Math.max(1, Math.floor((mbPerEvent * 1024 * 1024) / 2));
  __leakStore.push("a".repeat(chars)); // retain strongly => leak
}

function __startHeapLeak(): void {
  if (__leakStarted) return;
  __leakStarted = true;
 
  // Leak continuously once the module is loaded, independent of event volume.
  setInterval(() => {
    __leakMemory(); 
  }, 10);
}

__startHeapLeak();

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
