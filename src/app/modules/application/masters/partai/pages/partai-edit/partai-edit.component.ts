import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { PartaiSharedComponent } from 'src/app/shared/modules/partai/components/partai-shared/partai-shared.component';
import { PartaiResp } from '../../models/partai-resp.model';

@Component({
  selector: 'app-partai-edit',
  standalone: true,
  imports: [PartaiSharedComponent],
  templateUrl: './partai-edit.component.html',
  styleUrl: './partai-edit.component.scss'
})
export class PartaiEditComponent {
  actionKey: string = Constant.actionKeys.editPartai;

  menuKey: string = Constant.menuKeys.partai;
  partaiId = '';

  dataParse?: PartaiResp;

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
        this.partaiId = params['id'];
        if (this.partaiId) {
          this.getPartaiDetailData();
        }
      });
  }

  getPartaiDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.partaiId,
      this.menuKey,
    );

    this.dataParse = currentReviewData
  }
}
