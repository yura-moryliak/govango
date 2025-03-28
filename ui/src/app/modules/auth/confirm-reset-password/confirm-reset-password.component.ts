import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, Subject, switchMap, takeWhile, timer } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { Password } from 'primeng/password';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../shared/states/auth/auth.actions';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'gvg-confirm-reset-password',
  imports: [
    AsyncPipe,
    FormsModule,
    IftaLabel,
    Password,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    Button,
    Divider,
    RouterLink,
  ],
  templateUrl: './confirm-reset-password.component.html',
  styleUrl: './confirm-reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmResetPasswordComponent implements OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly jwtHelperService: JwtHelperService =
    inject(JwtHelperService);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  private readonly destroyed$: Subject<void> = new Subject<void>();
  private token: string | undefined;

  isBusy: boolean = false;

  readonly passwordFormControl: FormControl<string | null> = new FormControl(
    null,
    [Validators.required, Validators.minLength(7)],
  );

  readonly remainingTime$: Observable<string | number> =
    this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => {
        const token: string | null = params.get('token');

        if (!token) {
          this.router.navigate(['/page-not-found']);
          return null;
        }

        const decoded = this.jwtHelperService.decodeToken(token);
        const exp: number = decoded?.exp;

        if (!exp) {
          this.router.navigate(['/page-not-found']);
          return null;
        }

        const expiresIn = exp * 1000 - Date.now();

        if (expiresIn <= 0) {
          this.router.navigate(['/page-not-found']);
          return null;
        }

        this.token = token;
        return Math.floor(expiresIn / 1000);
      }),
      switchMap((seconds: number | null) => {
        if (seconds === null) {
          return timer(0, 0);
        }

        return timer(0, 1000).pipe(
          map((i: number) => seconds - i),
          takeWhile((sec: number) => sec >= 0),
          map((sec: number) => {
            if (sec <= 0) {
              this.router.navigate(['/page-not-found']);
            }
            const h: string = Math.floor(sec / 3600)
              .toString()
              .padStart(2, '0');
            const m: string = Math.floor((sec % 3600) / 60)
              .toString()
              .padStart(2, '0');
            const s: string = Math.floor(sec % 60)
              .toString()
              .padStart(2, '0');

            if (+h === 0) {
              return `${m}${this.translateService.instant('mm')} : ${s}${this.translateService.instant('ss')}`;
            } else {
              return `${h.toString().padStart(2, '0')}${this.translateService.instant('hh')} : ${m}${this.translateService.instant('mm')} : ${s}${this.translateService.instant('ss')}`;
            }
          }),
        );
      }),
    );

  changePassword(): void {
    this.isBusy = true;

    this.store
      .dispatch(
        new AuthActions.ConfirmResetPassword(
          this.token as string,
          this.passwordFormControl.value as string,
        ),
      )
      .subscribe({
        next: () => {
          this.isBusy = false;
          this.showResetPasswordSuccessToast();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isBusy = false;

          if (error.status === HttpStatusCode.BadRequest) {
            this.showLoginErrorToast(error);
            this.router.navigate(['/login']);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private showResetPasswordSuccessToast(): void {
    this.store.dispatch([
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant(
          'Your password has been successfully change. You can now log in with your new password',
        ),
      }),
    ]);
  }

  private showLoginErrorToast(error: HttpErrorResponse): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'error',
        key: 'error',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(`${error.error.message}`),
      }),
    );
  }
}
