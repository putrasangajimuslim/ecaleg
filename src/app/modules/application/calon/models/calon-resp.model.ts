export interface CalonResp {
    id: string;
    nama_calon: string;
    id_partai: string;
    id_kabupaten: string;
    foto: File;
    id_jadwal: string;
}


export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface CalonList {
    data: Array<CalonResp>;
}
