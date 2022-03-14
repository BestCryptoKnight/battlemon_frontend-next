import { Model } from '../../../src/components/threejs/model'
import lemons from '../../../src/components/threejs/lemons'
const lemonSettings = Object.values(lemons)[2]

const model = new Model({
    dom: 'threejs',
    rightWeapon: '/constructor/assets/models/turel.glb',
    leftWeapon: '/constructor/assets/models/turel.glb',
    cam: 12,
    globalScale: 1,
    translateY: -1.27,
    background: '/constructor/assets/postaments/red.jpg',
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
