import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { JadwalSharedComponent } from 'src/app/shared/modules/jadwal/components/jadwal-shared/jadwal-shared.component';
import { JadwalResp } from '../../models/jadwal-resp.model';

@Component({
    selector: 'app-jadwal-edit',
    standalone: true,
    imports: [JadwalSharedComponent],
    templateUrl: './jadwal-edit.component.html',
    styleUrl: './jadwal-edit.component.scss',
})
export class JadwalEditComponent {
    actionKey: string = Constant.actionKeys.editJadwal;

    menuKey: string = Constant.menuKeys.jadwal;
    jadwalId = '';

    dataParse?: JadwalResp;

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
                this.jadwalId = params['id'];
                if (this.jadwalId) {
                    this.getDetailData();
                }
            });
    }

    getDetailData() {
        const currentReviewData = this.reviewDataService.getSavedReviewById(
            this.jadwalId,
            this.menuKey
        );

        this.dataParse = currentReviewData;
    }
}
