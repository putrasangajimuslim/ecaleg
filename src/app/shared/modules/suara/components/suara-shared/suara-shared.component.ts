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
import { CalonResp } from 'src/app/modules/application/calon/models/calon-resp.model';
import { PartaiResp } from 'src/app/modules/application/masters/partai/models/partai-resp.model';
import { NewCalonReqArr } from 'src/app/modules/application/suara/models/suara-req.model';
import {
    DropdownItems,
    SuaraResp,
} from 'src/app/modules/application/suara/models/suara-resp.model';
import { SuaraService } from 'src/app/modules/application/suara/services/suara.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { Utils } from 'src/app/modules/utils/utils';
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
    @Input() isEditable: false;

    title: string;
    btnTitle: string;
    moreBtn: string;

    suaraId: string = '';
    id_calon: string = '';
    suara_sah: string = '';
    suara_tidak_sah: string = '';
    max_suara: string = '';
    user_input: string = '';
    file_c1: string = '';

    file: File;

    menuKeys = Constant.menuKeys.suara;

    addSuaraActionKey = Constant.actionKeys.addSuara;

    idLogin: string = '';
    nameLogin: string = '';

    countPartai = 1;
    dataCount: number = 0;

    partaiList: PartaiResp[] = [];
    calonList: CalonResp[] = [];
    dropdownItems: DropdownItems[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private suaraService: SuaraService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
        private utils: Utils
    ) {}

    ngOnInit(): void {
        this.getCalonPartai();
        this.getAllCalon();
        this.idLogin = this.utils.getLocalStorage('id');
        this.nameLogin = this.utils.getLocalStorage('nama_panitia');
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.suaraId, this.menuKeys);

        this.router.navigate(['suara']);
    }

    getAllCalon() {
        this.suaraService.getAllCalon().subscribe({
            next: (resp) => {
                this.calonList = resp?.data ?? [];
                this.dataCount = resp?.data.length;
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
            },
        });
    }

    getCalonPartai() {
        this.suaraService.getPartai().subscribe({
            next: (resp) => {
                this.partaiList = resp?.data ?? [];
                this.partaiList.forEach((element) => {
                    this.dropdownItems.push({
                        name: element.nama_calon,
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
            foto: new FormControl('', Validators.required),
        });
    }

    fillForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addSuara?.toLocaleLowerCase()
        ) {
            this.title = Constant.SuaraShared.addTitle;
            this.btnTitle = Constant.SuaraShared.btnTitleAdd;
            this.moreBtn = Constant.SuaraShared.btnCancel;

            this.formGroup.patchValue({
                user_input: this.idLogin,
            });
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editSuara?.toLocaleLowerCase()
        ) {
            this.title = Constant.SuaraShared.editTitle;
            this.btnTitle = Constant.SuaraShared.btnTitleEdit;

            this.suaraId = this.dataPars['data'].id ?? '';
            this.id_calon = this.dataPars['data'].suara_calons.calonId;

            // const selectedRoles =
            //     this.dropdownItems.find(
            //         (item) => item.code === this.roles
            //     ) || null;
            // let selectedDropdownItem = {};

            // this.dataPars['data']?.suara_calons.forEach((suara_calon, i) => {
            //     this.formGroup.addControl(
            //         `id_calon_${i}`,
            //         new FormControl('', Validators.required)
            //     );

            //     selectedDropdownItem = this.dropdownItems.find(item => item.code === suara_calon.calonId);

            //     this.formGroup.get(`id_calon_${i}`).patchValue(selectedDropdownItem ? selectedDropdownItem: '');
            // });

            // console.log(this.dropdownItems);
            // console.log(this.formGroup);

            this.formGroup.patchValue({
                id_calon: '',
                suara_sah: '',
                suara_tidak_sah: '',
                max_suara: '',
                user_input: '',
                file_c1: '',
            });
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.viewSuara?.toLocaleLowerCase()
        ) {
            this.title = Constant.SuaraShared.viewTitle;
            this.btnTitle = Constant.SuaraShared.btnApproved;
            this.moreBtn = Constant.SuaraShared.btnNotApproved;

            this.suaraId = this.dataPars['data'].id ?? '';
        }
    }

    checkSelectOption(event: any, id: string) {
        console.log(event.value.code);
    }

    uploadFile(event: any) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            this.file = file;

            reader.onload = () => {
                this.formGroup.patchValue({
                    foto: file,
                });
            };
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;

            const data: NewCalonReqArr = {
                c1_photo: formData.foto,
                suara_calon: [
                    {
                        calonId: formData.id_calon.code,
                        total_suara: formData.suara_sah,
                    },
                ],
            };

            const fd = new FormData();
            fd.append('c1_photo', data.c1_photo);
            fd.append('suara_calon[0][calonId]', data.suara_calon[0].calonId);
            fd.append(
                'suara_calon[0][total_suara]',
                data.suara_calon[0].total_suara
            );
            // data.suara_calon.forEach((suara, index) => {
            //     // fd.append(`suara_calon[${index}][calonId]`, suara.calonId);
            //     // fd.append(`suara_calon[${index}][total_suara]`, suara.total_suara);

            // });

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addSuara?.toLocaleLowerCase()
            ) {
                this.suaraService.add(fd).subscribe({
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
                        console.log(err);
                    },
                });
            }
        }
    }
}
