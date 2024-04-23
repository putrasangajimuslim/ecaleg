export interface AddKecamatanResp {
    id: string;
    id_kabupaten?: string;
    nama_kab?: string;
    kode_kecamatan?: string;
    kecamatan?: string;
    jumlahdpt?: number;
  }  

  export interface newKecamatanResp {
    name?: string;
    code?: string;
  }  

export interface KecamatanList {
  kecamatan: Array<AddKecamatanResp>;
}