export interface LemonSettings {
  model: string
  scale: number
  weaponCoord: [number, number, number],
  light: number
}

export interface Lemons {
  [key: string]: LemonSettings
}


const lemons: Lemons = {
  classic: {
    model: '/media/Classic_web.glb',
    scale: 0.33,
    weaponCoord: [1.12, 1.05, 0],
    light: 4.5,
  },
  octopus: {
    model: '/media/Octopus_web.glb',
    scale: 0.7,
    weaponCoord: [0.80, 1.60, 0],
    light: 5.5,
  },
  gaul: {
    model: '/media/Gaul_web.glb',
    scale: 1,
    weaponCoord: [1.05, 1.30, 0],
    light: 6.5,
  },
  magnet: {
    model: '/media/Magnet_web.glb',
    scale: 0.7,
    weaponCoord: [0.80, 1.65, 0],
    light: 5.5,
  }
}

export default lemons;