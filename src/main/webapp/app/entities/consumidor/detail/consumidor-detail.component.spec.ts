import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsumidorDetailComponent } from './consumidor-detail.component';

describe('Consumidor Management Detail Component', () => {
  let comp: ConsumidorDetailComponent;
  let fixture: ComponentFixture<ConsumidorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumidorDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./consumidor-detail.component').then(m => m.ConsumidorDetailComponent),
              resolve: { consumidor: () => of({ id: 22013 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ConsumidorDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumidorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load consumidor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ConsumidorDetailComponent);

      // THEN
      expect(instance.consumidor()).toEqual(expect.objectContaining({ id: 22013 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
