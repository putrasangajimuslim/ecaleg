import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {
  InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter,
  withComponentInputBinding, withInMemoryScrolling
} from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        // importProvidersFrom(AppRoutingModule),
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
        provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LocationStrategy, useClass: HashLocationStrategy }, 
        MessageService, ConfirmationService
    ]
})
  .catch(err => console.error(err));