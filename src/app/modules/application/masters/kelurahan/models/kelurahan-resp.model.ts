export interface AddKelurahanResp {
    id: string;
    id_kecamatan?: string;
    nama_kec?: string;
    kelurahan?: string;
  }  

export interface KelurahanList {
  kelurahan: Array<AddKelurahanResp>;
}