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
import { TimResp } from '../../../models/tim-resp.model';
import { TimService } from '../../../services/tim.service';

@Component({
    selector: 'app-panitia-list',
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
    templateUrl: './panitia-list.component.html',
    styleUrl: './panitia-list.component.scss',
})
export class PanitiaListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    userId = '';
    dataSource1: any[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.tim;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Tim',
        },
    ];

    constructor(
        protected router: Router,
        private timService: TimService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.timService.getData().subscribe({
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

    onClickAddTim() {
        this.router.navigate(['tim', 'panitia', 'add']);
    }

    onClickEditTim(data: TimResp) {
        this.userId = data.id;
        this.reviewDataService.saveReview(this.userId, data, this.menuKeys);
        this.router.navigate(['tim', 'panitia', 'edit', this.userId]);
    }

    onClickDeleteTim(id: string) {
        this.userId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.timService.del(this.userId).subscribe({
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
