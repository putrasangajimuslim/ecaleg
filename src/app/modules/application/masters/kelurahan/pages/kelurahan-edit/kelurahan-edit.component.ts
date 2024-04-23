import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { KelurahanSharedComponent } from 'src/app/shared/modules/kelurahan/components/kelurahan-shared/kelurahan-shared.component';
import { AddKelurahanResp } from '../../models/kelurahan-resp.model';

@Component({
  selector: 'app-kelurahan-edit',
  standalone: true,
  imports: [KelurahanSharedComponent],
  templateUrl: './kelurahan-edit.component.html',
  styleUrl: './kelurahan-edit.component.scss'
})
export class KelurahanEditComponent {
  actionKey: string = Constant.actionKeys.editKelurahan;

  menuKey: string = Constant.menuKeys.kelurahan;
  kelId = '';

  dataParse?: AddKelurahanResp;

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
        this.kelId = params['id'];
        if (this.kelId) {
          this.getKelurahanDetailData();
        }
      });
  }

  getKelurahanDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.kelId,
      this.menuKey,
    );

    this.dataParse = currentReviewData
  }
}
