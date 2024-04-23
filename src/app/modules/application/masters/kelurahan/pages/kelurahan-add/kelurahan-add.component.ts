import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { KelurahanSharedComponent } from 'src/app/shared/modules/kelurahan/components/kelurahan-shared/kelurahan-shared.component';

@Component({
  selector: 'app-kelurahan-add',
  standalone: true,
  imports: [KelurahanSharedComponent],
  templateUrl: './kelurahan-add.component.html',
  styleUrl: './kelurahan-add.component.scss'
})
export class KelurahanAddComponent {
  actionKey: string = Constant.actionKeys.addKelurahan;
}
