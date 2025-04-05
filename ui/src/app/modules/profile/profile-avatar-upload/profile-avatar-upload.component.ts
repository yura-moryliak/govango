import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { delay, of, Subject, takeUntil } from 'rxjs';
import { Button } from 'primeng/button';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { Store } from '@ngxs/store';
import { InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/states/users/user.interface';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';

@Component({
  selector: 'gvg-profile-avatar-upload',
  imports: [Button, FileUpload],
  templateUrl: './profile-avatar-upload.component.html',
  styleUrl: './profile-avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileAvatarUploadComponent {
  private readonly store: Store = inject(Store);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  private readonly destroyed$: Subject<void> = new Subject<void>();

  @Input() user: User | null = null;

  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;

  allowedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
  maxFileSize: number = 1000000; // 1MB
  isUploading: boolean = false;

  triggerFileUpload(): void {
    this.fileUpload?.basicFileInput?.nativeElement.click();
  }

  onFileSelect(event: FileSelectEvent): void {
    this.isUploading = true;

    const files: File[] = event.files;

    for (const file of files) {
      if (!this.isFileTypeAllowed(file)) {
        this.showErrorToast(`FILE_UNSUPPORTED_FILE_TYPE`, {
          fileType: file.type,
        });
        this.fileUpload?.clear();
        return;
      }

      if (!this.isFileSizeAllowed(file)) {
        const limitInMb: string = (this.maxFileSize / 1024 / 1024).toFixed(0);
        const actualFileSizeMB: string = (file.size / 1024 / 1024).toFixed(2);
        this.showErrorToast(`FILE_SIZE_EXCEEDS`, {
          fileSizeLimit: limitInMb,
          actualFileSize: actualFileSizeMB,
        });
        this.fileUpload?.clear();
        return;
      }

      if (file.size === 0) {
        this.showErrorToast('FILE_EMPTY');
        this.fileUpload?.clear();
        return;
      }

      if (!file.name) {
        this.showErrorToast('INVALID_FILE_NAME');
        this.fileUpload?.clear();
        return;
      }

      if (!file.lastModified) {
        this.showErrorToast('INVALID_FILE_MODIFICATION_DATE');
        this.fileUpload?.clear();
        return;
      }

      // TODO Simulate upload process
      of('Start upload')
        .pipe(delay(5000), takeUntil(this.destroyed$))
        .subscribe(() => {
          this.isUploading = false;
          this.cdr.markForCheck();

          this.showSuccessToast();
        });
    }
  }

  private isFileTypeAllowed(file: File): boolean {
    return this.allowedTypes.includes(file.type);
  }

  private isFileSizeAllowed(file: File): boolean {
    const fileSizeMB: number = file.size / 1024 / 1024;
    return fileSizeMB < 1;
  }

  private showErrorToast(
    errorMessage: string,
    param?: InterpolationParameters,
  ): void {
    this.isUploading = false;

    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'error',
        key: 'success',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(errorMessage, param),
      }),
    );
  }

  private showSuccessToast(): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant(`Success`),
        detail: this.translateService.instant(
          'Your avatar has been uploaded successfully',
        ),
      }),
    );
  }
}
