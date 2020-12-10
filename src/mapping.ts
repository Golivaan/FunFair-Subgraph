import { BigInt } from "@graphprotocol/graph-ts"
import {
  Token,
  Motd,
  Transfer,
  Approval,
  logTokenTransfer
} from "../generated/Token/Token"
import { Motd_, Transfer_, Approval_, logTokenTransfer_ } from "../generated/schema"

export function handleMotd(event: Motd): void {
  let entity = Motd_.load(event.params.message.toString())

  if (entity == null) {
    entity = new Motd_(event.params.message.toString())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.message = event.params.message
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = Transfer_.load(event.params.from.toHex())

  if (entity == null) {
    entity = new Transfer_(event.params.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}

export function handleApproval(event: Approval): void {
  let entity = Approval_.load(event.params.owner.toHex())

  if (entity == null) {
    entity = new Approval_(event.params.owner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handlelogTokenTransfer(event: logTokenTransfer): void {
  let entity = logTokenTransfer_.load(event.params.token.toHex())

  if (entity == null) {
    entity = new logTokenTransfer_(event.params.token.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.token = event.params.token
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save()
}
