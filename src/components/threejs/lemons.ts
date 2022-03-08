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
    model: '/media/Character_A.glb',
    scale: 1.5,
    weaponCoord: [101.12, 101.05, 0],
    light: 4.5,
  },
  octopus: {
    model: '/media/Character_A.glb',
    scale: 1.5,
    weaponCoord: [100.80, 101.60, 0],
    light: 4.5,
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