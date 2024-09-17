import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllauthorsComponent } from './allauthors.component';

describe('AllauthorsComponent', () => {
  let component: AllauthorsComponent;
  let fixture: ComponentFixture<AllauthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllauthorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllauthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
