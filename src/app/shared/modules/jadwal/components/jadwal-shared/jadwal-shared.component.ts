import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { JadwalReq } from 'src/app/modules/application/jadwal/models/jadwal-req.model';
import { DropdownItems, JadwalResp } from 'src/app/modules/application/jadwal/models/jadwal-resp.model';
import { JadwalService } from 'src/app/modules/application/jadwal/services/jadwal.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-jadwal-shared',
  standalone: true,
  imports: [
    CommonModule, SharedModule
  ],
  templateUrl: './jadwal-shared.component.html',
  styleUrl: './jadwal-shared.component.scss'
})
export class JadwalSharedComponent {
  @Input() actionKey: string;
  @Input() dataPars?: JadwalResp;
  title: string;
  btnTitle: string;

  jadwalId: string = '';
  jadwal: string = '';
  status: string = '';
  keterangan: string = '';

  menuKeys = Constant.menuKeys.jadwal;

  dropdownItems: DropdownItems[] = [
    {
        name: 'Aktif',
        code: '1',
    },
    {
        name: 'Tidak Aktif',
        code: '2',
    }
  ];

  formGroup: FormGroup = this.initFormGroup();

  constructor(
      private formBuilder: FormBuilder,
      protected router: Router,
      private jadwalService: JadwalService,
      private reviewDataService: EcalegReviewDataService,
      private serviceToast: MessageService
  ) {}

  ngOnInit(): void {
      this.buildForm();
  }

  buildForm() {
      if (
          this.actionKey?.toLocaleLowerCase() ===
          Constant.actionKeys.addJadwal?.toLocaleLowerCase()
      ) {
          this.title = Constant.Jadwalhared.addTitle;
          this.btnTitle = Constant.Jadwalhared.btnTitleAdd;
      } else if (
          this.actionKey?.toLocaleLowerCase() ===
          Constant.actionKeys.editJadwal?.toLocaleLowerCase()
      ) {
          this.title = Constant.Jadwalhared.editTitle;
          this.btnTitle = Constant.Jadwalhared.btnTitleEdit;

          this.jadwalId = this.dataPars['data'].id ?? '';
          this.jadwal = this.dataPars['data'].id ?? '';
          this.status = this.dataPars['data'].kode_kabupaten ?? '';
          this.keterangan = this.dataPars['data'].nama_kabupaten ?? '';

          this.formGroup.get('jadwal')?.setValue(this.jadwal);
          this.formGroup.get('status')?.setValue(this.status);
          this.formGroup.get('keterangan')?.setValue(this.keterangan);
      }
  }

  onClickBackButton() {
      this.reviewDataService.deleteSavedReview(this.jadwalId, this.menuKeys);
      this.router.navigate(['jadwal']);
  }
  

  initFormGroup(): FormGroup {
      return new FormGroup({
          jadwal: new FormControl('', Validators.required),
          status: new FormControl('', Validators.required),
          keterangan: new FormControl('', Validators.required),
      });
  }

  onSubmit() {
      if (this.formGroup.valid) {
          const formData = this.formGroup.value;

          const newFormData: JadwalReq = {
              jadwal: formData.jadwal,
              status: formData.status,
              keterangan: formData.keterangan,
          };

          if (
              this.actionKey?.toLocaleLowerCase() ===
              Constant.actionKeys.addKabupaten?.toLocaleLowerCase()
          ) {
              this.jadwalService.add(newFormData).subscribe({
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
              this.jadwalService.edit(this.jadwalId, newFormData).subscribe({
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
