import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { CoreImportsModule } from '../core/modules/core-imports.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CoreImportsModule
  ]
})
export class HomeModule { }
