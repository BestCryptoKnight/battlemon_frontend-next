import { writable } from "svelte/store";
import type { Model } from "./model"

interface ThreeProps {
  init(model: Model): Promise<void>
  model: Model
  changed: boolean
}

const threeStore = writable<ThreeProps>({
  init: initStore,
  model: null,
  changed: false
})

async function initStore(model: Model): Promise<void> {
  threeStore.update(s => {
    return {
      ...s,
      model
    }
  })
}

export default threeStore