import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from "axios"

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const response = await axios.get(`${process.env.NOTION_PAGE_JSON_URL}`, {
            headers: {
                'Accept': 'application/json', // 明确要求 JSON 格式
            },
        });

        const jsonData = response.data;
        res.status(200).json(jsonData);
    } catch (error) {
        res.status(200).json({ });
    }
};