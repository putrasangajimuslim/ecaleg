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
import { CalonReq } from 'src/app/modules/application/calon/models/calon-req.model';
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
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editCalon?.toLocaleLowerCase()
        ) {
            this.title = Constant.calonShared.editTitle;
            this.btnTitle = Constant.calonShared.btnTitleEdit;

            this.calonId = this.dataPars['data'].id ?? '';
            this.foto = this.dataPars['data'].foto ?? '';
            this.calon = this.dataPars['data'].nama_calon ?? '';
            this.partai = this.dataPars['data'].id_partai ?? '';
            this.kabupatenId = this.dataPars['data'].id_kabupaten ?? '';

            const selectedPartai = this.dropdownItemPartais.find(item => item.code === this.partai) || null;  

            const selectedKabupaten = this.dropdownItemKabupatens.find(item => item.code === this.kabupatenId) || null;  

            this.formGroup.patchValue({
                foto: this.foto,
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
            foto: new FormControl('', Validators.required),
            calon: new FormControl('', Validators.required),
            partai: new FormControl('', Validators.required),
            kabupatenId: new FormControl('', Validators.required),
        });
    }

    uploadFile(event) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

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

            const newFormData: CalonReq = {
                nama_calon: formData.calon,
                foto: formData.foto,
                partaiId: formData.partai.code,
                kabupatenId: formData.kabupatenId.code,
            };

            if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.addCalon?.toLocaleLowerCase()
            ) {

                this.calonService.addCalon(newFormData).subscribe({
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
                Constant.actionKeys.editCalon?.toLocaleLowerCase()
            ) {
                this.calonService.editCalon(this.calonId, newFormData).subscribe({
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
