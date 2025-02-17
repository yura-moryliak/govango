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
import { Subscription } from 'rxjs';
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
  private translateService: TranslateService = inject(TranslateService);
  private readonly sub: Subscription = new Subscription();

  readonly form: FormGroup<UserInfoFormGroupInterface> = new FormGroup({
    isCarOwner: new FormControl<boolean>(false),
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
  });
  readonly citiesList: CitiesListInterface[] =
    StaticAssetsService.citiesList.map((city) => ({
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
    this.store.dispatch(
      new RegisterActions.AddUserInfoData(
        this.form.value as UserInfoDataInterface,
      ),
    );
    this.route.navigate(['/register', 'user-credentials-data']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private populateForm(): void {
    this.sub.add(
      this.store
        .selectOnce(RegisterState.userDataInfo)
        .subscribe((data: UserInfoDataInterface) => this.form.patchValue(data)),
    );
  }
}
