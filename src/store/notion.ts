import { GetNotionPageDataOutput, NotionService } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useNotionStore = defineStore('notion', () => {
    const cache = ref<GetNotionPageDataOutput[]>([])
    const loadFinish = ref<boolean>(false)

    const getNotionPageData = async () => {
        if (loadFinish.value)
            return cache.value

        try {
            cache.value = await NotionService.getNotionPageData()
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
        getNotionPageData
    }
})