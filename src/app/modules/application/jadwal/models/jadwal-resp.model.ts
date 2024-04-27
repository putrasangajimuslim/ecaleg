export interface JadwalResp {
    id: string;
    jadwal: string;
    status: string;
    keterangan: string;
}

export interface DropdownItems {
    name?: string;
    code?: string;
  }  
  
export interface JadwalList {
    data: Array<JadwalResp>;
}
