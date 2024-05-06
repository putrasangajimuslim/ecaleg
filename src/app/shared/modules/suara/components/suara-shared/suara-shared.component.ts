import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { CalonResp } from 'src/app/modules/application/calon/models/calon-resp.model';
import { PartaiResp } from 'src/app/modules/application/masters/partai/models/partai-resp.model';
import {
    DropdownItems,
    SuaraResp,
} from 'src/app/modules/application/suara/models/suara-resp.model';
import { SuaraService } from 'src/app/modules/application/suara/services/suara.service';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
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
    role: string = '';

    file: File;

    menuKeys = Constant.menuKeys.suara;

    viewSuaraActionKey = Constant.actionKeys.viewSuara;

    idLogin: string = '';
    nameLogin: string = '';
    status_laporan: string = '';

    countPartai = 1;
    dataCount: number = 0;

    action_status: boolean = false;

    partaiList: PartaiResp[] = [];
    calonList: CalonResp[] = [];
    dropdownItems: DropdownItems[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private fb: FormBuilder,
        protected router: Router,
        private suaraService: SuaraService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
        private utils: Utils,
        private cryptoService: CryptoService, 
    ) {
        const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');
        if (encryptedMapping) {
            const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);

            this.idLogin = decryptedMapping.id;
            this.role = decryptedMapping.role;
        }
    }

    ngOnInit(): void {
        this.getCalonPartai();
        this.getAllCalon();
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

                this.setFormControls();
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

    setFormControls() {
        const calonsArray = this.formGroup.get('calons') as FormArray;
        this.calonList.forEach(calon => {
          calonsArray.push(
            this.fb.group({
              calon_id: [calon.id, Validators.required],
              suara_sah: ['', Validators.required],
            })
          );
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

    initFormGroup() {
        return this.fb.group({
            calons: this.fb.array([]),
            foto: new FormControl('', Validators.required),
        });
    }

    validatorDuplicate() {
        return (control: AbstractControl): ValidationErrors | null => {
          const formArray = control as FormArray;
          const values = formArray.value.map((item: any) => item.candidate);
    
          // Check for duplicate values
          const valueSet = new Set();
          let hasDuplicates = false;
    
          for (const value of values) {
            if (valueSet.has(value)) {
              hasDuplicates = true;
              break;
            }
            valueSet.add(value);
          }
    
          // Return validation result
          return hasDuplicates ? { 'duplicateValues': true } : null;
        };
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

            this.formGroup.patchValue({
                id_calon: '',
                suara_sah: '',
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
            this.status_laporan = this.dataPars['data'].status_suara == 'Suara Di Terima' ? 'Diterima': 'Ditolak'
            this.suaraId = this.dataPars['data'].id ?? '';
            this.action_status = this.dataPars['data'].status_suara ? true : false;
        }
    }

    changeStatusLapor(req: string) {
        this.suaraService.upd_status_laporan(this.suaraId, req).subscribe({
            next: (resp) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Merubah Status Laporan',
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

            const fd = new FormData();
            fd.append('c1_photo', formData.foto);
            formData.calons.forEach((calon, index) => {
                fd.append(`suara_calon[${index}][calonId]`, calon.calon_id);
                fd.append(`suara_calon[${index}][total_suara]`, calon.suara_sah);
            });

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
