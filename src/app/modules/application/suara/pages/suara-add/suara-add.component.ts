import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { SuaraSharedComponent } from 'src/app/shared/modules/suara/components/suara-shared/suara-shared.component';

@Component({
  selector: 'app-suara-add',
  standalone: true,
  imports: [SuaraSharedComponent],
  templateUrl: './suara-add.component.html',
  styleUrl: './suara-add.component.scss'
})
export class SuaraAddComponent {
  actionKey: string = Constant.actionKeys.addSuara;
}
