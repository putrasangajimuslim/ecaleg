export interface KelurahanResp {
    id: string;
    id_kecamatan?: string;
    nama_kecamatan?: string;
    kelurahan?: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}
export interface KelurahanList {
    kelurahan: Array<KelurahanResp>;
}
