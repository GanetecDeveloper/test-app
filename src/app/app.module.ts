import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './modules/core/core.module';
import { environment as ENV } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CoreModule.forRoot(ENV)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
