import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from "axios"

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const response = await axios.get(
      'https://api.bilibili.com/x/space/like/video', {
      params: { vmid: process.env.BILIBILI_USER_ID },
      headers: { referer: 'https://www.bilibili.com/' }
    })
    res.status(200).json(response.data);
  } catch (error) {
    console.error("请求失败:", error);
    res.status(500).json({ error: "请求Bilibili API 失败" });
  }
};