<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});
</script>
<template>
    <a-row justify="center" align="middle">
        <a-spin tip="月光光，心慌慌..." :indicator="indicator" />
    </a-row>
</template>