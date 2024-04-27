export interface TpsResp {
    id: string;
    kode_tps: string;
    nama_tps: string;
    max_surat_suara: string;
}

export interface TpsList {
    data: Array<TpsResp>;
}
