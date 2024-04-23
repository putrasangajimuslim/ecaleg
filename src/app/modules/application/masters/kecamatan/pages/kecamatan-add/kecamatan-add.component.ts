import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { KecamatanSharedComponent } from 'src/app/shared/modules/kecamatan/components/kecamatan-shared/kecamatan-shared.component';

@Component({
  selector: 'app-kecamatan-add',
  standalone: true,
  imports: [KecamatanSharedComponent],
  templateUrl: './kecamatan-add.component.html',
  styleUrl: './kecamatan-add.component.scss'
})
export class KecamatanAddComponent {
  actionKey: string = Constant.actionKeys.addKecamatan;
}
