import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Constant } from 'src/app/config/constant';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { KelurahanResp } from '../../models/kelurahan-resp.model';
import { KelurahanService } from '../../services/kelurahan.service';
import * as XLSX from 'xlsx';
import { KecamatanResp } from '../../../kecamatan/models/kecamatan-resp.model';
import { KecamatanReq } from '../../../kecamatan/models/kecamatan-req.model';
import { KelurahanReq } from '../../models/kelurahan-req.model';

@Component({
    selector: 'app-kelurahan-list',
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
    ],
    templateUrl: './kelurahan-list.component.html',
    styleUrl: './kelurahan-list.component.scss',
})
export class KelurahanListComponent {
    @ViewChild('fileInput') fileInput: ElementRef;
    
    display: boolean = false;
    loading: boolean = true;
    loadingUploads: boolean = false;
    succesRespUpload: boolean = true;
    deleteDialog: boolean = false;

    kelId = '';
    dataCount: number = 0;
    menuKeys = Constant.menuKeys.kelurahan;

    rowsPerPage: number = 10; // jumlah baris per halaman
    currentPage: number = 1; // halaman saat ini
    totalPages: number = 0;
    
    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    dataSource1: KelurahanResp[] = [];

    KecamatanList?: KecamatanResp[] = [];

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kelurahanService: KelurahanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit() {
        this.fetchDataKelurahan();
        this.fetchAllDataKecamatan();
    }

    fetchDataKelurahan() {
        this.loading = true;
        this.kelurahanService.getKelurahan(this.currentPage, this.rowsPerPage).subscribe({
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

    fetchAllDataKecamatan() {
        this.KecamatanList = []; // Kosongkan array data sebelum mengambil data baru
        this.currentPage = 1;
        this.getKodeKecamatan(this.currentPage);
    }

    getKodeKecamatan(page: number) {
        this.kelurahanService.getKodeKecamatan(page, this.rowsPerPage).subscribe({
            next: (resp) => {
                const newData = resp?.data ?? [];
                
                // Tambahkan data baru ke KabupatenList
                this.KecamatanList = [...this.KecamatanList, ...newData];
    
                // Perbarui dataCount dan totalPages
                this.dataCount = resp['pagination']?.total ?? 0;
                this.totalPages = Math.ceil(this.dataCount / this.rowsPerPage);                
    
                // Jika ada halaman berikutnya, ambil data dari halaman berikutnya
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.getKodeKecamatan(this.currentPage);
                } else {
                    // Jika sudah selesai mengambil semua data, hentikan loading
                    this.loading = false;
                }
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Menyimpan Data',
                });
            },
        });
    }

    firstPage() {
        if (this.currentPage !== 1) {
            this.currentPage = 1;
            this.fetchDataKelurahan();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchDataKelurahan();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchDataKelurahan();
        }
    }

    lastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.fetchDataKelurahan();
        }
    }

    isNextDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    isLastDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    onClickAddKelurahan() {
        this.router.navigate(['master', 'kelurahan', 'add']);
    }

    onClickEditKelurahan(data: KelurahanResp) {
        this.kelId = data.id;
        this.reviewDataService.saveReview(this.kelId, data, this.menuKeys);
        this.router.navigate(['master', 'kelurahan', 'edit', this.kelId]);
    }

    onClickDeleteKelurahan(id: string) {
        this.kelId = id;

        this.deleteDialog = true;
    }

    confirmationDel() {
        this.kelurahanService.delKelurahan(this.kelId).subscribe({
            next: (resp) => {
                this.deleteDialog = false;

                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataKelurahan();
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
        const urlile = `${this._publicPath}assets/upload/Data Kelurahan.xlsx`;
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

            const kecamatanList = this.KecamatanList.find(kecamatan => kecamatan.nama_kecamatan === value[0]);
            const kecamatanId = kecamatanList ? kecamatanList.id : null;

            const newFormData: KelurahanReq = {
                kecamatanId: kecamatanId,
                nama_kelurahan: value[1],
            };
            
            this.kelurahanService.addKelurahan(newFormData).subscribe({
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
