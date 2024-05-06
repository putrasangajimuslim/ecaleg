import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { KabupatenResp } from 'src/app/modules/application/masters/kabupaten/models/kabupaten-resp.model';
import { KecamatanResp } from 'src/app/modules/application/masters/kecamatan/models/kecamatan-resp.model';
import { KelurahanResp } from 'src/app/modules/application/masters/kelurahan/models/kelurahan-resp.model';
import { TimReq, TimReqData } from 'src/app/modules/application/tim/models/tim-req.model';
import {
    DropdownItems,
    TimResp,
} from 'src/app/modules/application/tim/models/tim-resp.model';
import { TimService } from 'src/app/modules/application/tim/services/tim.service';
import { TpsResp } from 'src/app/modules/application/tps/models/tps-resp.model';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-tim-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './tim-shared.component.html',
    styleUrl: './tim-shared.component.scss',
})
export class TimSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: TimResp;

    title: string;
    btnTitle: string;

    userId: string = '';
    name: string = '';
    email: string = '';
    nik: string = '';
    id_kabupaten: string = '';
    id_kecamatan: string = '';
    id_kelurahan: string = '';
    kode_tps: string = '';
    no_telp: string = '';
    roles: string = '';
    password: string = '';

    isAdmin: boolean = false;
    isUser: boolean = false;
    isShowRequired: boolean = true;

    menuKeys = Constant.menuKeys.tim;

    timList: TimResp[] = [];
    kabupatenList: KabupatenResp[] = [];
    kecamatanList: KecamatanResp[] = [];
    kelurahanList: KelurahanResp[] = [];
    tpsList: TpsResp[] = [];
    dropdownItemsRoles: DropdownItems[] = [
        {
            code: 'superadmin',
            name: 'Superadmin',
        },
        {
            code: 'admin',
            name: 'Admin',
        },
        {
            code: 'saksi',
            name: 'Saksi',
        },
    ];
    dropdownItemsKabupaten: DropdownItems[] = [];
    dropdownItemsKecamatan: DropdownItems[] = [];
    dropdownItemsKelurahan: DropdownItems[] = [];
    dropdownItemsTPS: DropdownItems[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private timService: TimService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getTim();
        this.getKabupaten();
        this.getKecamatan();
        this.getKelurahan();
        this.getTPS();
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.userId, this.menuKeys);
        this.router.navigate(['tim/panitia']);
    }

    checkRoleUser(event: any) {
        this.roles = event.value.code;

        // this.formGroup.removeControl('id_kabupaten');
        // this.formGroup.removeControl('id_kecamatan');
        // this.formGroup.removeControl('id_kelurahan');
        // this.formGroup.removeControl('id_tps');
        
        // if (this.roles === 'admin') {
        //     this.isAdmin = true;
        //     this.isUser = false;
        //     this.formGroup.addControl(
        //         'id_kabupaten',
        //         new FormControl('', Validators.required)
        //     );
        //     this.formGroup.addControl(
        //         'id_kecamatan',
        //         new FormControl('', Validators.required)
        //     );

        //     this.formGroup.addControl(
        //         'id_kelurahan',
        //         new FormControl('', Validators.required)
        //     );

        //     this.formGroup.addControl(
        //         'id_tps',
        //         new FormControl('', Validators.required)
        //     );

        //     this.formGroup.addControl(
        //         'password',
        //         new FormControl('', Validators.required)
        //     );
        // } else {
        //     this.isAdmin = false;
        //     this.isUser = true;

        //     this.formGroup.addControl(
        //         'id_kabupaten',
        //         new FormControl('', Validators.required)
        //     );
        //     this.formGroup.addControl(
        //         'id_kecamatan',
        //         new FormControl('', Validators.required)
        //     );
        //     this.formGroup.addControl(
        //         'id_kelurahan',
        //         new FormControl('', Validators.required)
        //     );
        //     this.formGroup.addControl(
        //         'id_tps',
        //         new FormControl('', Validators.required)
        //     );

        //     this.formGroup.addControl(
        //         'password',
        //         new FormControl('', Validators.required)
        //     );
        // }

        // this.formGroup.patchValue({
        //     id_kabupaten: {name: '0', code: '0'},
        //     id_kecamatan: {name: '0', code: '0'},
        //     id_kelurahan: {name: '0', code: '0'},
        //     id_tps: {name: '0', code: '0'},
        //     password: "",
        // });
    }

    getTim() {
        this.timService.getData().subscribe({
            next: (resp) => {
                this.timList = resp?.data ?? [];

                this.fillForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.fillForm();
            },
        });
    }

    getKabupaten() {
        this.timService.getDataKabupaten().subscribe({
            next: (resp) => {
                this.kabupatenList = resp?.data ?? [];
                this.kabupatenList.forEach((element) => {
                    this.dropdownItemsKabupaten.push({
                        name: element.nama_kabupaten,
                        code: element.id.toString(),
                    });
                });
                this.fillForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.fillForm();
            },
        });
    }

    getKecamatan() {
        this.timService.getDataKecamatan().subscribe({
            next: (resp) => {
                this.kecamatanList = resp?.data ?? [];
                this.kecamatanList.forEach((element) => {
                    this.dropdownItemsKecamatan.push({
                        name: element.nama_kecamatan,
                        code: element.id.toString(),
                    });
                });
                this.fillForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.fillForm();
            },
        });
    }

    getKelurahan() {
        this.timService.getDataKelurahan().subscribe({
            next: (resp) => {
                this.kelurahanList = resp?.data ?? [];
                this.kelurahanList.forEach((element) => {
                    this.dropdownItemsKelurahan.push({
                        name: element.nama_kelurahan,
                        code: element.id.toString(),
                    });
                });
                this.fillForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.fillForm();
            },
        });
    }

    getTPS() {
        this.timService.getDataTPS().subscribe({
            next: (resp) => {
                this.tpsList = resp?.data ?? [];
                this.tpsList.forEach((element) => {
                    this.dropdownItemsTPS.push({
                        name: element.kode_tps + '-' + element.nama_tps,
                        code: element.id.toString(),
                    });
                });
                this.fillForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.fillForm();
            },
        });
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            nik: new FormControl('', Validators.required),
            id_kabupaten: new FormControl('', Validators.required),
            id_kecamatan: new FormControl('', Validators.required),
            id_kelurahan: new FormControl('', Validators.required),
            id_tps: new FormControl('', Validators.required),
            no_telp: new FormControl('', Validators.required),
            roles: new FormControl('', Validators.required),
            password: new FormControl(''),
        });
    }

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addTim?.toLocaleLowerCase()
        ) {
            this.title = Constant.TimShared.addTitle;
            this.btnTitle = Constant.TimShared.btnTitleAdd;

            this.formGroup.addControl(
                'password',
                new FormControl('', Validators.required)
            );
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editTim?.toLocaleLowerCase()
        ) {
            // this.formGroup.removeControl('id_kabupaten');

            this.title = Constant.TimShared.editTitle;
            this.btnTitle = Constant.TimShared.btnTitleEdit;
            this.userId = this.dataPars['data'].id ?? '';
            this.name =
                this.dataPars['data'].panitia_profile.nama_panitia ?? '';
            this.email = this.dataPars['data'].email ?? '';
            this.nik = this.dataPars['data'].panitia_profile.nik ?? '';
            this.id_kabupaten =
                this.dataPars['data'].panitia_profile.kabupatenId ?? '';
            this.id_kecamatan =
                this.dataPars['data'].panitia_profile.kecamatanId ?? '';
            this.id_kelurahan =
                this.dataPars['data'].panitia_profile.kelurahanId ?? '';
            this.kode_tps =
                this.dataPars['data'].panitia_profile.tpsId ?? '';
            this.no_telp = this.dataPars['data'].panitia_profile.no_telp ?? '';
            this.roles = this.dataPars['data'].panitia_profile.role ?? '';
            this.password = this.dataPars['data'].password ?? '';
            this.isShowRequired = false;

            const selectedRoles =
                this.dropdownItemsRoles.find(
                    (item) => item.code === this.roles
                ) || null;

            const selectedKabupaten =
                this.dropdownItemsKabupaten.find(
                    (item) => item.code === this.id_kabupaten
                ) || null;

            const selectedKecamatan =
                    this.dropdownItemsKecamatan.find(
                        (item) => item.code === this.id_kecamatan
                    ) || null;

            const selectedKelurahan =
                    this.dropdownItemsKelurahan.find(
                        (item) => item.code === this.id_kelurahan
                    ) || null;

            // const zero = 0;
            const selectedTPS =
                    this.dropdownItemsTPS.find(
                        (item) => item.code === this.kode_tps
                    ) || null;

            // if (this.roles === 'admin') {
            //     this.isAdmin = true;
            //     this.isUser = false;

            //     this.formGroup.addControl(
            //         'id_kabupaten',
            //         new FormControl('', Validators.required)
            //     );
                
            // } else {
            //     this.isAdmin = false;
            //     this.isUser = true;

            //     this.formGroup.addControl(
            //         'id_kabupaten',
            //         new FormControl('', Validators.required)
            //     );

            //     this.formGroup.addControl(
            //         'id_kecamatan',
            //         new FormControl('', Validators.required)
            //     );

            //     this.formGroup.addControl(
            //         'id_kelurahan',
            //         new FormControl('', Validators.required)
            //     );
            //     this.formGroup.addControl(
            //         'id_tps',
            //         new FormControl('', Validators.required)
            //     );
            // }

            this.formGroup.patchValue({
                name: this.name,
                email: this.email,
                nik: this.nik,
                roles: selectedRoles ?? '',
                id_kabupaten: selectedKabupaten ?? '',
                id_kecamatan: selectedKecamatan ?? '',
                id_kelurahan: selectedKelurahan ?? '',
                id_tps: selectedTPS ?? '',
                no_telp: this.no_telp,
            });
        }
    }

    uploadFile(event) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.formGroup.patchValue({
                    logo: file,
                });
            };
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;

            const newRequest: TimReqData = {
                nama_panitia: formData.name,
                email: formData.email,
                nik: formData.nik,
                kabupatenId: formData.id_kabupaten.code,
                kecamatanId: formData.id_kecamatan.code,
                kelurahanId: formData.id_kelurahan.code,
                tpsId: formData.id_tps.code,
                no_telp: formData.no_telp,
                role: formData.roles.code,
                password: formData.password ? formData.password: this.password,
            };
            
            // if (formData.id_kabupaten) {
            //     newRequest.kabupatenId = formData.id_kabupaten.code;
            // }

            // if (formData.id_kecamatan) {
            //     newRequest.kecamatanId = formData.id_kecamatan.code;
            // }

            // if (formData.id_kelurahan) {
            //     newRequest.kelurahanId = formData.id_kelurahan.code;
            // }

            // if (formData.id_tps) {
            //     newRequest.tpsId = formData.id_tps.code;
            // }

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addTim?.toLocaleLowerCase()
            ) {
                this.timService.add(newRequest).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Menyimpan Data',
                        });
                        setTimeout(() => {
                            this.onClickBackButton();
                        }, 800);
                    },
                    error: (err) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Maaf',
                            detail: 'Gagal Menyimpan Data',
                        });
                    },
                });
            } else if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.editTim?.toLocaleLowerCase()
            ) {
                const newReqEdit: TimReq = {
                    detail: newRequest
                }

                this.timService.edit(this.userId, this.email !== formData.email || this.password !== formData.password ? newRequest: newReqEdit).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Merubah Data',
                        });
                        setTimeout(() => {
                            this.onClickBackButton();
                        }, 800);
                    },
                    error: (err) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Maaf',
                            detail: 'Gagal Merubah Data',
                        });
                    },
                });
            }
        }
    }
}
