import { http } from "./http"
export const NotionService = {
    /**
     * 获取notion数据库
     */
    getNotionDatabase: async (): Promise<any> => {
        return await http.get<any, any>(`notion/databases/${import.meta.env.VITE_NOTION_DATABASE_ID}`)
    },
    /**
     * 获取notionPage
     * @param {string} pageId
     * @returns {GetNotionPageOutput}
     */
    getNotionPage: async (pageId: string): Promise<GetNotionPageOutput> => {
        return await http.post<void, GetNotionPageOutput>(`/notion/page/${pageId}`)
    }
}
export interface GetNotionPageInput {
    page: Page;
    cursor: Cursor;
    verticalColumns: boolean;
    omitExistingRecordVersions: any[];
}
export interface Cursor {
    stack: [];
}
export interface Page {
    id: string;
}
export interface GetNotionPageOutput {
    cursors: [];
    recordMap: RecordMap;
    spaceId: string;
    spaceShortId: string;
}
export interface RecordMap {
    block: any;
}