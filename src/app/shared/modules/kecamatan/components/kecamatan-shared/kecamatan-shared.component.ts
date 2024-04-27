import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import {
    KabupatenResp,
} from 'src/app/modules/application/masters/kabupaten/models/kabupaten-resp.model';
import { KecamatanReq } from 'src/app/modules/application/masters/kecamatan/models/kecamatan-req.model';
import { DropdownItems, KecamatanResp } from 'src/app/modules/application/masters/kecamatan/models/kecamatan-resp.model';
import { KecamatanService } from 'src/app/modules/application/masters/kecamatan/services/kecamatan.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-kecamatan-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './kecamatan-shared.component.html',
    styleUrl: './kecamatan-shared.component.scss',
})
export class KecamatanSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: KecamatanResp;

    selected: string = '';

    kecamatanId: string = '';
    kodekec: string = '';
    kec: string = '';
    jmldpt: string = '';
    menuKeys = Constant.menuKeys.kecamatan;

    KabupatenList: KabupatenResp[] = [];
    dropdownItems: DropdownItems[] = [];

    dataCount: number = 0;

    title: string;
    btnTitle: string;

    formGroup: FormGroup = this.initFormGroup()

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private kecamatanService: KecamatanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getKodeKabupaten();        
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            id_kabupaten: new FormControl('', Validators.required),
            kode_kecamatan: new FormControl('', Validators.required),
            kecamatan: new FormControl('', Validators.required),
            jml_dpt: new FormControl('', Validators.required),
        });
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(
            this.kecamatanId,
            this.menuKeys
        );
        this.router.navigate(['master', 'kecamatan']);
    }

    getKodeKabupaten() {
        this.kecamatanService.getKodeKabupaten().subscribe({
            next: (resp) => {
                this.KabupatenList = resp?.data ?? [];
                this.KabupatenList.forEach((element) => {
                    this.dropdownItems.push({
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

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addKecamatan?.toLocaleLowerCase()
        ) {
            this.title = Constant.kecamatanShared.addTitle;
            this.btnTitle = Constant.kecamatanShared.btnTitleAdd;
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editKecamatan?.toLocaleLowerCase()
        ) {
            this.title = Constant.kecamatanShared.editTitle;
            this.btnTitle = Constant.kecamatanShared.btnTitleEdit;

            this.selected = this.dataPars['data'].kabupatenId ?? '';
            this.kecamatanId = this.dataPars['data'].id ?? '';
            this.kodekec = this.dataPars['data'].kode_kecamatan ?? '';
            this.kec = this.dataPars['data'].nama_kecamatan ?? '';
            this.jmldpt = this.dataPars['data'].jumlah_DPT ?? '';
            
            const selectedKabupaten = this.dropdownItems.find(item => item.code === this.selected) || null;  
            
            this.formGroup.patchValue({
                id_kabupaten: selectedKabupaten,
                kode_kecamatan: this.kodekec,
                kecamatan: this.kec,
                jml_dpt: this.jmldpt
            });
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            
            const newFormData: KecamatanReq = {
                kabupatenId: formData.id_kabupaten.code,
                kode_kecamatan: formData.kode_kecamatan,
                nama_kecamatan: formData.kecamatan,
                jumlah_DPT: formData.jml_dpt,
            };

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addKecamatan?.toLocaleLowerCase()
            ) {

                this.kecamatanService.addKecamatan(newFormData).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Menyimpan Data',
                        });

                        setTimeout(() => {
                            this.router.navigate(['master', 'kecamatan']);
                        }, 800);
                    },
                    error: (err) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Maaf',
                            detail: 'Gagal Menyimpan Data',
                        });
                        console.log(err);
                    },
                });
            } else if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.editKecamatan?.toLocaleLowerCase()
            ) {
                this.kecamatanService.editKecamatan(this.kecamatanId, newFormData).subscribe({
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
                        console.log(err);
                    },
                });
            }
        }
    }
}
