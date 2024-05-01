export interface TimReq {
    detail: Array<TimReqData>;
}

export interface TimReqData {
    nama_panitia: string;
    email: string;
    nik: string;
    kabupatenId?: string;
    kecamatanId?: string;
    kelurahanId?: string;
    tpsId?: string;
    no_telp: string;
    roles: string;
    password: string;
}