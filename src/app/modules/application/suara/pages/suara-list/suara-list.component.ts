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
import { Utils } from 'src/app/modules/utils/utils';
import { SuaraMapping } from '../../models/suara-mapping.model';
import { SuaraResp } from '../../models/suara-resp.model';
import { SuaraService } from '../../services/suara.service';

@Component({
    selector: 'app-suara-list',
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
    templateUrl: './suara-list.component.html',
    styleUrl: './suara-list.component.scss',
})
export class SuaraListComponent {
    display: boolean = false;
    loading: boolean = true;
    deleteDialog: boolean = false;
    suaraId = '';
    nameLogin: string = '';
    dataSource1: SuaraResp[] = [];
    newDataSource1: SuaraMapping[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.suara;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Suara',
        },
    ];

    constructor(
        protected router: Router,
        private suaraService: SuaraService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
        private utils: Utils
    ) {}

    ngOnInit() {
        this.fetchData();
        this.nameLogin = this.utils.getLocalStorage('nama_panitia');
    }

    fetchData() {
        this.loading = true;
        this.suaraService.getSuara().subscribe({
            next: (resp) => {
                const data = resp?.data ?? [];
                this.dataSource1 = data;
                this.dataCount = resp?.data.length;

                this.dataSource1 = data.map(item => ({
                    id: item.id,
                    suara_calons: item.suara_calons,
                    url_c1: item.url_c1,
                    input_by: this.nameLogin,
                    name_kabupaten: item['suara_calons'][0].calon.kabupatenId,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }));

                // for (let index = 0; index < this.dataSource1.length; index++) {
                //     let suaraCalons = this.dataSource1[index].suara_calons;
                //     let createdAt = this.dataSource1[index].createdAt;
                //     let updatedAt = this.dataSource1[index].updatedAt;
                
                //     let calons = [];
                //     let totalSuara = [];
                //     for (let i = 0; i < suaraCalons.length; i++) {
                //         calons.push(suaraCalons[i].calon.nama_calon);
                //         totalSuara.push(suaraCalons[i].total_suara);
                        
                //         // textCalons += calon; // Tambahkan nama calon ke string
                //         // if (i !== suaraCalons.length - 1) {
                //         //     textCalons += ', '; // Tambahkan koma jika bukan calon terakhir
                //         // }   
                //         // textTotalSuara += suara; // Tambahkan nama calon ke string
                //         // if (i !== suaraCalons.length - 1) {
                //         //     textTotalSuara += ', '; // Tambahkan koma jika bukan calon terakhir
                //         // }   
                //     }

                //     let data: SuaraMapping = {
                //         id: this.dataSource1[index].id,
                //         nama_calon: calons,
                //         suara_calons: totalSuara,
                //         url_c1: this.dataSource1[index].url_c1,
                //         input_by: this.dataSource1[index].input_by,
                //         createdAt: createdAt,
                //         updatedAt: updatedAt,
                //     }

                //     this.newDataSource1.push(data);
                // }
                
                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    onClickAddSuara() {
        this.router.navigate(['suara', 'add']);
    }

    onClickEditSuara(data: SuaraResp) {
        this.suaraId = data.id;
        this.reviewDataService.saveReview(this.suaraId, data, this.menuKeys);
        this.router.navigate(['suara', 'edit', this.suaraId]);
    }

    onClickDetailSuara(data: SuaraResp) {
        this.suaraId = data.id;
        this.reviewDataService.saveReview(this.suaraId, data, this.menuKeys);
        this.router.navigate(['suara', this.suaraId, 'detail']);
    }

    onClickDeleteSuara(id: string) {
        this.suaraId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.suaraService.del(this.suaraId).subscribe({
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
