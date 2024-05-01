import { KabupatenResp } from "../../masters/kabupaten/models/kabupaten-resp.model";

export interface CalonResp {
    id: string;
    nama_calon: string;
    id_partai: string;
    kabupaten: Array<KabupatenResp>
    foto: File;
    id_jadwal: string;
}


export interface DropdownItems {
    name?: string;
    code?: string;
}

export interface CalonList {
    data: Array<CalonResp>;
}
