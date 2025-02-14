import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Step, StepList, Stepper } from 'primeng/stepper';
import { RouterOutlet } from '@angular/router';

interface RegisterStep {
  label: string;
  route: 'user-info' | 'user-credentials-data' | 'user-car-info';
}

@Component({
  selector: 'gvg-register',
  imports: [StepList, Stepper, Step, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  steps: RegisterStep[] = [
    { label: 'User Info', route: 'user-info' },
    { label: 'User Credentials Data', route: 'user-credentials-data' },
    { label: 'User Car Info', route: 'user-car-info' },
  ];
}
