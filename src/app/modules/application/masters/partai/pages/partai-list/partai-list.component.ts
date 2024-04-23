import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-partai-list',
    standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        FormsModule,
    ],
    templateUrl: './partai-list.component.html',
    styleUrl: './partai-list.component.scss',
})
export class PartaiListComponent {
    cols: any[] = [];
    display: boolean = false;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(protected router: Router) {}

    ngOnInit() {
        this.initCols();
    }

    initCols() {
        this.cols = [
            { field: 'kodekab', header: 'kodekab' },
            { field: 'nama_kabupaten', header: 'nama_kabupaten' },
            { field: 'jml_dpt', header: 'jml_dpt' },
        ];
    }

    onClickAddKabupaten() {
        this.router.navigate(['master', 'kabupaten', 'add']);
    }

    onClickEditKabupaten(id: number) {
        this.router.navigate(['master', 'kabupaten', 'edit', id]);
    }
}
