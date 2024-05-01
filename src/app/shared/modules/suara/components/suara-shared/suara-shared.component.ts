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
import { NewCalonReqArr } from 'src/app/modules/application/suara/models/suara-req.model';
import {
    DropdownItems,
    SuaraResp,
} from 'src/app/modules/application/suara/models/suara-resp.model';
import { SuaraService } from 'src/app/modules/application/suara/services/suara.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-suara-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './suara-shared.component.html',
    styleUrl: './suara-shared.component.scss',
})
export class SuaraSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: SuaraResp;

    title: string;
    btnTitle: string;

    suaraId: string = '';
    id_calon: string = '';
    suara_sah: string = '';
    suara_tidak_sah: string = '';
    max_suara: string = '';
    user_input: string = '';
    file_c1: string = '';

    file: File;

    menuKeys = Constant.menuKeys.suara;

    partaiList: PartaiResp[] = [];
    dropdownItems: DropdownItems[] = [];
    newArrInput: NewCalonReqArr[] = []

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private suaraService: SuaraService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getCalonPartai();
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.suaraId, this.menuKeys);
        this.router.navigate(['suara']);
    }

    getCalonPartai() {
        this.suaraService.getPartai().subscribe({
            next: (resp) => {
                this.partaiList = resp?.data ?? [];
                this.partaiList.forEach((element) => {
                    this.dropdownItems.push({
                        name: element.nama_partai,
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
            id_calon: new FormControl('', Validators.required),
            suara_sah: new FormControl('', Validators.required),
            user_input: new FormControl('', Validators.required),
        });
    }

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addSuara?.toLocaleLowerCase()
        ) {
            this.title = Constant.SuaraShared.addTitle;
            this.btnTitle = Constant.SuaraShared.btnTitleAdd;

            this.formGroup.patchValue({
                user_input: 10,
            });
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editSuara?.toLocaleLowerCase()
        ) {
            this.title = Constant.SuaraShared.editTitle;
            this.btnTitle = Constant.SuaraShared.btnTitleEdit;

            this.suaraId = this.dataPars['data'].id ?? '';
            
            this.formGroup.patchValue({
                id_calon: '',
                suara_sah: '',
                suara_tidak_sah: '',
                max_suara: '',
                user_input: '',
                file_c1: '',
            });
        }
    }

    uploadFile(event) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            this.file = file;

            // reader.onload = () => {
            //     this.formGroup.patchValue({
            //         logo: file,
            //     });
            // };            
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            
            const newForm = new FormData();

            newForm.append('c1_photo', this.file);
            newForm.append('suara_calon[0][total_suara]', formData.id_calon.code);
            newForm.append('suara_calon[0][total_suara]', formData.suara_sah);

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addSuara?.toLocaleLowerCase()
            ) {
                this.suaraService.add(newForm).subscribe({
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
                Constant.actionKeys.editSuara?.toLocaleLowerCase()
            ) {
                this.suaraService.edit(this.suaraId, newForm).subscribe({
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
