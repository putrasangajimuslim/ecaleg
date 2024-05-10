export interface LoginFirstResp {
    akun: akun;
    token: string;
    isLogin: boolean;
}

export interface LoginFirstList {
    data: Array<LoginFirstResp>;
}

export interface akun {
    id: string;
    email: string;
    isActive: boolean;
    profileId: string;
    fullname: string;
}