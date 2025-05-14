import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from "axios";
import { getParams } from "../../utils/music163/encSecKey.js";

const { params, encSecKey } = getParams(process.env.MUSIC163_USER_ID as string);

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const response = await axios.post(
            'https://music.163.com/weapi/v1/play/record',
            new URLSearchParams({ params, encSecKey }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Referer': 'https://music.163.com/'
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error("请求失败:", error);
        res.status(500).json({ error: "请求网易云音乐 API 失败" });
    }
};