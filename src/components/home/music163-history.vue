<script lang="ts" setup>
import { Music163Service } from '@/api';
import { onMounted, ref } from 'vue';
import { PlayCircleOutlined } from '@ant-design/icons-vue';
import APlayer from "../APlayer.vue"
type MusicType = {
    name: string,
    artist: string,
    url: string,
    cover: string,
    id: number
};
const switchMusicIndex = ref<number>()
const switchMusic = (id: number) => {
    switchMusicIndex.value = data.value.map(x => x.id).indexOf(id)
}
const data = ref<MusicType[]>([])
onMounted(async () => {
    const respone = await Music163Service.getMusic163History()
    data.value = respone.weekData.filter(x => x.song.privilege.fee == 0).map(x => {
        return {
            name: x.song.name,
            artist: x.song.ar.map(x => x.name).join('/'),
            id: x.song.id,
            url: "https://music.163.com/song/media/outer/url?id=" + x.song.id + ".mp3",
            cover: x.song.al.picUrl
        }
    })
})
</script>
<template>
    <APlayer :audioList="data" :switchMusicIndex="switchMusicIndex" v-if="data.length > 0" />
    <div class="page-content-item">
        <div class="page-content-title">🎧️</div>
        <div style="max-height: 125px;overflow-y: scroll;">
            <a-row :gutter="[8, 2]">
                <a-col :span="12" v-for="item in data">
                    <a-row style="cursor: pointer;" @click="switchMusic(item.id)">
                        <a-col :span="2">
                            <PlayCircleOutlined />
                        </a-col>
                        <a-col :span="16">
                            <span class="music163-text" style="font-size: small;">
                                {{ item.name }}
                            </span>
                        </a-col>
                        <a-col :span="6" class="music163-text">
                            {{ item.artist }}
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<style>
.music163-text {
    font-size: smaller;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;

}
</style>