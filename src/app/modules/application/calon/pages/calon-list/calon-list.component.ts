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
        this.calonService.getCalon().subscribe({
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
}
