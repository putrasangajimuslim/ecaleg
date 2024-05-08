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
import { CalonResp, DropdownItems } from 'src/app/modules/application/calon/models/calon-resp.model';
import { CalonService } from 'src/app/modules/application/calon/services/calon.service';
import { KabupatenResp } from 'src/app/modules/application/masters/kabupaten/models/kabupaten-resp.model';
import { PartaiResp } from 'src/app/modules/application/masters/partai/models/partai-resp.model';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-calon-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './calon-shared.component.html',
    styleUrl: './calon-shared.component.scss',
})
export class CalonSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: CalonResp;
    title: string;
    btnTitle: string;

    calonId: string = '';
    foto: string = '';
    calon: string = '';
    partai: string = '';
    kabupatenId: string = '';

    isShowRequired: boolean = true;

    private _publicPath = __webpack_public_path__;

    defaultC1: string | ArrayBuffer | null = null;

    loading: boolean = false;

    KabupatenList: KabupatenResp[] = [];
    PartaiList: PartaiResp[] = [];

    dropdownItemPartais: DropdownItems[] = [];
    dropdownItemKabupatens: DropdownItems[] = [];

    menuKeys = Constant.menuKeys.calon;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private calonService: CalonService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getDataKabupaten();
        this.getDataPartai();
    }

    getDataPartai() {
        this.calonService.getPartai().subscribe({
            next: (resp) => {
                this.PartaiList = resp?.data ?? [];
                this.PartaiList.forEach((element) => {
                    this.dropdownItemPartais.push({
                        name: element.nama_partai,
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

    getDataKabupaten() {
        this.calonService.getKabupaten().subscribe({
            next: (resp) => {
                this.KabupatenList = resp?.data ?? [];
                this.KabupatenList.forEach((element) => {
                    this.dropdownItemKabupatens.push({
                        name: element.nama_kabupaten,
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
            Constant.actionKeys.addCalon?.toLocaleLowerCase()
        ) {
            this.title = Constant.calonShared.addTitle;
            this.btnTitle = Constant.calonShared.btnTitleAdd;
            this.defaultC1 = `${this._publicPath}assets/images/default_img.avif`;

            this.formGroup.addControl(
                'foto',
                new FormControl('', Validators.required)
            );
            
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editCalon?.toLocaleLowerCase()
        ) {
            this.title = Constant.calonShared.editTitle;
            this.btnTitle = Constant.calonShared.btnTitleEdit;

            this.calonId = this.dataPars['data'].id ?? '';
            this.foto = this.dataPars['data'].url_foto ?? '';
            this.calon = this.dataPars['data'].nama_calon ?? '';
            this.partai = this.dataPars['data'].partaiId ?? '';
            this.kabupatenId = this.dataPars['data'].kabupatenId ?? '';
            this.isShowRequired = false;
            this.defaultC1 = this.dataPars['data'].url_foto ?? '';

            const checkUpload = this.formGroup.get('foto').value;
            
            if(!checkUpload) {
                this.formGroup.patchValue({
                    foto: this.foto,
                });
            }

            const selectedPartai = this.dropdownItemPartais.find(item => item.code === this.partai) || null;  

            const selectedKabupaten = this.dropdownItemKabupatens.find(item => item.code === this.kabupatenId) || null;  

            this.formGroup.patchValue({
                calon: this.calon,
                partai: selectedPartai,
                kabupatenId: selectedKabupaten,
            });
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.calonId, this.menuKeys);
        this.router.navigate(['calon']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            foto: new FormControl(''),
            calon: new FormControl('', Validators.required),
            partai: new FormControl('', Validators.required),
            // kabupatenId: new FormControl('', Validators.required),
        });
    }

    uploadFile(event) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.defaultC1 = reader.result;
                this.formGroup.patchValue({
                    foto: file,
                });
            };
        }
    }

    onSubmit() {
        this.loading = true;

        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            const newForm = new FormData();

            newForm.append('nama_calon', this.formGroup.get('calon').value);
            newForm.append('foto', this.formGroup.get('foto').value);
            newForm.append(
                'partaiId',
                formData.partai.code
            );
            // newForm.append(
            //     'kabupatenId',
            //     formData.kabupatenId.code
            // );

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addCalon?.toLocaleLowerCase()
            ) {

                this.calonService.addCalon(newForm).subscribe({
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
                Constant.actionKeys.editCalon?.toLocaleLowerCase()
            ) {
                this.calonService.editCalon(this.calonId, newForm).subscribe({
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
