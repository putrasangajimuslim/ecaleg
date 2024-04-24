import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { KabupatenResp } from 'src/app/modules/application/masters/kabupaten/models/kabupaten-resp.model';
import { KabupatenService } from 'src/app/modules/application/masters/kabupaten/services/kabupaten.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-kabupaten-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './kabupaten-shared.component.html',
    styleUrl: './kabupaten-shared.component.scss',
})
export class KabupatenSharedComponent implements OnInit {
    @Input() actionKey: string;
    @Input() dataPars?: KabupatenResp;
    title: string;
    btnTitle: string;

    kabId: string = '';
    kodekab: string = '';
    kab: string = '';
    jmldpt: string = '';

    menuKeys = Constant.menuKeys.kabupaten;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private kabupatenService: KabupatenService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addKabupaten?.toLocaleLowerCase()
        ) {
            this.title = Constant.kabupatenShared.addTitle;
            this.btnTitle = Constant.kabupatenShared.btnTitleAdd;
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editKabupaten?.toLocaleLowerCase()
        ) {
            this.title = Constant.kabupatenShared.editTitle;
            this.btnTitle = Constant.kabupatenShared.btnTitleEdit;

            this.kabId = this.dataPars['data'].id;
            this.kodekab = this.dataPars['data'].kd_kabupaten;
            this.kab = this.dataPars['data'].kabupaten;
            this.jmldpt = this.dataPars['data'].jumlah_kursi;

            this.formGroup.get('kd_kabupaten')?.setValue(this.kodekab);
            this.formGroup.get('kabupaten')?.setValue(this.kab);
            this.formGroup.get('jml_kursi')?.setValue(this.jmldpt);
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.kabId, this.menuKeys);
        this.router.navigate(['master', 'kabupaten']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            kd_kabupaten: new FormControl('', Validators.required),
            kabupaten: new FormControl('', Validators.required),
            jml_kursi: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;

            const newFormData: KabupatenResp = {
                id: this.kabId,
                kd_kabupaten: formData.kd_kabupaten,
                kabupaten: formData.kabupaten,
                jumlah_kursi: formData.jml_kursi,
            };

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addKabupaten?.toLocaleLowerCase()
            ) {
                this.kabupatenService.addKabupaten(newFormData).subscribe({
                    next: (resp) => {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Menyimpan Data',
                        });

                        setTimeout(() => {
                            this.router.navigate(['master', 'kabupaten']);
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
                Constant.actionKeys.editKabupaten?.toLocaleLowerCase()
            ) {
                this.kabupatenService.editKecamatan(newFormData).subscribe({
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
