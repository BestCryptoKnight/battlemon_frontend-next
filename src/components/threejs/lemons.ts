export interface LemonModel {
  exo?: string
  cap?: string
  cloth?: string
  eyes?: string
  head?: string
  teeth?: string
  anim?: string
  back?: string
  full?: string
}

export interface LemonSettings {
  model: LemonModel
}

export interface Lemons {
  [key: string]: LemonSettings
}


const lemons: Lemons = {
  classic: {
    model: {
      full: 'BTLMN_ARM1_A1'
      // cloth: 'ARM1_Cloth_MA01',
      // eyes: 'ARM1_Eyes_Z01',
      // head: 'ARM1_Head_Z01',
      // teeth: 'ARM1_Teeth_A01'
    }
  },
  octopus: {
    model: {
      full: 'BTLMN_ARM1_A2'
      // cloth: 'ARM1_Cloth_MA01',
      // eyes: 'ARM1_Eyes_B01',
      // head: 'ARM1_Head_B01',
      // teeth: 'ARM1_Teeth_B01'
    }
  },
  gaul: {
    model: {
      full: 'BTLMN_ARM1_A3'
      // cloth: 'ARM1_Cloth_MA01',
      // eyes: 'ARM1_Eyes_Z01',
      // head: 'ARM1_Head_B01',
      // teeth: 'ARM1_Teeth_Z01'
    }
  },
  magnet: {
    model: {
      full: 'BTLMN_ARM1_A4'
      // cloth: 'ARM1_Cloth_MA01',
      // eyes: 'ARM1_Eyes_A01',
      // head: 'ARM1_Head_A01',
      // teeth: 'ARM1_Teeth_Z01'
    }
  },
}

export default lemons;