import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { TimSharedComponent } from 'src/app/shared/modules/tim/components/tim-shared/tim-shared.component';
import { TimResp } from '../../../models/tim-resp.model';

@Component({
  selector: 'app-panitia-edit',
  standalone: true,
  imports: [TimSharedComponent],
  templateUrl: './panitia-edit.component.html',
  styleUrl: './panitia-edit.component.scss'
})
export class PanitiaEditComponent {
  actionKey: string = Constant.actionKeys.editTim;

  menuKey: string = Constant.menuKeys.tim;
  panitiaId = '';

  dataParse?: TimResp;

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
        this.panitiaId = params['id'];
        if (this.panitiaId) {
          this.getDetailData();
        }
      });
  }

  getDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.panitiaId,
      this.menuKey,
    );

    this.dataParse = currentReviewData;
  }
}
