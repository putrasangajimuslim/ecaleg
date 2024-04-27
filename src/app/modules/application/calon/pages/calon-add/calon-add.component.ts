import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { CalonSharedComponent } from 'src/app/shared/modules/calon/components/calon-shared/calon-shared.component';

@Component({
  selector: 'app-calon-add',
  standalone: true,
  imports: [CalonSharedComponent],
  templateUrl: './calon-add.component.html',
  styleUrl: './calon-add.component.scss'
})
export class CalonAddComponent {
  actionKey: string = Constant.actionKeys.addCalon;
}
