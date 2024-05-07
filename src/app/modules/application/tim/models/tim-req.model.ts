export interface TimReq {
    detail: TimReqData;
    email?: string;
    password?: string;
}

export interface TimReqData {
    email?: string;
    password?: string;
    nama_panitia?: string;
    nik?: string;
    kabupatenId?: string;
    kecamatanId?: string;
    kelurahanId?: string;
    tpsId?: string;
    no_telp?: string;
    role?: string;
}