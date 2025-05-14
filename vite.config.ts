import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';


export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    // server: {
    //   proxy: {
    //     '/api/notion': {
    //       target: 'https://api.notion.com/v1',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api\/notion/, ''),
    //       headers: {
    //         'Authorization': `Bearer ${env.VITE_NOTION_TOKEN}`,
    //         'Notion-Version': env.VITE_NOTION_VERSION || '2022-02-22'
    //       },
    //     },
    //     '/page/notion': {
    //       target: 'https://www.notion.so/api/v3',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/page\/notion/, '')
    //     },
    //     '/bilibili/like': {
    //       target: `https://api.bilibili.com/x/space/like/video?vmid=${env.VITE_BILIBILI_USER_ID}`,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/bilibili\/like/, ''),
    //       headers: {
    //         'referer': 'https://www.bilibili.com/',
    //       },
    //     },
    //     '/bilibili/image': {
    //       target: `http://i2.hdslb.com/bfs/archive`,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/bilibili\/image/, ''),
    //       headers: {
    //         'referer': 'https://www.bilibili.com/',
    //       },
    //     },
    //     '/music163/history': {
    //       target: `https://music.163.com/weapi/v1/play/record`,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/music163\/history/, ''),
    //       headers: {
    //         'referer': 'https://music.163.com/',
    //       },
    //       configure: (proxy) => {
    //         proxy.on('proxyReq', (proxyReq) => {
    //           const { params, encSecKey } = getParams(env.VITE_MUSIC163_USER_ID)
    //           proxyReq.method = 'POST'
    //           proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    //           const body = new URLSearchParams({
    //             params,
    //             encSecKey
    //           }).toString()
    //           proxyReq.setHeader('Content-Length', Buffer.byteLength(body))
    //           proxyReq.write(body)
    //         })
    //       },
    //     }
    // },
    // }
  }
})

