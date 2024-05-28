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
import { KecamatanResp } from '../../models/kecamatan-resp.model';
import * as XLSX from 'xlsx';
import { KecamatanService } from '../../services/kecamatan.service';
import { KecamatanReq } from '../../models/kecamatan-req.model';
import { KabupatenResp } from '../../../kabupaten/models/kabupaten-resp.model';

@Component({
    selector: 'app-kecamatan-list',
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
    templateUrl: './kecamatan-list.component.html',
    styleUrl: './kecamatan-list.component.scss',
})
export class KecamatanListComponent {
    @ViewChild('fileInput') fileInput: ElementRef;
    
    display: boolean = false;
    loading: boolean = true;
    loadingUploads: boolean = false;
    succesRespUpload: boolean = true;
    deleteDialog: boolean = false;
    kecamatanId = '';
    dataCount: number = 0;

    rowsPerPage: number = 10; // jumlah baris per halaman
    currentPage: number = 1; // halaman saat ini
    totalPages: number = 0;

    menuKeys = Constant.menuKeys.kecamatan

    private _publicPath = __webpack_public_path__;
    emptyImg = `${this._publicPath}assets/images/empty.svg`;

    dataSource1: KecamatanResp[] = [];

    KabupatenList: KabupatenResp[] = [];

    breadcrumbItems: MenuItem[] = [
        {
            label: 'Kabupaten',
        },
    ];

    constructor(
        protected router: Router,
        private kecamatanService: KecamatanService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService,
    ) {}

    ngOnInit() {
        this.fetchDataKecamatan();
        this.fetchAllDataKabupaten();
    }

    fetchDataKecamatan() {
        this.loading = true;
        this.kecamatanService.getKecamatan(this.currentPage, this.rowsPerPage)
        .subscribe({
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

    fetchAllDataKabupaten() {
        this.KabupatenList = []; // Kosongkan array data sebelum mengambil data baru
        this.currentPage = 1; // Reset halaman saat ini
        this.getKodeKabupaten(this.currentPage);
    }
    
    getKodeKabupaten(page: number) {
        this.kecamatanService.getKodeKabupaten(page, this.rowsPerPage).subscribe({
            next: (resp) => {
                const newData = resp?.data ?? [];
                
                // Tambahkan data baru ke KabupatenList
                this.KabupatenList = [...this.KabupatenList, ...newData];
    
                // Perbarui dataCount dan totalPages
                this.dataCount = resp['pagination']?.total ?? 0;
                this.totalPages = Math.ceil(this.dataCount / this.rowsPerPage);                
    
                // Jika ada halaman berikutnya, ambil data dari halaman berikutnya
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.getKodeKabupaten(this.currentPage);
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
                    detail: 'Gagal Memuat Data',
                });
                this.loading = false; // Hentikan loading jika terjadi error
            },
        });
    }

    firstPage() {
        if (this.currentPage !== 1) {
            this.currentPage = 1;
            this.fetchDataKecamatan();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchDataKecamatan();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchDataKecamatan();
        }
    }

    lastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.fetchDataKecamatan();
        }
    }

    isNextDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    isLastDisabled(): boolean {
        return this.currentPage === this.totalPages;
    }

    onClickAddKecamatan() {
        this.router.navigate(['master', 'kecamatan', 'add']);
    }

    onClickEditKecamatan(data: KecamatanResp) {
        this.kecamatanId = data.id;
        this.reviewDataService.saveReview(
            this.kecamatanId, 
            data,
            this.menuKeys
        );
        this.router.navigate(['master', 'kecamatan', 'edit', this.kecamatanId]);
    }

    onClickDeleteKecamatan(id: string) {
        this.kecamatanId = id;
        
        this.deleteDialog = true;
    }

    confirmationDel() {
        this.kecamatanService.delKecamatan(this.kecamatanId).subscribe({
            next: (resp) => {
                this.deleteDialog = false;
                
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Selamat',
                    detail: 'Berhasil Menghapus Data',
                });

                setTimeout(() => {
                    this.fetchDataKecamatan();
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
        const urlile = `${this._publicPath}assets/upload/Data Kecamatan.xlsx`;
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

            const kabupatenList = this.KabupatenList.find(kabupaten => kabupaten.nama_kabupaten === value[0]);
            const kabupatenId = kabupatenList ? kabupatenList.id : null;
            
            const newFormData: KecamatanReq = {
                kabupatenId: kabupatenId,
                kode_kecamatan: value[1],
                nama_kecamatan: value[2],
                jumlah_DPT: parseFloat(value[3]),
            };
            
            this.kecamatanService.addKecamatan(newFormData).subscribe({
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
