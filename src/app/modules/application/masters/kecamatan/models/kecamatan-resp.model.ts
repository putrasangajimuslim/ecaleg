export interface KecamatanResp extends KabupatenRelationResp {
    id: string;
    nama_kecamatan: string;
    kode_kecamatan: string;
    jumlah_DPT: number;
}

export interface KabupatenRelationResp {
    kabupatenId?: string;
    nama_kabupaten?: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface KecamatanList {
    data: Array<KecamatanResp>;
}
