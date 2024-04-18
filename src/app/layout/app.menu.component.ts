import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                items: [
                    {
                        label: 'Master',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Kabupaten',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Kecamatan',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Kelurahan',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Partai',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Calon',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'TPS',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Suara',
                        icon: 'pi pi-fw pi-volume-up',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
        ];
    }
}
