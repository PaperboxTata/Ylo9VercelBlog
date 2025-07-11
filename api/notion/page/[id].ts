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
            }
        )
        res.status(200).json(response.data);
    } catch (error) {
        res.status(200).json({  });
    }
};