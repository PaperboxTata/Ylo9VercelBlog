<template>
    <div ref="playerRef"></div>
</template>

<script setup>
import APlayer from 'APlayer';
import 'APlayer/dist/APlayer.min.css';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const playerRef = ref()
let instance = undefined
const props = defineProps({
    fixed: {
        type: Boolean,
        default: true
    },
    mini: {
        type: Boolean,
        default: true
    },
    theme: {
        type: String,
        default: 'rgba(255,255,255,0.2)'
    },
    order: {
        type: String,
        default: 'random'
    },
    audioList: {
        type: Array,
        default: []
    },
    switchMusicIndex: {
        type: Number,
        default: 0
    }
})
watch(props, () => {
    console.log(props.switchMusicIndex)
    if (instance && props.switchMusicIndex != -1) {
        instance.list.switch(props.switchMusicIndex)
        instance.play()
    }
})
onMounted(() => {
    instance = new APlayer({
        container: playerRef.value,
        fixed: props.fixed,
        mini: props.mini,
        theme: props.theme,
        order: props.order,
        audio: props.audioList
    })
})
onBeforeUnmount(() => {
    instance.destroy()
})
</script>