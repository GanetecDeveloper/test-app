import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { GalleryService } from './services/gallery.service';
import { GalleryRoutingModule } from './gallery-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImagecardComponent } from './components/imagecard/imagecard.component';
import { CoreImportsModule } from '../core/modules/core-imports.module';

@NgModule({
  declarations: [
    MainComponent, 
    ImagecardComponent
  ],
  imports: [
    CoreImportsModule,
    GalleryRoutingModule,
    InfiniteScrollModule,
  ],
  providers: [
    GalleryService
  ]
})
export class GalleryModule { }
