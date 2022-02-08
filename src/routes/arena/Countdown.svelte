<script lang="ts">
import { onMount } from 'svelte'
let c = 5400
let h: string = ''
let m: string = ''
let s: string = ''

const updateTimer = () => {
  c -= 1
  s = Math.floor(c % 60) + ''
  if (s.length < 2) s = '0' + s
  m = Math.floor((c/60) % 60) + ''
  if (m.length < 2) m = '0' + m
  h = Math.floor((c/(60*60))) + ''
  if (h.length < 2) h = '0' + h
}

updateTimer()
onMount(() => {
  setInterval(updateTimer, 1000);
})
</script>

{h}:{m}:{s}