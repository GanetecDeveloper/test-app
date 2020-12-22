import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AuthGuardService } from './guards/auth.guard';
import { GlobalErrorHandler } from './handlers/global-error.handler';
import { HttpInterceptorProviders } from './interceptors';
import { AppConfigService } from './services/app-config.service';
import { LoggingService } from './services/logging.service';
import { CoreImportsModule } from './modules/core-imports.module';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'MY-XSRF-TOKEN',
      headerName: 'MY-X-CSRF-TOKEN',
    }),
    CoreImportsModule,
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    BrowserModule,
    HttpClientXsrfModule,
  ],
  providers: [
    HttpClient,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      deps: [AppConfigService],
      multi: true,
      useFactory: (appConfig: AppConfigService) => { return () => appConfig.load() }
    },
    // { provide: ErrorHandler, useClass: GlobalErrorHandler }, // TODO descomentar
    // { provide: APP_BASE_HREF, useValue: ENV.BASE_URL },
    AuthGuardService,
    HttpInterceptorProviders,
    Title,
    LoggingService
  ],
  bootstrap: [],
  entryComponents: [
    MatSpinner,
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Error.stackTraceLimit = 5;
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(env: any): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: 'env', useValue: env },
      ]
    };
  }
}
