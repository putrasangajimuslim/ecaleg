import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import {
    AddKabupatenResp,
    newKabupatenResp,
} from 'src/app/modules/application/masters/kabupaten/models/kabupaten-resp.model';
import { AddKecamatanResp } from 'src/app/modules/application/masters/kecamatan/models/kecamatan-resp.model';
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
    @Input() dataPars?: AddKecamatanResp;

    kodekab: string = '';
    kecamatanId: string = '';
    kodekec: string = '';
    kec: string = '';
    jmldpt: string = '';

    menuKeys = Constant.menuKeys.kecamatan;

    KabupatenList?: AddKabupatenResp[] = [];
    dropdownItems?: newKabupatenResp[] = [];
    dataCount: number = 0;

    title: string;
    btnTitle: string;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private kecamatanService: KecamatanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.getKodeKabupaten();
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(
            this.kecamatanId,
            this.menuKeys
        );
        this.router.navigate(['master', 'kecamatan']);
    }

    buildForm() {
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

            this.kodekab = this.dataPars['data'].id_kabupaten;
            this.kecamatanId = this.dataPars['data'].id;
            this.kodekec = this.dataPars['data'].kode_kecamatan;
            this.kec = this.dataPars['data'].kecamatan;
            this.jmldpt = this.dataPars['data'].jumlah_dpt;

            this.formGroup.get('kecamatans.kodekab')?.setValue(this.kodekab);
            this.formGroup.get('kecamatans.kodekec')?.setValue(this.kodekec);
            this.formGroup.get('kecamatans.kec')?.setValue(this.kec);
            this.formGroup.get('kecamatans.jmldpt')?.setValue(this.jmldpt);
        }
    }

    initFormGroup(): FormGroup {
        return this.formBuilder.group({
            kecamatans: this.formBuilder.group({
                kodekab: ['', Validators.required],
                kodekec: ['', Validators.required],
                kec: ['', Validators.required],
                jmldpt: ['', Validators.required],
            }),
        });
    }

    getKodeKabupaten() {
        this.kecamatanService.getKodeKabupaten().subscribe({
            next: (resp) => {
                this.KabupatenList = resp?.kabupaten ?? [];

                this.KabupatenList.forEach((element) => {
                    this.dropdownItems?.push({
                        code: element.id.toString(),
                        name: element.kabupaten,
                    });
                });
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
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            const newFormData: AddKecamatanResp = {
                id: this.kecamatanId,
                id_kabupaten: formData.kecamatans.kodekab,
                kode_kecamatan: formData.kecamatans.kodekec,
                kecamatan: formData.kecamatans.kec,
                jumlahdpt: formData.kecamatans.jmldpt,
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
                this.kecamatanService.editKecamatan(newFormData).subscribe({
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
