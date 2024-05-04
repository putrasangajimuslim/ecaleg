export interface CalonReq {
    nama_calon: string;
    foto: File;
    partaiId: string;
    kabupatenId: string;
}

export interface NewCalonReqArr {
    c1_photo: File,
    suara_calon: Array<NewArray>
}

export interface NewArray {
    calonId: string;
    total_suara: string;
}