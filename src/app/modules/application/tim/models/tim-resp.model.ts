export interface TimResp {
    id: string;
    name: string;
    email: string;
    nik: string;
    id_kabupaten: string;
    id_kecamatan: string;
    id_kelurahan: string;
    kode_tps: string;
    no_telp: string;
    roles: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
  }  

  export interface TimList {
    data: Array<TimResp>;
  }