import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.navigate(['login'],{});
        this.primengConfig.ripple = true;
    }
}
