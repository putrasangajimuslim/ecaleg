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
import { JadwalResp } from '../../models/jadwal-resp.model';
import { JadwalService } from '../../services/jadwal.service';

@Component({
    selector: 'app-jadwal-list',
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
    templateUrl: './jadwal-list.component.html',
    styleUrl: './jadwal-list.component.scss',
})
export class JadwalListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    kabId = '';
    dataSource1: JadwalResp[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.jadwal;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private jadwalService: JadwalService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.jadwalService.getData().subscribe({
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

    onClickAddJadwal() {
        this.router.navigate(['jadwal', 'add']);
    }

    onClickEditJadwal(data: JadwalResp) {
        this.kabId = data.id;
        this.reviewDataService.saveReview(this.kabId, data, this.menuKeys);
        this.router.navigate(['jadwal', 'edit', this.kabId]);
    }

    onClickDeleteJadwal(id: string) {
        this.kabId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.jadwalService.del(this.kabId).subscribe({
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
