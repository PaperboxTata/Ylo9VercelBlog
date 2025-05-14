import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { PassThrough } from 'stream';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const path = req.query.path as string;
    const imageUrl = `http://i2.hdslb.com/bfs/archive/${path}`;

    const response = await axios.get(imageUrl, {
      responseType: 'stream',
      headers: {
        referer: 'https://www.bilibili.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);

    res.setHeader('Cache-Control', 'public, max-age=86400'); // 缓存1天

    const passThrough = new PassThrough();
    response.data.pipe(passThrough).pipe(res);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};