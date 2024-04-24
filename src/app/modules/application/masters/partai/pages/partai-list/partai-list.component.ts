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
import { PartaiResp } from '../../models/partai-resp.model';
import { PartaiService } from '../../services/partai.service';

@Component({
    selector: 'app-partai-list',
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
    templateUrl: './partai-list.component.html',
    styleUrl: './partai-list.component.scss',
})
export class PartaiListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;

    partaiId: string = '';
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.partai;

    private _imagePath = __webpack_public_path__;
    emptyImg = `${this._imagePath}assets/images/empty.svg`;

    dataSource1: PartaiResp[] = [];

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private partaiService: PartaiService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchDataPartai();
    }

    onClickAddPartai() {
        this.router.navigate(['master', 'partai', 'add']);
    }

    onClickEditPartai(data: PartaiResp) {
        this.partaiId = data.id;
        this.reviewDataService.saveReview(this.partaiId, data, this.menuKeys);
        this.router.navigate(['master', 'partai', 'edit', this.partaiId]);
    }

    onClickDeletePartai(id: string) {
        this.partaiId = id;
        
        this.deleteDialog = true;
    }

    confirmationDel() {
        const newFormData: PartaiResp = {
            id: this.partaiId,
        };

        this.partaiService.delPartai(newFormData).subscribe({
            next: (resp) => {
                this.deleteDialog = false;

                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataPartai();
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

    fetchDataPartai() {
        this.loading = true;
        this.partaiService.getPartai().subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.partai ?? [];
                this.dataCount = resp?.partai.length;

                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }
}
