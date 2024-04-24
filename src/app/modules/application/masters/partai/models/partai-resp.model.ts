export interface PartaiResp {
    id: string;
    partai?: string;
    logo?: string;
    keterangan?: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}
export interface PartaiList {
    partai: Array<PartaiResp>;
}
