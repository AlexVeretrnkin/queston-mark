import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LandingComponent} from './landing/landing.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './core/token-interceptor/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
