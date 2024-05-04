import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SuaraSharedComponent } from 'src/app/shared/modules/suara/components/suara-shared/suara-shared.component';
import { SuaraResp } from '../../models/suara-resp.model';

@Component({
  selector: 'app-suara-edit',
  standalone: true,
  imports: [SuaraSharedComponent],
  templateUrl: './suara-edit.component.html',
  styleUrl: './suara-edit.component.scss'
})
export class SuaraEditComponent {
  suaraId = '';

  dataSource1?: SuaraResp;
  isEditable = true;
  
  menuKey: string = Constant.menuKeys.suara;
  actionKey: string = Constant.actionKeys.editSuara;
  
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
      this.dataSource1 = currentReviewData;
    }
}
