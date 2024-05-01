import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SuaraMapping } from '../../models/suara-mapping.model';

@Component({
    selector: 'app-suara-detail',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './suara-detail.component.html',
    styleUrl: './suara-detail.component.scss',
})
export class SuaraDetailComponent {
    suaraId = '';

    newDataSource1?: SuaraMapping;
    spritNamaCalons: string[] = [];
    spritTotalSuara: string[] = [];
    
    menuKey: string = Constant.menuKeys.suara;
    onDestroy: Subject<void> = new Subject<void>();

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    constructor(
        protected router: Router,
        private reviewDataService: EcalegReviewDataService,
        private activatedRoute: ActivatedRoute,

    ) {}

    ngOnInit(): void {
        this.getParams();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
      }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.suaraId, this.menuKey);
        this.router.navigate(['suara']);
    }

    getParams() {
        this.activatedRoute.params
          .pipe(takeUntil(this.onDestroy))
          .subscribe((params) => {
            this.suaraId = params['id'];
            
            if (this.suaraId) {
              this.getDetailData();
            }
          });
      }
    
      getDetailData() {
        const currentReviewData = this.reviewDataService.getSavedReviewById(
          this.suaraId,
          this.menuKey,
        );
    
        this.newDataSource1 = currentReviewData.data;

        let str1 = this.newDataSource1.nama_calon;
        let str2 = this.newDataSource1.suara_calons;
        this.spritNamaCalons = str1.split(', ');
        this.spritTotalSuara = str2.split(', ');
        
      }
}
