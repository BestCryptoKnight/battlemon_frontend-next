export const clientLink = () => {
  let link = 'https://drive.google.com/file/d/1KLDL11-0QdYUrUvSf5Gt60K1uSNEUwTf/view'
  if (navigator.platform.indexOf('Mac') > -1) {
    link = 'https://drive.google.com/file/d/1IGPLoMIa-kQNZ1QGCeFQ666Nh_0RJSSe/view'
  }
  return link
}

export const assetsTimestamp = "020620220006"