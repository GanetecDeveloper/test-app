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

  allImages: ImageGallery[];
  filterImages: ImageGallery[];
  visibleImages: ImageGallery[];
  imagesPerLoad = 4;
  finishPage;
  actualPage: number;
  searchKey = new FormControl('');
  inputLabel = "Search key";
  infoText: string;

  constructor(
    private galleryService: GalleryService,
  ) {}

  ngOnInit(): void {
    this.galleryService.generateJson().subscribe(allImages => {
      this.allImages = allImages;
      this.initData(this.allImages);
    });
  }

  initData(imageList: ImageGallery[]) {
    this.filterImages = imageList;
    this.visibleImages = imageList.slice(0, this.imagesPerLoad);
    this.finishPage = Math.ceil(imageList.length / this.imagesPerLoad);
    this.actualPage = 1;
    this.updateInfoText();
    console.debug(`Page ${this.actualPage}/${this.finishPage}. Showing ${this.visibleImages.length}/${this.filterImages.length}. TOTAL ${this.allImages.length}.`);
    console.debug("IMAGES: ", this.visibleImages, this.filterImages);
  }

  addImages() {
    const startImage = this.visibleImages.length;
    const finishImage = startImage + this.imagesPerLoad;
    this.visibleImages.push(...this.filterImages.slice(startImage, finishImage));
    this.actualPage ++;
    this.updateInfoText();
    console.log(`Page ${this.actualPage}/${this.finishPage}. Showing ${this.visibleImages.length}/${this.filterImages.length}. TOTAL ${this.allImages.length}.`);
  }

  updateInfoText(){
    const optionalText = this.searchKey.value ? ` finded by "${this.searchKey.value}"` : ``;
    this.infoText = `Showing ${this.visibleImages.length} of ${this.filterImages.length} images${optionalText}. Total images on "server": ${this.allImages.length}.`;
  }

  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.addImages();
    } else {
      console.log('No more images. Finish page!');
    }
  }
  
  search(){
    this.initData(
      this.galleryService.filterImages(this.allImages, this.searchKey.value)
    );
  }
}
