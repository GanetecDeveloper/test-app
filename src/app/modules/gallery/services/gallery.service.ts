import { Injectable } from '@angular/core';
import { ImageGallery } from '../models/image-gallery';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }

  /**
   * 
   * @param iterations 
   */
  generateJson(iterations=4000): ImageGallery[] {
    let json: ImageGallery[];

    json = Array(iterations).fill(undefined).map(
      () => {
        const id = Math.round(Math.random() * 400);
        return <ImageGallery>({
          id: id,
          photo: `https://picsum.photos/id/${id}/500/333.jpg`,
          text: this.getRandomText(),
        });
      }
    );
    console.debug("Image list: ", json, json.length);
    return json;
  }

  /**
   * 
   * @param imageList 
   * @param searchKey 
   */
  filterImages(imageList: ImageGallery[], searchKey: string): ImageGallery[] {
    imageList = _.filter(imageList, o => {
      return o.text.includes(searchKey) || String(o.id) === (searchKey);
    });
    console.log(`Images filtered by ${searchKey}: `, imageList);
    return imageList;
  }

  /**
   * 
   * @param wordsAmount 
   */
  getRandomText(wordsAmount=50){
    var words =["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit.", "Vestibulum", "nibh", "ipsum,", "tempus", "vitae", "vulputate", "sed,", "sagittis", "sed", "enim.", "Proin", "ligula", "tortor,", "tincidunt", "id", "blandit", "eget,", "tincidunt", "sed", "leo.", "Maecenas", "volutpat", "quam", "sed", "mi", "euismod,", "a", "sagittis", "ante", "eleifend.", "Vestibulum", "tincidunt", "massa", "eu", "pulvinar", "facilisis.", "Mauris", "lobortis", "laoreet", "diam", "quis", "gravida.", "Nunc", "elementum", "convallis", "justo,", "eget", "venenatis", "turpis", "ultrices", "at.", "Maecenas", "mattis", "eget", "nulla", "interdum", "tincidunt.", "Curabitur", "rutrum", "molestie", "risus", "id", "commodo."];
    var text = [];
    wordsAmount++;
    while(--wordsAmount) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(" ");
  }

}
