import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './modules/core/core.module';
import { environment as ENV } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './modules/core/components/components.module';
import { AuthConfigModule } from './modules/core/configs/auth.config.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(ENV),
    ComponentsModule.forRoot(ENV),
    ReactiveFormsModule,
    InfiniteScrollModule,
    // AuthConfigModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
