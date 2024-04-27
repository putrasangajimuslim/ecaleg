export interface PartaiResp {
    id: string;
    nama_partai: string;
    logo: File;
    keterangan: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}
export interface PartaiList {
    data: Array<PartaiResp>;
}
