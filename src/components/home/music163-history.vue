<script lang="ts" setup>
import { Music163Service } from '@/api';
import { onMounted, ref } from 'vue';
import { PlayCircleOutlined } from '@ant-design/icons-vue';
type MusicType = {
    name: string,
    id: number,
    artist: string,
};
const data = ref<MusicType[]>([])
onMounted(async () => {
    const respone = await Music163Service.getMusic163History()
    data.value = respone.weekData.map(x => {
        return {
            name: x.song.name,
            id: x.song.id,
            artist: x.song.ar.map(x => x.name).join('/'),
        }
    })
})
</script>
<template>
    <div class="page-content-item">
        <div class="page-content-title">🎧️</div>
        <div style="max-height: 125px;overflow-y: scroll;">
            <a-row :gutter="[8, 2]">
                <a-col :span="12" v-for="item in data">
                    <a-row style="cursor: pointer;">
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