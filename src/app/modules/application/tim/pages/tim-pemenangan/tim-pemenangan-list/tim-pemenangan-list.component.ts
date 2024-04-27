import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import {
  TimPemenanganResp
} from '../../../models/tim-pemenangan-resp.model';
import { TimPemenanganService } from '../../../services/tim-pemenangan.service';

@Component({
    selector: 'app-tim-pemenangan-list',
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
    templateUrl: './tim-pemenangan-list.component.html',
    styleUrl: './tim-pemenangan-list.component.scss',
})
export class TimPemenanganListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    timPMID = '';
    dataSource1: TimPemenanganResp[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.timPemengangan;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Tim Pemenangan',
        },
    ];

    constructor(
        protected router: Router,
        private timPemenanganService: TimPemenanganService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.timPemenanganService.getData().subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.data ?? [];
                this.dataCount = resp?.data.length;

                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    onClickAddTimPM() {
        this.router.navigate(['tim', 'tim-pemenangan', 'add']);
    }

    onClickEditTimPM(data: TimPemenanganResp) {
        this.timPMID = data.id;
        this.reviewDataService.saveReview(this.timPMID, data, this.menuKeys);
        this.router.navigate(['tim', 'tim-pemenangan', 'edit', this.timPMID]);
    }

    onClickDeleteTimPM(id: string) {
        this.timPMID = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.timPemenanganService.del(this.timPMID).subscribe({
            next: (resp) => {
                this.deleteDialog = false;

                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchData();
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

    downloadFile() {
        const urlile = `${this._publicPath}assets/upload/Data Kabupaten.xlsx`;
        window.open(urlile, '_blank');
    }
}
