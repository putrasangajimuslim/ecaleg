export interface SuaraResp {
    id: string;
    nama_calon: string;
    suara_calons: Array<suaraC>;
    id_calon: string
    url_c1: string;
    input_by: string;
    createdAt: string;
    updatedAt: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface SuaraList {
    data: Array<SuaraResp>;
}

export interface suaraC {
    calon: suaraCData;
    total_suara: string;
}

export interface suaraCData {
    nama_calon: string;
}