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
    PartaiResp
} from 'src/app/modules/application/masters/partai/models/partai-resp.model';
import { PartaiService } from 'src/app/modules/application/masters/partai/services/partai.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-partai-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './partai-shared.component.html',
    styleUrl: './partai-shared.component.scss',
})
export class PartaiSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: PartaiResp;

    title: string;
    btnTitle: string;

    partaiId: string = '';
    partai: string = '';
    logo: string = '';
    keterangan: string = '';
    isShowRequired: boolean = true;

    menuKeys = Constant.menuKeys.partai;

    loading: boolean = false;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private partaiService: PartaiService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.fillForm();
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.partaiId, this.menuKeys);
        this.router.navigate(['master', 'partai']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            logo: new FormControl(''),
            partai: new FormControl('', Validators.required),
            keterangan: new FormControl('', Validators.required),
        });
    }

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addPartai?.toLocaleLowerCase()
        ) {
            this.title = Constant.partaiShared.addTitle;
            this.btnTitle = Constant.partaiShared.btnTitleAdd;

            this.formGroup.addControl(
                'logo',
                new FormControl('', Validators.required)
            );
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editPartai?.toLocaleLowerCase()
        ) {
            this.title = Constant.partaiShared.editTitle;
            this.btnTitle = Constant.partaiShared.btnTitleEdit;

            this.partaiId = this.dataPars['data'].id ?? '';
            this.partai = this.dataPars['data'].nama_partai ?? '';
            this.logo = this.dataPars['data'].url_logo ?? '';
            this.keterangan = this.dataPars['data'].keterangan ?? '';
            this.isShowRequired = false;

            const checkUpload = this.formGroup.get('logo').value;

            if(!checkUpload) {
                this.formGroup.patchValue({
                    logo: this.logo,
                });
            }
            
            this.formGroup.patchValue({
                partai: this.partai,
                keterangan: this.keterangan,
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
        this.loading = true;
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            
            const newForm = new FormData();

            newForm.append('logo', this.formGroup.get('logo').value);
            newForm.append('nama_partai', this.formGroup.get('partai').value);
            newForm.append(
                'keterangan',
                this.formGroup.get('keterangan').value
            );

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addPartai?.toLocaleLowerCase()
            ) {
                this.partaiService.addPartai(newForm).subscribe({
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
                Constant.actionKeys.editPartai?.toLocaleLowerCase()
            ) {
                this.partaiService.editPartai(this.partaiId,  newForm).subscribe({
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
