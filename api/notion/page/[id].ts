import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from "axios"

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const id = req.query.id as string;
        const response = await axios.post(
            'https://www.notion.so/api/v3/loadCachedPageChunkV2',
            {
                page: {
                    id
                },
                cursor: {
                    stack: []
                },
                verticalColumns: false,
                omitExistingRecordVersions: []
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                    'Notion-Version': process.env.NOTION_VERSION
                },
            }
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.error("请求失败:", error);
        res.status(500).json({ error: "请求Notion API 失败" });
    }
};