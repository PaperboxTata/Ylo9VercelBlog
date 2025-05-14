import { http } from "./http"
export const BilibiliService = {
    /**
     * 获取b站点赞视频
     * @returns {GetBilibiliLikeOutput}
     */
    getBilibiliLike: async (): Promise<GetBilibiliLikeOutput> => {
        return await http.get<any, any>(`bilibili/like`)
    },
}
export interface GetBilibiliLikeOutput {
    code: number;
    message: string;
    ttl: number;
    data: GetBilibiliLikeData;
}
export interface GetBilibiliLikeData {
    list: GetBilibiliLikeDataItem[];
}
export interface GetBilibiliLikeDataItem {
    aid: number;
    videos: number;
    tid: number;
    tname: string;
    copyright: number;
    pic: string;
    title: string;
    pubdate: number;
    ctime: number;
    desc: string;
    state: number;
    duration: number;
    mission_id: number;
    rights: { [key: string]: number };
    owner: GetBilibiliLikeDataItemOwner;
    stat: { [key: string]: number };
    dynamic: string;
    cid: number;
    dimension: GetBilibiliLikeDataItemDimension;
    season_id: number;
    short_link_v2: string;
    first_frame: string;
    pub_location: string;
    cover43: string;
    tidv2: number;
    tnamev2: string;
    pid_v2: number;
    pid_name_v2: string;
    bvid: string;
    inter_video: boolean;
    resource_type: string;
    subtitle: string;
    enable_vt: number;
}
export interface GetBilibiliLikeDataItemDimension {
    width: number;
    height: number;
    rotate: number;
}

export interface GetBilibiliLikeDataItemOwner {
    mid: number;
    name: string;
    face: string;
}