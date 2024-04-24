export interface KabupatenResp {
    id: string;
    kd_kabupaten?: string;
    kabupaten?: string;
    jumlah_kursi?: number;
  }  

  export interface DropdownItems {
    name?: string;
    code?: string;
  }  

  export interface KabupatenList {
    kabupaten: Array<KabupatenResp>;
  }