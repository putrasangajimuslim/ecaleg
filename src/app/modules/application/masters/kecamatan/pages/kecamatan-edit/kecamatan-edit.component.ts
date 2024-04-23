import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { KecamatanSharedComponent } from 'src/app/shared/modules/kecamatan/components/kecamatan-shared/kecamatan-shared.component';
import { AddKecamatanResp } from '../../models/kecamatan-resp.model';

@Component({
  selector: 'app-kecamatan-edit',
  standalone: true,
  imports: [KecamatanSharedComponent],
  templateUrl: './kecamatan-edit.component.html',
  styleUrl: './kecamatan-edit.component.scss'
})
export class KecamatanEditComponent {
  actionKey: string = Constant.actionKeys.editKecamatan;
  menuKey: string = Constant.menuKeys.kecamatan;
  kecamatanId = '';

  dataParse?: AddKecamatanResp;

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
        this.kecamatanId = params['id'];
        if (this.kecamatanId) {
          this.getKecamatanDetailData();
        }
      });
  }

  getKecamatanDetailData() {
    const currentReviewData = this.reviewDataService.getSavedReviewById(
      this.kecamatanId,
      this.menuKey,
    );

    this.dataParse = currentReviewData;
  }
}
