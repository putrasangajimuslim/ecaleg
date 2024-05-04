export interface SuaraResp {
    id: string;
    suara_calons: Array<suaraRespCalons>;
    url_c1: string;
    input_by: string;
    name_kabupaten: string;
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

export interface suaraRespCalons {
    calonId: string;
    total_suara: string;
    suara_id: string;
    calon: calonSuaraResp;
}

export interface calonSuaraResp {
    partaiId: string;
    kabupatenId: string;
    nama_calon: string;
}