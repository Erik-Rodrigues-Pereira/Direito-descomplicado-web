import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TrabalhoCLTDetailComponent } from './trabalho-clt-detail.component';

describe('TrabalhoCLT Management Detail Component', () => {
  let comp: TrabalhoCLTDetailComponent;
  let fixture: ComponentFixture<TrabalhoCLTDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabalhoCLTDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./trabalho-clt-detail.component').then(m => m.TrabalhoCLTDetailComponent),
              resolve: { trabalhoCLT: () => of({ id: 1651 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TrabalhoCLTDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhoCLTDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load trabalhoCLT on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TrabalhoCLTDetailComponent);

      // THEN
      expect(instance.trabalhoCLT()).toEqual(expect.objectContaining({ id: 1651 }));
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
