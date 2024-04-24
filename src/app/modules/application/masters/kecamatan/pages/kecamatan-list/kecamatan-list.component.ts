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
import { KecamatanResp } from '../../models/kecamatan-resp.model';
import { KecamatanService } from '../../services/kecamatan.service';

@Component({
    selector: 'app-kecamatan-list',
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
    templateUrl: './kecamatan-list.component.html',
    styleUrl: './kecamatan-list.component.scss',
})
export class KecamatanListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    kecamatanId = '';
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.kecamatan

    private _imagePath = __webpack_public_path__;
    emptyImg = `${this._imagePath}assets/images/empty.svg`;

    dataSource1: KecamatanResp[] = [];

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kecamatanService: KecamatanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
    ) {}

    ngOnInit() {
        this.fetchDataKecamatan();
    }

    fetchDataKecamatan() {
        this.loading = true;
        this.kecamatanService.getKecamatan()
        .subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.kecamatan ?? [];
                this.dataCount = resp?.kecamatan.length;

                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    onClickAddKecamatan() {
        this.router.navigate(['master', 'kecamatan', 'add']);
    }

    onClickEditKecamatan(data: KecamatanResp) {
        this.kecamatanId = data.id;
        this.reviewDataService.saveReview(
            this.kecamatanId, 
            data,
            this.menuKeys
        );
        this.router.navigate(['master', 'kecamatan', 'edit', this.kecamatanId]);
    }

    onClickDeleteKecamatan(id: string) {
        this.kecamatanId = id;
        
        this.deleteDialog = true;
    }

    confirmationDel() {
          const newFormData: KecamatanResp = {
            id: this.kecamatanId,
        };

        this.kecamatanService.delKecamatan(newFormData).subscribe({
            next: (resp) => {
                this.deleteDialog = false;
                
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataKecamatan();
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
