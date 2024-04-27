export interface KabupatenResp {
    id?: string;
    kode_kabupaten: string;
    nama_kabupaten: string;
    jumlah_DPT: number;
  }  

  export interface DropdownItems {
    name?: string;
    code?: string;
  }  

  export interface KabupatenList {
    data: Array<KabupatenResp>;
  }