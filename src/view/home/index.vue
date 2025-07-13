<script lang="ts" setup>
import { onMounted } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
onMounted(async () => {
    
})
</script>
<template>
    <div>
        <a-flex vertical justify="space-between" class="page-content-item">
            <div></div>
            <a-row>
                <a-col :span="2"></a-col>
                <a-col :lg="{ span: 12 }" :xs="{ span: 24 }" style="display: flex;flex-direction: column;">
                    <a-flex gap="middle" vertical>
                        <a-image width="175px" :preview="false" src="/avatar.jpg"
                            style="border-radius: 100%;" />
                        <div style="font-size:xx-large;font-weight:400;">Hi👋~欢迎~</div>
                        <div style="font-size:xx-large;font-weight:300;">这里是Ylo9的博客~🍀</div>
                        <div style="font-size:x-large;font-weight:200;">菜鸡开发者修行中...</div>
                        <div style="font-size:medium;font-weight:100;">学习 / 记录 / 分享</div>
                        <div>🍚🥢</div>
                    </a-flex>
                </a-col>
            </a-row>
            <div class="float-animation" style="display: flex;justify-content: center;">
                <DownOutlined/>
            </div>
        </a-flex>
        
    </div>
</template>
<style>
.float-animation {
    animation: mymove 1.5s infinite;
    -webkit-animation: mymove 1.5s infinite;
}

@keyframes mymove {
    0% {
        transform: translate(0px, 0px);
    }

    50% {
        transform: translate(0px, -10px);
    }

    100% {
        transform: translate(0px, 0px);
    }

}
</style>