import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { PartaiSharedComponent } from 'src/app/shared/modules/partai/components/partai-shared/partai-shared.component';

@Component({
  selector: 'app-partai-add',
  standalone: true,
  imports: [PartaiSharedComponent],
  templateUrl: './partai-add.component.html',
  styleUrl: './partai-add.component.scss'
})
export class PartaiAddComponent {
  actionKey: string = Constant.actionKeys.addPartai;
}
