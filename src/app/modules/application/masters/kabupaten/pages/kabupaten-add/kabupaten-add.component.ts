import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { KabupatenSharedComponent } from 'src/app/shared/modules/kabupaten/components/kabupaten-shared/kabupaten-shared.component';

@Component({
  selector: 'app-kabupaten-add',
  standalone: true,
  imports: [KabupatenSharedComponent],
  templateUrl: './kabupaten-add.component.html',
  styleUrl: './kabupaten-add.component.scss'
})
export class KabupatenAddComponent {
  actionKey: string = Constant.actionKeys.addKabupaten;
}
