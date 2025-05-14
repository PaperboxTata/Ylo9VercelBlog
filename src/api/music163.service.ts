import { http } from "./http"
export const Music163Service = {
    /**
    * 获取网易云音乐历史
    */
    getMusic163History: async (): Promise<GetMusic163HistoryOutput> => {
        return await http.get<void, GetMusic163HistoryOutput>('music163/history')
    },
}
export interface GetMusic163HistoryOutput {
    // allData: AllDatum[];
    weekData: Data[];
    code: number;
}

export interface Data {
    playCount: number;
    score: number;
    song: Song;
}

export interface Song {
    name: string;
    mainTitle: null | string;
    additionalTitle: null | string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia: string[];
    pop: number;
    st: number;
    rt: Rt | null;
    fee: number;
    v: number;
    crbt: null;
    cf: string;
    al: Al;
    dt: number;
    h: L | null;
    m: L;
    l: L;
    sq: L | null;
    hr: L | null;
    a: null;
    cd: string;
    no: number;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData: OriginSongSimpleData | null;
    tagPicList: null;
    resourceState: boolean;
    version: number;
    songJumpInfo: null;
    entertainmentTags: null;
    awardTags: null;
    displayTags: null;
    single: number;
    noCopyrightRcmd: NoCopyrightRcmd | null;
    rtype: number;
    rurl: null;
    mst: number;
    cp: number;
    mv: number;
    publishTime: number;
    privilege: Privilege;
    tns?: string[];
}

export interface Al {
    id: number;
    name: string;
    picUrl: string;
    tns: string[];
    pic_str?: string;
    pic: number;
}

export interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
}

export interface L {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

export interface NoCopyrightRcmd {
    type: number;
    typeDesc: string;
    songId: null;
    thirdPartySong: null;
    expInfo: null;
}

export interface OriginSongSimpleData {
    songId: number;
    name: string;
    artists: AlbumMeta[];
    albumMeta: AlbumMeta;
}

export interface AlbumMeta {
    id: number;
    name: string;
}

export interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: Level;
    playMaxBrLevel: Level;
    downloadMaxBrLevel: Level;
    plLevel: Level;
    dlLevel: Level;
    flLevel: Level;
    rscl: null;
    freeTrialPrivilege: FreeTrialPrivilege;
    rightSource: number;
    chargeInfoList: ChargeInfoList[];
    code: number;
    message: null;
    plLevels: null;
    dlLevels: null;
    ignoreCache: null;
}

export interface ChargeInfoList {
    rate: number;
    chargeUrl: null;
    chargeMessage: null;
    chargeType: number;
}

export enum Level {
    Exhigh = "exhigh",
    Higher = "higher",
    Hires = "hires",
    Lossless = "lossless",
    None = "none",
    Standard = "standard",
}

export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType: null;
    cannotListenReason: number | null;
    playReason: null;
    freeLimitTagType: null;
}

export enum Rt {
    Empty = "",
    The600902000000619124 = "600902000000619124",
    The600902000000619929 = "600902000000619929",
}