import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'gvg-gvg-app-container',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './gvg-app-container.component.html',
  styleUrl: './gvg-app-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GvgAppContainerComponent {}
