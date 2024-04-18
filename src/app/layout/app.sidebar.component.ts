import { Component, ElementRef } from '@angular/core';
import { AppMenuComponent } from './app.menu.component';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    standalone: true,
    imports: [AppMenuComponent]
})
export class AppSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

