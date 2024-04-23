export interface AddKabupatenResp {
    id: string;
    kodekab?: string;
    kabupaten?: string;
    jumlahdpt?: number;
  }  

  export interface newKabupatenResp {
    name?: string;
    code?: string;
  }  

  export interface KabupatenList {
    kabupaten: Array<AddKabupatenResp>;
  }