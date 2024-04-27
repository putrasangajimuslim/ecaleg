import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { TpsSharedComponent } from 'src/app/shared/modules/tps/components/tps-shared/tps-shared.component';
import { TpsResp } from '../../models/tps-resp.model';

@Component({
    selector: 'app-tps-edit',
    standalone: true,
    imports: [TpsSharedComponent],
    templateUrl: './tps-edit.component.html',
    styleUrl: './tps-edit.component.scss',
})
export class TpsEditComponent {
    actionKey: string = Constant.actionKeys.editTPS;

    menuKey: string = Constant.menuKeys.tps;
    tpsId = '';

    dataParse?: TpsResp;

    onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private reviewDataService: EcalegReviewDataService
    ) {}

    ngOnInit(): void {
        this.getParams();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    getParams() {
        this.activatedRoute.params
            .pipe(takeUntil(this.onDestroy))
            .subscribe((params) => {
                this.tpsId = params['id'];
                if (this.tpsId) {
                    this.getKelurahanDetailData();
                }
            });
    }

    getKelurahanDetailData() {
        const currentReviewData = this.reviewDataService.getSavedReviewById(
            this.tpsId,
            this.menuKey
        );

        this.dataParse = currentReviewData;
    }
}
