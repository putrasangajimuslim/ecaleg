export interface TimPemenanganResp {
    id: string;
    name: string;
    nik: string;
    no_hp: string;
    alamat: string;
    calonId: string;
  }  

  export interface DropdownItems {
    name?: string;
    code?: string;
  }  

  export interface TimPemenanganList {
    data: Array<TimPemenanganResp>;
  }