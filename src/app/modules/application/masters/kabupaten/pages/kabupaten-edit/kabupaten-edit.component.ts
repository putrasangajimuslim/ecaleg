import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { KabupatenSharedComponent } from 'src/app/shared/modules/kabupaten/components/kabupaten-shared/kabupaten-shared.component';
import { AddKabupatenResp } from '../../models/kabupaten-resp.model';

@Component({
  selector: 'app-kabupaten-edit',
  standalone: true,
  imports: [KabupatenSharedComponent],
  templateUrl: './kabupaten-edit.component.html',
  styleUrl: './kabupaten-edit.component.scss'
})
export class KabupatenEditComponent implements OnInit, OnDestroy{
  actionKey: string = Constant.actionKeys.editKabupaten;

  menuKey: string = Constant.menuKeys.kabupaten;
  kabId = '';

  dataParse?: AddKabupatenResp;

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
        this.kabId = params['id'];
        if (this.kabId) {
          this.getKabupatenDetailData();
        }
      });
  }

  getKabupatenDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.kabId,
      this.menuKey,
    );

    this.dataParse = currentReviewData;
  }
}
