import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageGallery } from '../../models/image-gallery';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /** Complete image list from random json generated */
  allImages: ImageGallery[];

  /** Images that will be displayed on infinite scroll */
  filterImages: ImageGallery[];

  /** Images that are visibles at the moment */
  visibleImages: ImageGallery[];

  /** Amount of images to show when scroll */
  imagesPerLoad = 4;

  /** Last "page" */
  finishPage;

  /** Current page */
  actualPage: number;

  /** Key to filter images */
  searchKey = new FormControl('');

  constructor(
    private galleryService: GalleryService,
  ) {
    // Save full image list (4000 items)
    this.allImages = this.galleryService.generateJson();
  }

  ngOnInit(): void {
    // Init infinite scroll data
    this.initData(this.allImages);
  }

  /**
   * Init all data, counters and image lists to manage infinite scroll.
   * @param imageList 
   */
  initData(imageList: ImageGallery[]) {
    this.filterImages = imageList;
    this.visibleImages = imageList.slice(0, this.imagesPerLoad);
    this.finishPage = Math.ceil(imageList.length / this.imagesPerLoad);
    this.actualPage = 1;
    console.debug(`Page ${this.actualPage}/${this.finishPage}. Showing ${this.visibleImages.length}/${this.filterImages.length}. TOTAL ${this.allImages.length}.`);
    console.debug("IMAGES: ", this.visibleImages, this.filterImages);
  }

  /**
   * Add next images (4) to visible list.
   */
  addImages() {
    const startImage = this.visibleImages.length;
    const finishImage = startImage + this.imagesPerLoad;
    this.visibleImages.push(...this.filterImages.slice(startImage, finishImage));
    this.actualPage ++;
    console.log(`Page ${this.actualPage}/${this.finishPage}. Showing ${this.visibleImages.length}/${this.filterImages.length}. TOTAL ${this.allImages.length}.`);
  }

  /**
   * If there are images to show, on scrolled event, 
   * add next images (4) otherwise do nothing.
   */
  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.addImages();
    } else {
      console.log('No more images. Finish page!');
    }
  }

  /**
   * Filter image list while typing.
   */
  search(){
    this.initData(
      this.galleryService.filterImages(this.allImages, this.searchKey.value)
    );
  }
}
