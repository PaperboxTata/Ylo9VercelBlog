import axios from 'axios';
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
export const useRssStore = defineStore('rss', () => {
    const cache = ref<RssItem[]>([])
    const loadFinish = ref<boolean>(false)

    const getRssData = async () => {
        if (loadFinish.value)
            return cache.value

        try {
            const response = await axios.get("/api/rss")
            cache.value = response.data
            loadFinish.value = true
            return cache.value
        } catch (error) {
            console.log(error)
        }
        return []
    }

    return {
        cache,
        loadFinish,
        getRssData
    }
})