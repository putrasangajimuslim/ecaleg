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
import { KelurahanResp } from '../../models/kelurahan-resp.model';
import { KelurahanService } from '../../services/kelurahan.service';

@Component({
    selector: 'app-kelurahan-list',
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
    templateUrl: './kelurahan-list.component.html',
    styleUrl: './kelurahan-list.component.scss',
})
export class KelurahanListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;

    kelId = '';
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.kelurahan;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    dataSource1: KelurahanResp[] = [];

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kelurahanService: KelurahanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchDataKelurahan();
    }

    fetchDataKelurahan() {
        this.loading = true;
        this.kelurahanService.getKelurahan().subscribe({
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

    onClickAddKelurahan() {
        this.router.navigate(['master', 'kelurahan', 'add']);
    }

    onClickEditKelurahan(data: KelurahanResp) {
        this.kelId = data.id;
        this.reviewDataService.saveReview(this.kelId, data, this.menuKeys);
        this.router.navigate(['master', 'kelurahan', 'edit', this.kelId]);
    }

    onClickDeleteKelurahan(id: string) {
        this.kelId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.kelurahanService.delKelurahan(this.kelId).subscribe({
            next: (resp) => {
                this.deleteDialog = false;

                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataKelurahan();
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
        const urlile = `${this._publicPath}assets/upload/Data Kelurahan.xlsx`;
        window.open(urlile, '_blank');
    }
}
