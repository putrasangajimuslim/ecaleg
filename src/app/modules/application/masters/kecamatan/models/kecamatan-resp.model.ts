export interface KecamatanResp extends KabupatenRelationResp {
    id: string;
    kecamatan?: string;
    kode_kecamatan?: string;
    jumlah_dpt?: number;
}

export interface KabupatenRelationResp {
    id_kabupaten?: string;
    nama_kabupaten?: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface KecamatanList {
    kecamatan: Array<KecamatanResp>;
}
