import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCheckerComponent } from './ticket-checker.component';

describe('TicketCheckerComponent', () => {
  let component: TicketCheckerComponent;
  let fixture: ComponentFixture<TicketCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
