export interface LoginResp {
    id: string;
    email: string;
    password: string;
    role: string;
    akun: AkunResp;
    token: string;
}

export interface AkunResp {
    email: string;
    id: string;
    isActive: boolean;
    profile: ProfileResp;
}

export interface ProfileResp {
    id: string;
    isActive: boolean;
    nama_panitia: string;
    nik: string;
    no_telp: string;
    panitiaId: string;
    role: string;
    updatedAt: string;
    createdAt: string;
}