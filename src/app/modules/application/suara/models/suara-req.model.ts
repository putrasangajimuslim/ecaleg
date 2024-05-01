export interface CalonReq {
    nama_calon: string;
    foto: File;
    partaiId: string;
    kabupatenId: string;
}

export interface NewCalonReqArr {
    photo_c1: File,
    suara_calon: Array<NewArray>
}

export interface NewArray {
    calonId: string;
    total_suara: string;
}