import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagecardComponent } from './imagecard.component';

describe('ImagecardComponent', () => {
  let component: ImagecardComponent;
  let fixture: ComponentFixture<ImagecardComponent>;
  let mockItem = {
    id: 17, 
    photo: "https://picsum.photos/id/17/500/333.jpg", 
    text: "id facilisis. sed nulla blandit eget sagittis mole, idunt enim."
  };
  let mockItemWithError = {
    id: 99999, 
    photo: "https://picsum.photos/id/99999/500/333.jpg", 
    text: "id facilisis. sed nulla idunt enim."
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagecardComponent);
    component = fixture.componentInstance;

    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data', () => {
    expect(fixture.nativeElement.querySelector('mat-card-title').innerText).toEqual('17');
    expect(fixture.nativeElement.querySelector('img').getAttribute('src')).toEqual(mockItem.photo);
    expect(fixture.nativeElement.querySelector('p').innerText).toEqual(mockItem.text);
  });

});
