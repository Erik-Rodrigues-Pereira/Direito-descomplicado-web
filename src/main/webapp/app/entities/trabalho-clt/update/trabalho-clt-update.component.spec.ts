import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { TrabalhoCLTService } from '../service/trabalho-clt.service';
import { ITrabalhoCLT } from '../trabalho-clt.model';
import { TrabalhoCLTFormService } from './trabalho-clt-form.service';

import { TrabalhoCLTUpdateComponent } from './trabalho-clt-update.component';

describe('TrabalhoCLT Management Update Component', () => {
  let comp: TrabalhoCLTUpdateComponent;
  let fixture: ComponentFixture<TrabalhoCLTUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trabalhoCLTFormService: TrabalhoCLTFormService;
  let trabalhoCLTService: TrabalhoCLTService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrabalhoCLTUpdateComponent],
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
      .overrideTemplate(TrabalhoCLTUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrabalhoCLTUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trabalhoCLTFormService = TestBed.inject(TrabalhoCLTFormService);
    trabalhoCLTService = TestBed.inject(TrabalhoCLTService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const trabalhoCLT: ITrabalhoCLT = { id: 18027 };

      activatedRoute.data = of({ trabalhoCLT });
      comp.ngOnInit();

      expect(comp.trabalhoCLT).toEqual(trabalhoCLT);
    });
  });

  describe('save', () => {
    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrabalhoCLT>>();
      const trabalhoCLT = { id: 1651 };
      jest.spyOn(trabalhoCLTFormService, 'getTrabalhoCLT').mockReturnValue({ id: null });
      jest.spyOn(trabalhoCLTService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trabalhoCLT: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trabalhoCLT }));
      saveSubject.complete();

      // THEN
      expect(trabalhoCLTFormService.getTrabalhoCLT).toHaveBeenCalled();
      expect(trabalhoCLTService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });
  });
});
