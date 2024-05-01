import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { CalonSharedComponent } from 'src/app/shared/modules/calon/components/calon-shared/calon-shared.component';
import { CalonResp } from '../../models/calon-resp.model';

@Component({
  selector: 'app-calon-edit',
  standalone: true,
  imports: [CalonSharedComponent],
  templateUrl: './calon-edit.component.html',
  styleUrl: './calon-edit.component.scss'
})
export class CalonEditComponent {
  actionKey: string = Constant.actionKeys.editCalon;

  menuKey: string = Constant.menuKeys.calon;
  calonId = '';

  dataParse?: CalonResp;

  onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reviewDataService: EcalegReviewDataService,
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
        this.calonId = params['id'];
        if (this.calonId) {
          this.getDetailData();
        }
      });
  }

  getDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.calonId,
      this.menuKey,
    );

    this.dataParse = currentReviewData
  }
}
