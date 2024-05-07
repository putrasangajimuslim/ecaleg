import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { DropdownItems, KelurahanResp } from 'src/app/modules/application/masters/kelurahan/models/kelurahan-resp.model';
import { TpsReq } from 'src/app/modules/application/tps/models/tps-req.model';
import { TpsResp } from 'src/app/modules/application/tps/models/tps-resp.model';
import { TpsService } from 'src/app/modules/application/tps/services/tps.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-tps-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './tps-shared.component.html',
    styleUrl: './tps-shared.component.scss',
})
export class TpsSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: TpsResp;
    title: string;
    btnTitle: string;

    tpsId: string = '';
    kodetps: string = '';
    namatps: string = '';
    max_surat_suara: string = '';
    kelurahanId: string = '';
    loading: boolean = false;

    menuKeys = Constant.menuKeys.tps;

    kelurahanList: KelurahanResp[] = [];
    dropdownItems: DropdownItems[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private tpservice: TpsService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getKelurahanDropdown();
    }

    getKelurahanDropdown() {
        this.tpservice.getKelurahan().subscribe({
            next: (resp) => {
                this.kelurahanList = resp?.data ?? [];
                this.kelurahanList.forEach((element) => {
                    this.dropdownItems.push({
                        name: element.nama_kelurahan,
                        code: element.id.toString(),
                    });
                });         
                
                this.buildForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.buildForm();
            },
        });
    }

    buildForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addTPS?.toLocaleLowerCase()
        ) {
            this.title = Constant.TPSShared.addTitle;
            this.btnTitle = Constant.TPSShared.btnTitleAdd;
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editTPS?.toLocaleLowerCase()
        ) {
            this.title = Constant.TPSShared.editTitle;
            this.btnTitle = Constant.TPSShared.btnTitleEdit;

            this.tpsId = this.dataPars['data'].id ?? '';
            this.kodetps = this.dataPars['data'].kode_tps ?? '';
            this.namatps = this.dataPars['data'].nama_tps ?? '';
            this.kelurahanId = this.dataPars['data'].kelurahanId ?? '';
            this.max_surat_suara = this.dataPars['data'].max_surat_suara ?? '';

            const selectedKelurahan = this.dropdownItems.find(item => item.code === this.kelurahanId) || null;  
            
            this.formGroup.patchValue({
                kode_tps: this.kodetps,
                nama_tps: this.namatps,
                kelurahaId: selectedKelurahan,
                max_surat_suara: this.max_surat_suara
            });
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(
            this.tpsId,
            this.menuKeys
        );
        this.router.navigate(['tps']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            kode_tps: new FormControl('', Validators.required),
            nama_tps: new FormControl('', Validators.required),
            kelurahaId: new FormControl('', Validators.required),
            max_surat_suara: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        this.loading = true;
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;

            const newFormData: TpsReq = {
                kode_tps: formData.kode_tps,
                nama_tps: formData.nama_tps,
                kelurahanId: formData.kelurahaId.code,
                max_surat_suara: formData.max_surat_suara,
            };

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addTPS?.toLocaleLowerCase()
            ) {
                this.tpservice.add(newFormData).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Menyimpan Data',
                        });

                        setTimeout(() => {
                            this.loading = false;
                            this.router.navigate(['tps']);
                        }, 800);
                    },
                    error: (err) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Maaf',
                            detail: 'Gagal Menyimpan Data',
                        });
                        setTimeout(() => {
                            this.loading = false;
                        }, 800);
                    },
                });
            } else if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.editTPS?.toLocaleLowerCase()
            ) {
                this.tpservice.edit(this.tpsId, newFormData).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Merubah Data',
                        });

                        setTimeout(() => {
                            this.loading = false;
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
                        setTimeout(() => {
                            this.loading = false;
                        }, 800);
                    },
                });
            }
        }
    }
}
