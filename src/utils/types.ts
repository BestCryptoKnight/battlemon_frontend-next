export interface LemonOutfit {
  token_id: string,
  flavour: string
}

export interface LemonModel {
  kind?: string
  head?: string
  model: string
  exo: string
  eyes: string
  face: string
  teeth: string
  fire_arm: LemonOutfit | undefined
  cold_arm: LemonOutfit | undefined
  cloth: LemonOutfit | undefined
  cap: LemonOutfit | undefined
  back: LemonOutfit | undefined
}

export interface LemonNFT {
  model: LemonModel
  token_id: string
  owner_id: string
}