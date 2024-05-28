import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { CalonResp } from '../../models/calon-resp.model';
import { CalonService } from '../../services/calon.service';

@Component({
    selector: 'app-calon-list',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        TooltipModule,
        ButtonModule,
        TableModule,
        RippleModule,
        ToastModule,
    ],
    templateUrl: './calon-list.component.html',
    styleUrl: './calon-list.component.scss',
})
export class CalonListComponent {
    loading: boolean = true;
    deleteDialog: boolean = false;

    calonId = '';

    dataSource1: CalonResp[] = [];
    dataCount: number = 0;

    menuKeys = Constant.menuKeys.calon;

    rowsPerPage: number = 10; // jumlah baris per halaman
    currentPage: number = 1; // halaman saat ini
    totalPages: number = 0;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Users',
        },
    ];

    constructor(
        protected router: Router,
        private calonService: CalonService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.calonService.getCalon(this.currentPage, this.rowsPerPage).subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.data ?? [];
                this.dataCount = resp?.data.length;
                this.totalPages = Math.ceil(resp['pagination']?.total / this.rowsPerPage);

                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    firstPage() {
        if (this.currentPage !== 1) {
            this.currentPage = 1;
            this.fetchData();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchData();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchData();
        }
    }

    lastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.fetchData();
        }
    }

    isNextDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    isLastDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    onClickAddCalon() {
        this.router.navigate(['calon', 'add']);
    }

    onClickEditCalon(data: CalonResp) {
        this.calonId = data.id;
        this.reviewDataService.saveReview(this.calonId, data, this.menuKeys);
        this.router.navigate(['calon', 'edit', this.calonId]);
    }

    onClickDeleteCalon(id: string) {
        this.calonId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.calonService.delCalon(this.calonId).subscribe({
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
}
