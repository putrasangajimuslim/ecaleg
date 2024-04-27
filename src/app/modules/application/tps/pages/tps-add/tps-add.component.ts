import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { TpsSharedComponent } from 'src/app/shared/modules/tps/components/tps-shared/tps-shared.component';

@Component({
  selector: 'app-tps-add',
  standalone: true,
  imports: [TpsSharedComponent],
  templateUrl: './tps-add.component.html',
  styleUrl: './tps-add.component.scss'
})
export class TpsAddComponent {
  actionKey: string = Constant.actionKeys.addTPS;
}
