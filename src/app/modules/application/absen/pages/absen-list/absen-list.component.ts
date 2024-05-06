import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { AbsenResp } from '../../models/absen-resp.model';
import { AbsenService } from '../../services/absen.service';

@Component({
  selector: 'app-absen-list',
  standalone: true,
  imports: [
      CommonModule,
      DialogModule,
      FormsModule,
      TooltipModule,
      ButtonModule,
      TableModule,
      RippleModule,
      ToastModule,
  ],
  templateUrl: './absen-list.component.html',
  styleUrl: './absen-list.component.scss'
})
export class AbsenListComponent {
  loading: boolean = true;
  deleteDialog: boolean = false;

  calonId = '';

  dataSource1: AbsenResp[] = [];
  dataCount: number = 0;

  menuKeys = Constant.menuKeys.absen;

  status: string = '';

  private _publicPath = __webpack_public_path__;
  emptyImg = `${this._publicPath}assets/images/empty.svg`;

  breadcrumbItems: MenuItem[] = [
      {
          label: 'Users',
      },
  ];

  constructor(
      protected router: Router,
      private absenService: AbsenService,
      private reviewDataService: EcalegReviewDataService,
      private serviceToast: MessageService
  ) {}

  ngOnInit() {
      this.fetchData();
  }

  fetchData() {
      this.loading = true;
      this.absenService.getAbsen().subscribe({
          next: (resp) => {
              this.dataSource1 = resp?.data ?? [];
              this.dataCount = resp?.data.length;

              if(this.dataCount > 0) {
                this.status = 'IsLogged';
              }

              setTimeout(() => {
                  this.loading = false;
              }, 800);
          },
          error: (err) => {
              this.loading = false;
          },
      });
  }
}
