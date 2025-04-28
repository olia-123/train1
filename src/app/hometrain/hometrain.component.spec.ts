import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometrainComponent } from './hometrain.component';

describe('HometrainComponent', () => {
  let component: HometrainComponent;
  let fixture: ComponentFixture<HometrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HometrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HometrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
