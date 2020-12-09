import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { GalleryService } from './services/gallery.service';
import { GalleryRoutingModule } from './gallery-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';
import { ImagecardComponent } from './components/imagecard/imagecard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, ImagecardComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    InfiniteScrollModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [
    GalleryService
  ]
})
export class GalleryModule { }
