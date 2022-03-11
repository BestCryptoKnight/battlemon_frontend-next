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
    model: '/media/BTLMN_Character_A_Alien.glb',
    scale: 1.8,
    weaponCoord: [101.12, 101.05, 0],
    light: 4,
  },
  octopus: {
    model: '/media/BTLMN_Character_A_Soldier.glb',
    scale: 1.8,
    weaponCoord: [100.80, 101.60, 0],
    light: 4,
  },
  gaul: {
    model: '/media/BTLMN_Character_A_Zombie.glb',
    scale: 1.8,
    weaponCoord: [101.12, 101.05, 0],
    light: 4,
  },
  magnet: {
    model: '/media/BTLMN_Character_A_Zombie.glb',
    scale: 1.8,
    weaponCoord: [101.12, 101.05, 0],
    light: 4,
  },
}

export default lemons;