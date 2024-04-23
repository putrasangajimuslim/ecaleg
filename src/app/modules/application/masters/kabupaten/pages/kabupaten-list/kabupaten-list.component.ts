import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { AddKabupatenResp } from '../../models/kabupaten-resp.model';
import { KabupatenService } from '../../services/kabupaten.service';

@Component({
    selector: 'app-kabupaten-list',
    standalone: true,
    imports: [
        CommonModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		ButtonModule,
		TableModule,
		RippleModule,
        ToastModule,
    ],
    templateUrl: './kabupaten-list.component.html',
    styleUrl: './kabupaten-list.component.scss',
})
export class KabupatenListComponent implements OnInit {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    kabId = '';
    dataSource1: AddKabupatenResp[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.kabupaten

    private _imagePath = __webpack_public_path__;
    emptyImg = `${this._imagePath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kabupatenService: KabupatenService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
    ) {}

    ngOnInit() {
        this.fetchDataKabupaten();
    }

    fetchDataKabupaten() {
        this.loading = true;
        this.kabupatenService.getKabupaten()
        .subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.kabupaten ?? [];
                this.dataCount = resp?.kabupaten.length;

                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    onClickAddKabupaten() {
        this.router.navigate(['master', 'kabupaten', 'add']);
    }

    onClickEditKabupaten(data: AddKabupatenResp) {
        this.kabId = data.id;
        this.reviewDataService.saveReview(
            this.kabId, 
            data,
            this.menuKeys
        );
        this.router.navigate(['master', 'kabupaten', 'edit', this.kabId]);
    }

    onClickDeleteKabupaten(id: string) {
        this.kabId = id;
        
        this.deleteDialog = true;
    }

    confirmationDel() {
        const newFormData: AddKabupatenResp = {
          id: this.kabId,
      };

      this.kabupatenService.delKecamatan(newFormData).subscribe({
          next: (resp) => {
              this.deleteDialog = false;
              
              this.serviceToast.add({
                  key: 'tst',
                  severity: 'success',
                  summary: 'Selamat',
                  detail: 'Berhasil Menghapus Data',
              });

              setTimeout(() => {
                  this.fetchDataKabupaten();
              }, 800);
          },
          error: (err) => {
              this.serviceToast.add({
                  key: 'tst',
                  severity: 'error',
                  summary: 'Maaf',
                  detail: 'Gagal Menghapus Data',
              });
              console.log(err);
          },
      });
  }
}
