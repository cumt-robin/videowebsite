export interface AjaxOption {
    url: string;
    method: string;
    async: boolean;
    data: Object;
    contentType: string;
}

export interface VOD {
    url: string;
    id: string;
    name: string;
    introduce: string;
    stills: Array<string>;
    previews: Array<string>;
    playUrl: string;
}

export interface VODColumn {
    name: string;
    vods: Array<VOD>;
}
