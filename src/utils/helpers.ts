export const clientLink = () => {
  let link = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=15hT-JEnIUP1qqnlhiqnXLGaToZo2VE1x'
  if (navigator.platform.indexOf('Mac') > -1) {
    link = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1B1xDx_mTYMX8DvKs5G9l2tUUlPmaqr7M'
  }
  return link
}

export interface NFT {
  token_id: string,
  owner_id: string,
  title: string | null,
  description: string | null,
  media: string,
  media_hash: string | null,
  copies: string | null,
  issued_at: string | null,
  expires_at: string | null,
  price?: number,
  model: {
    kind: string,
    cap: string,
    cloth: string,
    exo: string,
    eyes: string,
    head: string,
    teeth: string
  }
}