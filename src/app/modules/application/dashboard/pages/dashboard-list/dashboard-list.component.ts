import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { SuaraService } from '../../../suara/services/suara.service';
import { TimOneResp } from '../../../tim/models/tim-one-resp.model';
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
    barData: any;
    pieData?: DashboardMapping;
    pieOptions: any;
    barOptions: any;

    subscription: Subscription;

    isEmptyData: boolean = false;

    idLogin: string = '';
    nameLogin: string = '';

    timOneList: TimOneResp[] = [];

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    constructor(
        public layoutService: LayoutService,
        private dashboardService: DashboardService,
        private cryptoService: CryptoService, 
        private suaraService: SuaraService,
        private utils: Utils,
    ) {
        // const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');
        // if (encryptedMapping) {
        //     const decryptedMapping =
        //     this.cryptoService.decryptData(encryptedMapping);

        //     this.nameLogin = decryptedMapping.nama_panitia;
        // }

        this.idLogin = this.utils.getLocalStorage('idLogin');
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.getDataUserLogedIn();
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

                if (this.dashboardResp?.vote.every(vote => vote === 0)) {
                    this.isEmptyData = true;
                } else {
                    this.isEmptyData = false;
                }

                this.initCharts();
            },
            error: (err) => {},
        });
    }

    getDataUserLogedIn() {
        this.suaraService.getDataTimOne(this.idLogin).subscribe({
            next: (resp) => {
                this.timOneList = resp?.data ?? [];
                this.nameLogin = this.timOneList['panitia_profile'].nama_panitia;
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

        this.barData = {
            labels: labelPercentage ?? [],
            datasets: [
                {
                    label: 'Hasil Suara',
                    backgroundColor: colors,
                    data: this.dashboardResp.vote ?? []
                },
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
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
