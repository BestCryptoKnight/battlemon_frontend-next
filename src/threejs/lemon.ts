import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
export const modelUrl = "/models/BTLMN_ARM1_Tier1_MP.glb"
import type { LemonNFT } from '$src/utils/types'
import type { Scene } from 'three'

export const wearLemonModel = (scene: Scene, lemon: LemonNFT): Scene => {

  // тут аутфит лежит не в папке Armature, и вообще в папке armature есть еще кости
  const Back_Insecticide_bottle_ZA01 = scene.getObjectByName('Back_Insecticide_bottle_ZA01')
  if (Back_Insecticide_bottle_ZA01) {
    Back_Insecticide_bottle_ZA01.removeFromParent()
    scene.getObjectByName('Armature')?.add(Back_Insecticide_bottle_ZA01)
  }
        
  // тут неправильно указан Exo_Snowwhite
  const Exo_Snowwhite_AA02 = scene.getObjectByName("FireArms_Handgun_SMG_AA02")
  console.log(Exo_Snowwhite_AA02)
  if (Exo_Snowwhite_AA02) {
    Exo_Snowwhite_AA02.name = 'FireArms_Handgun_SMG_AA04'
  }

  const outstaffList = Object.entries(lemon.model).map(([key, outfit]) => {
    if (!outfit || key === "kind" || key === "cold_arm") return
    if (typeof outfit === 'object') {
      return outfit.flavour
    } else if (typeof outfit === 'string') {
      return outfit
    }
  }).filter(o => o)
  console.log(outstaffList)
  const outstaff = scene.getObjectByName('Armature')?.children

  outstaff?.forEach(os => {
    if (os.type == 'Bone') return;
    if (outstaffList.includes(os.name)) return
    os.visible = false;
  })

  return scene;
}