import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockImageList = [
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('"allImages" init with 4000 images', () => {
    expect(component.allImages.length).toEqual(4000);
  });

  it('"visibleImages" init with 4 images', () => {
    expect(component.visibleImages.length).toEqual(4);
  });

  it('addImages() add 4 images', () => {
    let visibleImagesAtStart = component.visibleImages.length;
    let pageAtStart = component.actualPage;
    component.addImages();
    expect(component.visibleImages.length).toEqual(visibleImagesAtStart + component.imagesPerLoad);
    expect(component.actualPage).toEqual(pageAtStart+1);
  });

  it('initData() configure basic variables', () => {
    component.initData(mockImageList);
    expect(component.filterImages).toEqual(mockImageList);
    expect(component.visibleImages.length).toEqual(component.imagesPerLoad);
    expect(component.actualPage).toEqual(1);
  });

  it('search() filter by text', () => {
    component.initData(mockImageList);
    expect(component.filterImages).toEqual(mockImageList);
    
    component.searchKey.setValue("mock test1");
    expect(component.searchKey.value).toEqual("mock test1");
    component.search();
    console.log(component.filterImages);
    expect(component.filterImages.length).toEqual(1);
    expect(component.filterImages[0].text).toEqual("mock test1");

    // component.searchKey.setValue("mock");
    // component.search();
    // expect(component.filterImages).toEqual(
    //   mockImageList
    // );

    // component.searchKey.setValue("mock test99999");
    // component.search();
    // expect(component.filterImages).toEqual(
    //   []
    // );

  });

});
