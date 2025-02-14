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
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { RegisterActions } from '../register.actions';
import { UserInfoDataInterface } from '../interfaces/user-info-data.interface';
import { Subscription } from 'rxjs';
import { RegisterState } from '../register.state';
import { Router } from '@angular/router';
import { RegisterStepEnum } from '../register.component';

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
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private readonly sub: Subscription = new Subscription();

  form: FormGroup<UserInfoFormGroupInterface> = new FormGroup({
    isCarOwner: new FormControl<boolean>(false),
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
  });

  citiesList: CitiesListInterface[] = StaticAssetsService.citiesList;

  ngOnInit(): void {
    this.sub.add(
      this.store
        .select(RegisterState.userDataInfo)
        .subscribe((userDataInfo: UserInfoDataInterface) =>
          this.form.patchValue(userDataInfo),
        ),
    );
  }

  async goToNextStep(): Promise<void> {
    this.store.dispatch(
      new RegisterActions.AddUserInfoData(
        this.form.value as UserInfoDataInterface,
      ),
    );
    this.store.dispatch(
      new RegisterActions.SetActiveStep(RegisterStepEnum.UserCredentialsData),
    );
    await this.router.navigate(['register', 'user-credentials-data']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
