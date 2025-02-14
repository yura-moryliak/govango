import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class UserInfoComponent {
  form: FormGroup<UserInfoFormGroupInterface> = new FormGroup({
    isCarOwner: new FormControl<boolean>(false),
    firstName: new FormControl<string | null>(null, Validators.required),
    lastName: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
  });

  citiesList: CitiesListInterface[] = StaticAssetsService.citiesList;

  goToNextStep(): void {
    console.log(this.form.value);
  }
}
