export const clientLink = () => {
  let link = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=15hT-JEnIUP1qqnlhiqnXLGaToZo2VE1x'
  if (navigator.platform.indexOf('Mac') > -1) {
    link = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1B1xDx_mTYMX8DvKs5G9l2tUUlPmaqr7M'
  }
  return link
}