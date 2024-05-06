export interface TimReq {
    detail: TimReqData;
}

export interface TimReqData {
    nama_panitia?: string;
    email?: string;
    nik?: string;
    kabupatenId?: string;
    kecamatanId?: string;
    kelurahanId?: string;
    tpsId?: string;
    no_telp?: string;
    role?: string;
    password?: string;
}