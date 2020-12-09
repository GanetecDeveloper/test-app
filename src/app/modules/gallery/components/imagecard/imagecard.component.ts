import { Component, Input, OnInit } from '@angular/core';
import { ImageGallery } from '../../models/image-gallery';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.scss']
})
export class ImagecardComponent implements OnInit {

  @Input() item: ImageGallery;
  
  constructor() { }

  ngOnInit(): void { }

}
