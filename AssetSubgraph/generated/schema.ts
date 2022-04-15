// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class All extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("numAssets", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save All entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type All must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("All", id.toString(), this);
    }
  }

  static load(id: string): All | null {
    return changetype<All | null>(store.get("All", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get numAssets(): BigInt {
    let value = this.get("numAssets");
    return value!.toBigInt();
  }

  set numAssets(value: BigInt) {
    this.set("numAssets", Value.fromBigInt(value));
  }
}

export class AssetToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("supply", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AssetToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AssetToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AssetToken", id.toString(), this);
    }
  }

  static load(id: string): AssetToken | null {
    return changetype<AssetToken | null>(store.get("AssetToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    return value!.toBigInt();
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get isNFT(): boolean {
    let value = this.get("isNFT");
    return value!.toBoolean();
  }

  set isNFT(value: boolean) {
    this.set("isNFT", Value.fromBoolean(value));
  }
}
