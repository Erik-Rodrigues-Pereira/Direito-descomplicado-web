import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ConsumidorService } from '../service/consumidor.service';
import { IConsumidor } from '../consumidor.model';
import { ConsumidorFormService } from './consumidor-form.service';

import { ConsumidorUpdateComponent } from './consumidor-update.component';

describe('Consumidor Management Update Component', () => {
  let comp: ConsumidorUpdateComponent;
  let fixture: ComponentFixture<ConsumidorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consumidorFormService: ConsumidorFormService;
  let consumidorService: ConsumidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsumidorUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ConsumidorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsumidorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consumidorFormService = TestBed.inject(ConsumidorFormService);
    consumidorService = TestBed.inject(ConsumidorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const consumidor: IConsumidor = { id: 16551 };

      activatedRoute.data = of({ consumidor });
      comp.ngOnInit();

      expect(comp.consumidor).toEqual(consumidor);
    });
  });

  describe('save', () => {
    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsumidor>>();
      const consumidor = { id: 22013 };
      jest.spyOn(consumidorFormService, 'getConsumidor').mockReturnValue({ id: null });
      jest.spyOn(consumidorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consumidor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consumidor }));
      saveSubject.complete();

      // THEN
      expect(consumidorFormService.getConsumidor).toHaveBeenCalled();
      expect(consumidorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });
  });
});
