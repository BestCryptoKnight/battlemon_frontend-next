import { Model } from '../../../src/components/threejs/model'
import type { LemonSettings } from '../../../src/components/threejs/lemons'

const params = new URLSearchParams(window.location.search)
const background: string = params.get('background')
const exo: string = params.get('exo') || ''
const cap: string = params.get('cap') || ''
const cloth: string = params.get('cloth') || ''
const eyes: string = params.get('eyes') || ''
const head: string = params.get('head') || ''
const teeth: string = params.get('teeth') || ''
const back: string = params.get('back') || ''

const lemonSettings: LemonSettings = {
  model: {
    exo,
    cap,
    cloth,
    eyes,
    head,
    teeth,
    back
  }
}

const model = new Model({
    dom: 'threejs',
    rightWeapon: '/constructor/assets/models/turel.glb',
    leftWeapon: '/constructor/assets/models/turel.glb',
    cam: 10,
    globalScale: 1.15,
    translateY: -1.43,
    background: `/constructor/assets/postaments/${background}.png`,
    rotate: false,
    callback: () => {
      let btn = document.createElement("button");
      btn.setAttribute("id", "download");
      btn.innerHTML = "Download";
      btn.onclick = function(){
        model.screenShot('file')
      }
      document.body.appendChild(btn);
    },
    lemonSettings
})
