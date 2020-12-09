import { TestBed } from '@angular/core/testing';
import { ImageGallery } from '../models/image-gallery';
import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;
  let imageListToFilter = [
    {
      id: 17, 
      photo: "https://picsum.photos/id/17/500/333.jpg", 
      text: "mock test0"
    },
    {
      id: 17, 
      photo: "https://picsum.photos/id/17/500/333.jpg", 
      text: "mock test1"
    },
    {
      id: 25, 
      photo: "https://picsum.photos/id/25/500/333.jpg", 
      text: "mock test2"
    },
    {
      id: 5, 
      photo: "https://picsum.photos/id/5/500/333.jpg", 
      text: "mock test3"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generateJson() should return 4000 images', () => {
    service.generateJson().subscribe(val=>{
      expect(val.length).toEqual(4000);
    });
  });

  it('generateJson() should return ImageGallery[]" types', () => {
    service.generateJson().subscribe(val=>{
      expect(typeof(val[1].id)).toEqual('number');
      expect(typeof(val[1].photo)).toEqual('string');
      expect(typeof(val[1].text)).toEqual('string');
    });
  });


  it('filterImages() should filter by text', () => {
    expect(service.filterImages(imageListToFilter, "mock")).toEqual(
      imageListToFilter
    );
    expect(service.filterImages(imageListToFilter, "mock test0")).toEqual([
      {
        id: 17, 
        photo: "https://picsum.photos/id/17/500/333.jpg", 
        text: "mock test0"
      }
    ]);
    expect(service.filterImages(imageListToFilter, "mock test99999")).toEqual([]);
  });

  it('filterImages() should filter by id', () => {
    expect(service.filterImages(imageListToFilter, "")).toEqual(
      imageListToFilter
    );
    expect(service.filterImages(imageListToFilter, "17")).toEqual([
      {
        id: 17, 
        photo: "https://picsum.photos/id/17/500/333.jpg", 
        text: "mock test0"
      },
      {
        id: 17, 
        photo: "https://picsum.photos/id/17/500/333.jpg", 
        text: "mock test1"
      }
    ]);
    expect(service.filterImages(imageListToFilter, "25")).toEqual([
      {
        id: 25, 
        photo: "https://picsum.photos/id/25/500/333.jpg", 
        text: "mock test2"
      }
    ]);
    expect(service.filterImages(imageListToFilter, "99999")).toEqual([]);
  });

  it('getRandomText() should generate random text with n words', () => {
    expect(service.getRandomText().split(" ").length).toEqual(50);
    expect(service.getRandomText(178).split(" ").length).toEqual(178);
  });

});
