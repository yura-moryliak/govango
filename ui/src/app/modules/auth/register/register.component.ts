import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Step, StepList, Stepper } from 'primeng/stepper';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { delay, Observable, Subject, takeUntil } from 'rxjs';
import { RegisterState } from './register.state';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { AsyncPipe } from '@angular/common';
import { AppSettingsPanelButtonComponent } from '../../../shared/components/app-settings-panel-button/app-settings-panel-button.component';

interface RegisterStep {
  label: string;
  route: 'user-info' | 'user-credentials-data' | 'user-car-info';
}

export enum RegisterStepEnum {
  UserInfo = 1,
  UserCredentialsData,
  UserCarInfo,
}

const initialRegisterSteps: RegisterStep[] = [
  { label: 'User Info', route: 'user-info' },
  { label: 'User Credentials', route: 'user-credentials-data' },
];

@Component({
  selector: 'gvg-register',
  imports: [
    StepList,
    Stepper,
    Step,
    RouterOutlet,
    RouterLink,
    TranslatePipe,
    AsyncPipe,
    AppSettingsPanelButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  steps: RegisterStep[] = [
    { label: 'User Info', route: 'user-info' },
    { label: 'User Credentials', route: 'user-credentials-data' },
  ];

  activeStep$: Observable<number> = this.store
    .select(RegisterState.activeStep)
    .pipe(delay(10));

  ngOnInit(): void {
    this.store
      .select(RegisterState.userDataInfo)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((userDataInfo: UserInfoDataInterface) => {
        this.steps = userDataInfo.isCarOwner
          ? this.steps.some((step) => step.route === 'user-car-info')
            ? [...this.steps]
            : [
                ...this.steps,
                { label: 'User Car Info', route: 'user-car-info' },
              ]
          : [...initialRegisterSteps];
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
