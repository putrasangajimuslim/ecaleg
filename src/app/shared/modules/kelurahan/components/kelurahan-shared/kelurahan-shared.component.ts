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
import {
    KecamatanResp,
} from 'src/app/modules/application/masters/kecamatan/models/kecamatan-resp.model';
import { KelurahanReq } from 'src/app/modules/application/masters/kelurahan/models/kelurahan-req.model';
import { DropdownItems, KelurahanResp } from 'src/app/modules/application/masters/kelurahan/models/kelurahan-resp.model';
import { KelurahanService } from 'src/app/modules/application/masters/kelurahan/services/kelurahan.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-kelurahan-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './kelurahan-shared.component.html',
    styleUrl: './kelurahan-shared.component.scss',
})
export class KelurahanSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: KelurahanResp;

    title: string;
    btnTitle: string;

    kelId: string = '';
    kodekec: string = '';
    kel: string = '';

    menuKeys = Constant.menuKeys.kelurahan;

    loading: boolean = false;

    KecamatanList?: KecamatanResp[] = [];
    dropdownItems?: DropdownItems[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private kelurahanService: KelurahanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getKodeKecamatan();
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.kelId, this.menuKeys);
        this.router.navigate(['master', 'kelurahan']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            id_kecamatan: new FormControl('', Validators.required),
            kelurahan: new FormControl('', Validators.required),
        });
    }

    getKodeKecamatan() {
        this.kelurahanService.getKodeKecamatan().subscribe({
            next: (resp) => {
                this.KecamatanList = resp?.data ?? [];

                this.KecamatanList.forEach((element) => {
                    this.dropdownItems.push({
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
                    detail: 'Gagal Menyimpan Data',
                });
                this.fillForm();
            },
        });
    }

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addKelurahan?.toLocaleLowerCase()
        ) {
            this.title = Constant.kelurahanShared.addTitle;
            this.btnTitle = Constant.kelurahanShared.btnTitleAdd;
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editKelurahan?.toLocaleLowerCase()
        ) {
            this.title = Constant.kelurahanShared.editTitle;
            this.btnTitle = Constant.kelurahanShared.btnTitleEdit;

            this.kelId = this.dataPars['data'].id ?? '';
            this.kodekec = this.dataPars['data'].kecamatanId ?? '';
            this.kel = this.dataPars['data'].nama_kelurahan ?? '';

            const selectedKabupaten = this.dropdownItems.find(item => item.code === this.kodekec) || null;  
            
            this.formGroup.patchValue({
                id_kecamatan: selectedKabupaten,
                kelurahan: this.kel,
            });
        }
    }

    onSubmit() {
        this.loading = true;
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            const newFormData: KelurahanReq = {
                kecamatanId: formData.id_kecamatan.code,
                nama_kelurahan: formData.kelurahan,
            };

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addKelurahan?.toLocaleLowerCase()
            ) {
                this.kelurahanService.addKelurahan(newFormData).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Menyimpan Data',
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
                            detail: 'Gagal Menyimpan Data',
                        });
                        setTimeout(() => {
                            this.loading = false;
                        }, 800);
                    },
                });
            } else if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.editKelurahan?.toLocaleLowerCase()
            ) {
                this.kelurahanService.editKelurahan(this.kelId,newFormData).subscribe({
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
