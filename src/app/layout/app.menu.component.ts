import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from '../modules/service/crypto/crypto.service';
import { Utils } from '../modules/utils/utils';
import { AppMenuitemComponent } from './app.menuitem.component';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role: string = '';

    constructor(public layoutService: LayoutService, private utils: Utils, private router: Router, private cryptoService: CryptoService, ) 
    { 
        const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

        if (encryptedMapping) {
            const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);

            this.role = decryptedMapping.role;
        }
    }

    ngOnInit() {
        if (this.role === 'admin' || this.role === 'superadmin') {
            this.model = [
                {
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'] }
                    ]
                },
                // {
                //     items: [
                //         { label: 'User Profile', icon: 'pi pi-fw pi-user', routerLink: ['user-profile'] }
                //     ]
                // },
                {
                    items: [
                        {
                            label: 'Master',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                {
                                    label: 'Kabupaten',
                                    icon: 'pi pi-fw pi-file',
                                    routerLink: ['master/kabupaten']
                                },
                                {
                                    label: 'Kecamatan',
                                    icon: 'pi pi-fw pi-file',
                                    routerLink: ['master/kecamatan']
                                },
                                {
                                    label: 'Kelurahan',
                                    icon: 'pi pi-fw pi-file',
                                    routerLink: ['master/kelurahan']
                                },
                                {
                                    label: 'Partai',
                                    icon: 'pi pi-fw pi-file',
                                    routerLink: ['master/partai']
                                }
                            ]
                        },
                        // {
                        //     label: 'Jadwal',
                        //     icon: 'pi pi-fw pi-calendar',
                        //     routerLink: ['jadwal']
                        // },
                        {
                            label: 'Tim',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                // {
                                //     label: 'Tim Pemenangan',
                                //     icon: 'pi pi-fw pi-users',
                                //     routerLink: ['tim/tim-pemenangan']
                                // },
                                // {
                                //     label: 'Relawan',
                                //     icon: 'pi pi-fw pi-users',
                                //     routerLink: ['master/kecamatan']
                                // },
                                // {
                                //     label: 'Pendukung',
                                //     icon: 'pi pi-fw pi-users',
                                //     routerLink: ['master/kelurahan']
                                // },
                                {
                                    label: 'Panitia',
                                    icon: 'pi pi-fw pi-users',
                                    routerLink: ['tim/panitia']
                                },
                            ]
                        },
                        {
                            label: 'Absen',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['absen']
                        },
                        {
                            label: 'Calon',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['calon']
                        },
                        {
                            label: 'TPS',
                            icon: 'pi pi-fw pi-box',
                            routerLink: ['tps']
                        },
                        {
                            label: 'Suara',
                            icon: 'pi pi-fw pi-volume-up',
                            routerLink: ['suara']
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-sign-out',
                            routerLink: ['login'],
                            command: () => this.logout()
                        },
                    ]
                },
            ];
        } else {
            this.model = [
                {
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'] }
                    ]
                },
                // {
                //     items: [
                //         { label: 'User Profile', icon: 'pi pi-fw pi-user', routerLink: ['user-profile'] }
                //     ]
                // },
                {
                    items: [
                        {
                            label: 'Suara',
                            icon: 'pi pi-fw pi-volume-up',
                            routerLink: ['suara']
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-sign-out',
                            routerLink: ['login'],
                            command: () => this.logout()
                        },
                    ]
                },
            ];
        }
    }

    logout() {
        this.utils.clearAllLocalstorage();
        this.router.navigate(['login']);
    }
}
