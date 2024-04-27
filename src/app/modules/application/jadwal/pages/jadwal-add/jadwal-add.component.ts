import { Component } from '@angular/core';
import { Constant } from 'src/app/config/constant';
import { JadwalSharedComponent } from 'src/app/shared/modules/jadwal/components/jadwal-shared/jadwal-shared.component';

@Component({
  selector: 'app-jadwal-add',
  standalone: true,
  imports: [JadwalSharedComponent],
  templateUrl: './jadwal-add.component.html',
  styleUrl: './jadwal-add.component.scss'
})
export class JadwalAddComponent {
  actionKey: string = Constant.actionKeys.addJadwal;
}
