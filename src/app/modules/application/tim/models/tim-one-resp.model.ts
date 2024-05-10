import { KabupatenResp } from "../../masters/kabupaten/models/kabupaten-resp.model";
import { KecamatanResp } from "../../masters/kecamatan/models/kecamatan-resp.model";
import { KelurahanResp } from "../../masters/kelurahan/models/kelurahan-resp.model";
import { TpsResp } from "../../tps/models/tps-resp.model";

export interface TimOneResp {
    id: string;
    email: string;
    isActive: boolean;
    panitia_profile: PanitiaProfile;
}

export interface DropdownItems {
    name?: string;
    code?: string;
  }  

  export interface TimOneList {
    data: Array<TimOneResp>;
  }

  export interface PanitiaProfile {
    id: string;
    panitiaId: string;
    nama_panitia: string;
    nik: string;
    kabupaten: KabupatenResp;
    kecamatan: KecamatanResp;
    kelurahan: KelurahanResp;
    tps: TpsResp;
  }