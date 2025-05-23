import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CitiesListInterface,
  StaticAssetsService,
} from '../../../../shared/services/static-assets.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IftaLabel } from 'primeng/iftalabel';
import { Select } from 'primeng/select';
import { NgClass } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { RegisterActions } from '../register.actions';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterStepEnum } from '../register.component';
import { UserInfoDataInterface } from '../interfaces/user-info-data.interface';
import { RegisterState } from '../register.state';
import { PrimeTemplate } from 'primeng/api';

interface UserInfoFormGroupInterface {
  isCarOwner: FormControl<boolean | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  city: FormControl<string | null>;
}

@Component({
  selector: 'gvg-user-info',
  imports: [
    ToggleSwitch,
    ReactiveFormsModule,
    IftaLabel,
    Select,
    NgClass,
    InputText,
    Button,
    TranslatePipe,
    PrimeTemplate,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly route: Router = inject(Router);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  readonly form: FormGroup<UserInfoFormGroupInterface> = new FormGroup({
    isCarOwner: new FormControl<boolean>(false),
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
  });
  readonly citiesList: CitiesListInterface[] =
    StaticAssetsService.citiesList.map((city: CitiesListInterface) => ({
      name: this.translateService.instant(city.name),
      value: city.value,
    }));

  ngOnInit(): void {
    this.store.dispatch(
      new RegisterActions.SetActiveStep(RegisterStepEnum.UserInfo),
    );

    this.populateForm();
  }

  goToNextStep(): void {
    this.store.dispatch([
      new RegisterActions.AddUserInfoData(
        this.form.value as UserInfoDataInterface,
      ),
      new RegisterActions.CompleteStep1(),
    ]);
    this.route.navigate(['/register', 'user-credentials-data']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete;
  }

  private populateForm(): void {
    this.store
      .selectOnce(RegisterState.userDataInfo)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: UserInfoDataInterface) => this.form.patchValue(data));
  }
}
