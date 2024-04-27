import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { TpsResp } from '../../models/tps-resp.model';
import { TpsService } from '../../services/tps.service';

@Component({
    selector: 'app-tps-list',
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
    templateUrl: './tps-list.component.html',
    styleUrl: './tps-list.component.scss',
})
export class TpsListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;

    tpsId: string = '';
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.tps;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    dataSource1: TpsResp[] = [];

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        protected router: Router,
        private tpsService: TpsService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchDataTPS();
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            doc: new FormControl(''),
        });
    }

    fetchDataTPS() {
        this.loading = true;
        this.tpsService.getTPS().subscribe({
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

    onClickAddTPS() {
        this.router.navigate(['tps', 'add']);
    }

    onClickEditTps(data: TpsResp) {
        this.tpsId = data.id;
        this.reviewDataService.saveReview(this.tpsId, data, this.menuKeys);
        this.router.navigate(['tps', 'edit', this.tpsId]);
    }

    onClickDeleteTps(id: string) {
        this.tpsId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.tpsService.del(this.tpsId).subscribe({
            next: (resp) => {
                this.deleteDialog = false;
                
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataTPS();
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

    uploadFile(event) {
    }

    downloadFile() {
        const urlile = `${this._publicPath}assets/upload/Data TPS.xlsx`;
        window.open(urlile, '_blank');
    }
}
