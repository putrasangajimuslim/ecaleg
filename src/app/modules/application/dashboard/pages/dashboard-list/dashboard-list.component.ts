import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardMapping } from '../../models/dashboard-mapping.model';
import { DashboardResp } from '../../models/dashboard-resp.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard-list',
    standalone: true,
    imports: [CommonModule, ChartModule],
    templateUrl: './dashboard-list.component.html',
    styleUrl: './dashboard-list.component.scss',
})
export class DashboardListComponent {
    dashboardResp?: DashboardResp;
    pieData?: DashboardMapping;
    pieOptions: any;

    subscription: Subscription;

    constructor(
        public layoutService: LayoutService,
        private dashboardService: DashboardService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.initCharts();
        this.getData();
    }

    getData() {
        this.dashboardService.getData().subscribe({
            next: (resp) => {
                this.dashboardResp = resp;
                // this.dashboardResp.calon.forEach((item) => {
                //     this.labels.push(item);
                // });

                // this.dashboardResp.vote.forEach((item) => {
                //     this.data.push(item);
                // });

                // this.dashboardResp.color.forEach((item) => {
                //     this.color.push(item);
                // });

                console.log(this.dashboardResp);
            },
            error: (err) => {},
        });
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

            let resp: DashboardResp = {
              calon: this.dashboardResp.calon,
              vote: this.dashboardResp.vote,
              percentage: [], // Kosongkan jika tidak ada data saat ini
              // Menyesuaikan dengan data yang ada, misalnya jika ada properti lain yang ada dalam dashboardResp
            };
            
            // Inisialisasi this.pieData menggunakan resp
            this.pieData = {
              labels: resp.calon,
              datasets: [
                {
                  data: resp.vote,
                  backgroundColor: [],
                  hoverBackgroundColor: []
                }
              ]
            };
        
        // this.pieData = {
        //     labels: ['putra', 'sanga'],
        //     datasets: [
        //         {
        //             data: [540, 325],
        //             backgroundColor: [
        //                 documentStyle.getPropertyValue('--indigo-400'),
        //                 documentStyle.getPropertyValue('--blue-400'),
        //             ],
        //             hoverBackgroundColor: [
        //                 documentStyle.getPropertyValue('--indigo-400'),
        //                 documentStyle.getPropertyValue('--blue-400'),
        //             ],
        //         },
        //     ],
        // };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };
    }

    randomColor() {
        // Menghasilkan nilai acak untuk setiap komponen warna (R, G, B)
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Menggabungkan nilai-nilai tersebut untuk membentuk string warna heksadesimal
        const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

        return color;
    }
}
