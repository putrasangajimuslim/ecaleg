import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import {
    AddKecamatanResp,
    newKecamatanResp,
} from 'src/app/modules/application/masters/kecamatan/models/kecamatan-resp.model';
import { AddKelurahanResp } from 'src/app/modules/application/masters/kelurahan/models/kelurahan-resp.model';
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
    @Input() dataPars?: AddKelurahanResp;

    title: string;
    btnTitle: string;

    kelId: string = '';
    kodekec: string = '';
    kel: string = '';

    menuKeys = Constant.menuKeys.kelurahan;

    KecamatanList?: AddKecamatanResp[] = [];
    dropdownItems?: newKecamatanResp[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private kelurahanService: KelurahanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.generateFormResult();
        this.getKodeKecamatan();
    }

    generateFormResult() {
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
            this.kodekec = this.dataPars['data'].id_kecamatan ?? '';
            this.kel = this.dataPars['data'].kelurahan ?? '';

            this.formGroup.get('kelurahan.kel')?.setValue(this.kel);
            this.formGroup.get('kelurahan.kodekec')?.setValue(this.kodekec);
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.kelId, this.menuKeys);
        this.router.navigate(['master', 'kelurahan']);
    }

    initFormGroup(): FormGroup {
        return this.formBuilder.group({
            kelurahan: this.formBuilder.group({
                kodekec: ['', Validators.required],
                kel: ['', Validators.required],
            }),
        });
    }

    getKodeKecamatan() {
      this.kelurahanService.getKodeKecamatan().subscribe({
          next: (resp) => {
              this.KecamatanList = resp?.kecamatan ?? [];

              this.KecamatanList.forEach((element) => {

                this.dropdownItems?.push(
                    {
                        code: element.id.toString(),
                        name: element.kecamatan,
                    }
                );
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
            const newFormData: AddKelurahanResp = {
                id: this.kelId,
                id_kecamatan: formData.kelurahan.kodekec,
                kelurahan: formData.kelurahan.kel,
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
            } else if (
                this.actionKey?.toLocaleLowerCase() ===
                Constant.actionKeys.editKelurahan?.toLocaleLowerCase()
            ) {
                this.kelurahanService.editKelurahan(newFormData).subscribe({
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
