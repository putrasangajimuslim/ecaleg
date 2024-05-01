
export interface AbsenResp {
    id: string;
    user_id: string;
    foto: File;
    status_absen: string;
    lat: string;
    long: string;
}


export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface AbsenList {
    data: Array<AbsenResp>;
}
