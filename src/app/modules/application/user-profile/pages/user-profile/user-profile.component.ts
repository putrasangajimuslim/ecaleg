import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  private _publicPath = __webpack_public_path__;

  defaultC1: string | ArrayBuffer | null = null;

  constructor() {

  }

  ngOnInit(): void {
    this.getDefaultUserProfile();
  }

  getDefaultUserProfile() {
    this.defaultC1 = `${this._publicPath}assets/images/default_img.avif`;
  }
}
