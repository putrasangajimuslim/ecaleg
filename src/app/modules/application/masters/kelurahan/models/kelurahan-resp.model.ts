export interface KelurahanResp {
    forEach(arg0: (element: any) => void): unknown;
    id: string;
    kecamatanId: string;
    nama_kecamatan: string;
    nama_kelurahan: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
}
export interface KelurahanList {
    data: Array<KelurahanResp>;
}
