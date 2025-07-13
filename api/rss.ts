import Parser from 'rss-parser';
import { VercelRequest, VercelResponse } from '@vercel/node';

// 定义类型
interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    isoDate?: string;
    feedTitle: string;
    feedUrl: string;
    creator?: string;
    image?: string;
}

// 从环境变量获取URLs
const RSS_URLS = process.env.RSS_URLS?.split(';') || [];
if (RSS_URLS.length === 0) {
    throw new Error('请配置RSS_URLS环境变量');
}

// 创建解析器实例
const parser = new Parser();

// 获取单个RSS源内容
async function fetchFeed(feedUrl: string): Promise<RssItem[]> {
    try {
        const feed = await parser.parseURL(feedUrl);
        console.log(feed)
        return feed.items.map(item => ({
            title: item.title || '无标题',
            link: item.link || feedUrl,
            pubDate: item.pubDate || '',
            isoDate: item.isoDate,
            feedTitle: feed.title || new URL(feedUrl).hostname,
            feedUrl,
            creator: item.creator,
            image: feed.image?.url
        }));
    } catch (err) {
        console.error(`[ERROR] 解析 ${feedUrl} 失败:`);
        return [];
    }
}

// 获取所有源并合并排序
async function getItems(): Promise<RssItem[]> {
    // 并行获取所有RSS源
    const fetchPromises = RSS_URLS.map(url => fetchFeed(url));
    const results = await Promise.allSettled(fetchPromises);

    // 合并所有成功的项目
    const allItems = results.reduce<RssItem[]>((acc, result) => {
        if (result.status === 'fulfilled') {
            acc.push(...result.value);
        }
        return acc;
    }, []);

    // 按日期排序 (优先使用isoDate)
    const sortedItems = allItems.sort((a, b) => {
        const dateA = a.isoDate ? new Date(a.isoDate) : a.pubDate ? new Date(a.pubDate) : new Date(0);
        const dateB = b.isoDate ? new Date(b.isoDate) : b.pubDate ? new Date(b.pubDate) : new Date(0);
        return dateB.getTime() - dateA.getTime(); // 降序排列
    });
    return sortedItems;
}
export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const response = await getItems()
        res.status(200).json(response);
    } catch (error) {
        res.status(200).json({});
    }
};