import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { TimSharedComponent } from 'src/app/shared/modules/tim/components/tim-shared/tim-shared.component';

@Component({
  selector: 'app-panitia-add',
  standalone: true,
  imports: [TimSharedComponent],
  templateUrl: './panitia-add.component.html',
  styleUrl: './panitia-add.component.scss'
})
export class PanitiaAddComponent {
  actionKey: string = Constant.actionKeys.addTim;
}
