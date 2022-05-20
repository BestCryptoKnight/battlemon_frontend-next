export const clientLink = () => {
  let link = 'https://drive.google.com/uc?export=download&id=1v1Z2hbiWBO4Vk1Xihu6JrUi8T-lCHlNb'
  if (navigator.platform.indexOf('Mac') > -1) {
    link = 'https://drive.google.com/uc?export=download&id=1MXXLig1xHDSkolUvs7kRHPBSTFPPPxvR'
  }
  return link
}