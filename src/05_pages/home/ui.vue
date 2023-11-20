<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import KinoMaker from '@/01_shared/modules/kino-maker'
import videpMp4 from '@/01_shared/assets/videos/production_id_3981776_240p.mp4'

defineOptions({ name: 'home' })

const onStatusUpdate = (statusData: any) => {
  // console.log(statusData);
}

const kinoMaker = new KinoMaker({
  container: '.video-wrapper',
  url: videpMp4,
  onupdate: onStatusUpdate
}, [
  {
    showAt: 1,
    hideAt: 9,
    block: `<div class="block-1" style="border: 10px solid; color: orange; font-size: 30px; padding: 50px;">some block</div>`,
    params: {
      x: 40,
      y: 40,
    },
  },
  {
    showAt: 5,
    hideAt: 6,
    block: `<div class="block-2" style="border: 10px solid; color: blue; font-size: 30px; padding: 50px;">fast block</div>`,
    params: {
      x: 70,
      y: 70,
    },
  },
])

onMounted(() => {
  kinoMaker.init()
})
onBeforeUnmount(() => {
  kinoMaker.unmount()
})

</script>

<template>
  <div>
    video-wrapper:
    <button @click="kinoMaker.start()">start</button>
    <button @click="kinoMaker.stop()">stop</button>
    <div class="video-wrapper"></div>
  </div>
</template>
