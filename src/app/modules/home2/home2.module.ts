import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { Home2RoutingModule } from './home2-routing.module';
import { CoreImportsModule } from '../core/modules/core-imports.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CoreImportsModule,
    Home2RoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class Home2Module { }
