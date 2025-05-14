import { writeFileSync } from 'fs';
import { getParams } from "./src/utils/service/music163EncSecKey.js"
const { params, encSecKey } = getParams(process.env.MUSIC163_USER_ID)
const body = new URLSearchParams({
  params,
  encSecKey
}).toString()
const config = {
  rewrites: [
    {
      source: "/bilibili/like",
      destination: `https://api.bilibili.com/x/space/like/video?vmid=${process.env.BILIBILI_USER_ID}`,
      has: [
        {
          type: "header",
          key: "referer",
          value: "https://www.bilibili.com/"
        }
      ]
    },
    {
      source: "/bilibili/image/:path*",
      destination: `http://i2.hdslb.com/bfs/archive/:path*`,
      has: [
        {
          type: "header",
          key: "referer",
          value: "https://www.bilibili.com/"
        }
      ]
    },
    {
      source: "/music163/history",
      destination: 'https://music.163.com/weapi/v1/play/record',
      has: [
        {
          type: "header",
          key: "referer",
          value: "https://music.163.com/"
        },
        {
          type: "header",
          key: "Content-Type",
          value: "application/x-www-form-urlencoded"
        },
        {
          type: "header",
          key: "Content-Length",
          value: Buffer.byteLength(body).toString()
        },
        {
          type: "query",
          key: "body",
          value: body
        },
      ]
    },
  ]
};

writeFileSync('vercel.json', JSON.stringify(config, null, 2));