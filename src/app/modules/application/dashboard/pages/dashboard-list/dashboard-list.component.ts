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
        this.getData();
    }

    getData() {
        this.dashboardService.getData().subscribe({
            next: (resp) => {
                this.dashboardResp = resp;
                const modifiedCalon = this.dashboardResp.color.map(color => `--${color}`);

                this.dashboardResp.color.forEach((value, index) => {
                    this.dashboardResp.color[index] = modifiedCalon[index];
                });

                this.initCharts();
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

        const colors = this.dashboardResp?.color.map(color => documentStyle.getPropertyValue(color));

        const labelPercentage = this.dashboardResp?.calon.map((c, index) => `${c} (${this.dashboardResp?.percentage[index]})`)

        const labelData = this.dashboardResp?.vote.map(v => `Persentase Suara: ${v}`)

        this.pieData = {
            labels: labelPercentage ?? [],
            datasets: [
                {
                    data: this.dashboardResp.vote ?? [],
                    backgroundColor: colors,
                    hoverBackgroundColor: colors,
                },
            ],
        };

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
