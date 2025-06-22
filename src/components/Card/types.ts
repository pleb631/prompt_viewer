export interface ImageInfo{
    name: string;
    img_url?: string;
    tag: string;
}

export interface Group {
    name: string;
    tags: ImageInfo[];
}
export interface GroupProp {
    name: string;
    groups: Group[];
}