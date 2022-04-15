import {
  CreatorshipTransfer as CreatorshipTransferEvent,
  DebugEvent as DebugEventEvent,
  BouncerAdminChanged as BouncerAdminChangedEvent,
  Bouncer as BouncerEvent,
  MetaTransactionProcessor as MetaTransactionProcessorEvent,
  Extraction as ExtractionEvent,
  AssetUpdate as AssetUpdateEvent,
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  TransferSingle as TransferSingleEvent,
  TransferBatch as TransferBatchEvent,
  URI as URIEvent,
  SuperOperator as SuperOperatorEvent,
  AdminChanged as AdminChangedEvent
} from "../generated/Asset/Asset"
import {store, Address, Bytes, BigInt} from "@graphprotocol/graph-ts";
import {
  All, AssetToken
} from "../generated/schema"

let ZERO = BigInt.fromI32(0);
let ONE = BigInt.fromI32(1);

export function handleTransferSingle(event: TransferSingleEvent): void {
  let all = All.load('all')
  if (all == null) {
    all = new All('all');
    all.numAssets = ZERO;
  }

  let assetToken = AssetToken.load(event.params.id.toString())
  if (assetToken == null) {
    assetToken = new AssetToken(event.params.id.toString())
    assetToken.supply = event.params.value
    assetToken.isNFT = (assetToken.supply.toI32() == 1)
    all.numAssets = all.numAssets.plus(ONE)
  }
  assetToken.save()
  all.save()
}
