import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { KabupatenResp } from '../../models/kabupaten-resp.model';
import { KabupatenService } from '../../services/kabupaten.service';
import { SharedModule } from 'src/app/shared/shared.module';
import * as XLSX from 'xlsx';
import { KabupatenReq } from '../../models/kabupaten-req.model';

@Component({
    selector: 'app-kabupaten-list',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        TooltipModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        RippleModule,
        ToastModule,
        SharedModule
    ],
    templateUrl: './kabupaten-list.component.html',
    styleUrl: './kabupaten-list.component.scss',
})
export class KabupatenListComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    
    display: boolean = false;
    loading: boolean = true;
    loadingUploads: boolean = false;
    succesRespUpload: boolean = true;
    deleteDialog: boolean = false;
    kabId = '';
    dataSource1: KabupatenResp[] = [];
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.kabupaten;

    rowsPerPage: number = 10; // jumlah baris per halaman
    currentPage: number = 1; // halaman saat ini
    totalPages: number = 0;

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kabupatenService: KabupatenService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchDataKabupaten();
    }

    fetchDataKabupaten() {
        this.loading = true;
        this.kabupatenService.getKabupaten(this.currentPage, this.rowsPerPage).subscribe({
            next: (resp) => {
                this.dataSource1 = resp?.data ?? [];
                this.dataCount = resp?.data.length;
                this.totalPages = Math.ceil(resp['pagination']?.total / this.rowsPerPage);
                
                setTimeout(() => {
                    this.loading = false;
                }, 800);
            },
            error: (err) => {
                this.loading = false;
            },
        });
    }

    firstPage() {
        if (this.currentPage !== 1) {
            this.currentPage = 1;
            this.fetchDataKabupaten();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchDataKabupaten();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchDataKabupaten();
        }
    }

    lastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.fetchDataKabupaten();
        }
    }

    isNextDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    isLastDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    onClickAddKabupaten() {
        this.router.navigate(['master', 'kabupaten', 'add']);
    }

    onClickEditKabupaten(data: KabupatenResp) {
        this.kabId = data.id;
        this.reviewDataService.saveReview(this.kabId, data, this.menuKeys);
        this.router.navigate(['master', 'kabupaten', 'edit', this.kabId]);
    }

    onClickDeleteKabupaten(id: string) {
        this.kabId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.kabupatenService.delKabupaten(this.kabId).subscribe({
            next: (resp) => {
                this.deleteDialog = false;

                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataKabupaten();
                }, 800);
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Menghapus Data',
                });
                console.log(err);
            },
        });
    }

    downloadFile() {
        const urlile = `${this._publicPath}assets/upload/Data Kabupaten.xlsx`;
        window.open(urlile, '_blank');
    }

    onUploadButtonClick(): void {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        this.loadingUploads = true;
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const fileName = file.name;
            if (this.isXlsxFile(fileName)) {
                this.readExcelFile(file);
            } else {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Upload File dikarenakan tidak sesuai dan harus bentuk Xlsx',
                });

                this.fileInput.nativeElement.value = '';  // Clear the input value to allow re-selection
                setTimeout(() => {
                    this.loadingUploads = false;
                }, 800);
            }
        }
    }

    isXlsxFile(fileName: string): boolean {
        const extension = fileName.split('.').pop();
        return extension === 'xlsx';
    }

    readExcelFile(file: File): void {
        const reader = new FileReader();

        // let newDataCell = [];
        reader.onload = (e: any) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

            this.processExcelData(data);
        };
      
        reader.readAsBinaryString(file);
    }

    processExcelData(data: any[]) {
        this.loadingUploads = true;
        const rows = data.slice(1);

        let completedRequests = 0;
        
        rows.forEach((value, index) => {
            const newFormData: KabupatenReq = {
                kode_kabupaten: value[0],
                nama_kabupaten: value[1],
                jumlah_DPT: parseFloat(value[2]),
            };
            
            this.kabupatenService.addKabupaten(newFormData).subscribe({
                next: (resp) => {
                    completedRequests++;
                    if (completedRequests === rows.length) {
                        this.finalizeProcess(this.succesRespUpload);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.succesRespUpload = false;
                },
            });
        });
    }

    finalizeProcess(success: boolean): void {
        if (success) {
            this.serviceToast.add({
                key: 'tst',
                severity: 'success',
                summary: 'Selamat',
                detail: 'Berhasil Menyimpan Data',
            });
    
            setTimeout(() => {
                location.reload();
                this.loadingUploads = false;
            }, 800);
        } else {
            this.serviceToast.add({
                key: 'tst',
                severity: 'error',
                summary: 'Maaf',
                detail: 'Gagal Menyimpan Data',
            });
    
            setTimeout(() => {
                this.loadingUploads = false;
            }, 800);
        }
    }
}
