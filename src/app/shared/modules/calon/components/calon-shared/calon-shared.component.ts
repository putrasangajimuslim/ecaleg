import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { CalonResp, DropdownItems } from 'src/app/modules/application/calon/models/calon-resp.model';
import { CalonService } from 'src/app/modules/application/calon/services/calon.service';
import { EcalegReviewDataService } from 'src/app/modules/service/review-data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-calon-shared',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: './calon-shared.component.html',
    styleUrl: './calon-shared.component.scss',
})
export class CalonSharedComponent {
    @Input() actionKey: string;
    @Input() dataPars?: CalonResp;
    title: string;
    btnTitle: string;

    calonId: string = '';
    foto: string = '';
    calon: string = '';
    partai: string = '';
    kabupatenId: string = '';

    dropdownItemPartais: DropdownItems[] = [];
    dropdownItemKabupatens: DropdownItems[] = [];

    menuKeys = Constant.menuKeys.calon;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        private formBuilder: FormBuilder,
        protected router: Router,
        private calonService: CalonService,
        private reviewDataService: EcalegReviewDataService,
        private serviceToast: MessageService
    ) {}

    ngOnInit(): void {
        this.buildForm();
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

            this.calonId = this.dataPars['data'].id ?? '';
            this.foto = this.dataPars['data'].foto ?? '';
            this.calon = this.dataPars['data'].nama_calon ?? '';
            this.partai = this.dataPars['data'].id_partai ?? '';
            this.kabupatenId = this.dataPars['data'].id_kabupaten ?? '';

            const selectedPartai = this.dropdownItemPartais.find(item => item.code === this.partai) || null;  

            const selectedKabupaten = this.dropdownItemKabupatens.find(item => item.code === this.kabupatenId) || null;  

            this.formGroup.patchValue({
                foto: this.foto,
                calon: this.calon,
                partai: selectedPartai,
                kabupatenId: selectedKabupaten,
            });
        }
    }

    onClickBackButton() {
        this.reviewDataService.deleteSavedReview(this.calonId, this.menuKeys);
        this.router.navigate(['calon']);
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            foto: new FormControl('', Validators.required),
            calon: new FormControl('', Validators.required),
            partai: new FormControl('', Validators.required),
            kabupatenId: new FormControl('', Validators.required),
        });
    }

    uploadFile(event) {
        const reader = new FileReader();

        if (event.target.files) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.formGroup.patchValue({
                    foto: file,
                });
            };
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
        }
    }
}
