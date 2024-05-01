import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import {
  AbsenResp,
  DropdownItems,
} from 'src/app/modules/application/absen/models/absen-resp.model';
import { AbsenService } from 'src/app/modules/application/absen/services/absen.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';

@Component({
    selector: 'app-absen-shared',
    standalone: true,
    imports: [],
    templateUrl: './absen-shared.component.html',
    styleUrl: './absen-shared.component.scss',
})
export class AbsenSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: AbsenResp;
    title: string;
    btnTitle: string;

    absenId: string = '';
    user_id: string = '';
    foto: string = '';
    status_absen: string = '';
    lat: string = '';
    long: string = '';

    AbsenList: AbsenResp[] = [];

    dropdownItem: DropdownItems[] = [];

    menuKeys = Constant.menuKeys.absen;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private absenService: AbsenService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.getDataUsers();
    }

    getDataUsers() {
        this.absenService.getUsers().subscribe({
            next: (resp) => {
                this.AbsenList = resp?.data ?? [];
                this.AbsenList.forEach((element) => {
                    this.dropdownItem.push({
                        name: element.user_id,
                        code: element.id.toString(),
                    });
                });

                this.buildForm();
            },
            error: (err) => {
                this.serviceToast.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Maaf',
                    detail: 'Gagal Memuat Data',
                });
                this.buildForm();
            },
        });
    }

    buildForm() {
        if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.addCalon?.toLocaleLowerCase()
        ) {
            this.title = Constant.calonShared.addTitle;
            this.btnTitle = Constant.calonShared.btnTitleAdd;
        } else if (
            this.actionKey?.toLocaleLowerCase() ===
            Constant.actionKeys.editCalon?.toLocaleLowerCase()
        ) {
            this.title = Constant.calonShared.editTitle;
            this.btnTitle = Constant.calonShared.btnTitleEdit;
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.absenId, this.menuKeys);
        this.router.navigate(['absen']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            user_id: new FormControl('', Validators.required),
            foto: new FormControl('', Validators.required),
            status_absen: new FormControl('', Validators.required),
            lat: new FormControl('', Validators.required),
            long: new FormControl('', Validators.required),
        });
    }
}
