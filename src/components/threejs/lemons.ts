export interface LemonModel {
  exo: string
  cap: string
  cloth: string
  eyes: string
  head: string
  teeth: string
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
      exo: 'ARM1_Exo_BA01',
      cap: 'ARM1_Cap_ZA01',
      cloth: 'ARM1_Cloth_MA01',
      eyes: 'ARM1_Eyes_Z01',
      head: 'ARM1_Head_Z01',
      teeth: 'ARM1_Teeth_A01'
    }
  },
  octopus: {
    model: {
      exo: 'ARM1_Exo_MA01',
      cap: 'ARM1_Cap_MA01',
      cloth: 'ARM1_Cloth_MA01',
      eyes: 'ARM1_Eyes_B01',
      head: 'ARM1_Head_B01',
      teeth: 'ARM1_Teeth_B01'
    }
  },
  gaul: {
    model: {
      exo: 'ARM1_Exo_ZA01',
      cap: 'ARM1_Cap_ZA01',
      cloth: 'ARM1_Cloth_MA01',
      eyes: 'ARM1_Eyes_Z01',
      head: 'ARM1_Head_B01',
      teeth: 'ARM1_Teeth_Z01'
    }
  },
  magnet: {
    model: {
      exo: 'ARM1_Exo_BA01',
      cap: 'ARM1_Cap_MA01',
      cloth: 'ARM1_Cloth_MA01',
      eyes: 'ARM1_Eyes_A01',
      head: 'ARM1_Head_A01',
      teeth: 'ARM1_Teeth_Z01'
    }
  },
}

export default lemons;