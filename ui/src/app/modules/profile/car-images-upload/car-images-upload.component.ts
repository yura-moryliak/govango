import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Store } from '@ngxs/store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import {
  INITIAL_TOAST_OPTIONS,
  ToastActions,
} from '../../../shared/states/toast/toast.actions';
import { CarsActions } from '../../../shared/states/cars/cars.actions';
import { CarsState } from '../../../shared/states/cars/cars.state';
import { UsersState } from '../../../shared/states/users/users.state';

interface PreviewFile {
  name: string;
  size: number;
  url: string;
  file: File;
  error?: string;
}

@Component({
  selector: 'gvg-car-images-upload',
  imports: [Drawer, Button, Divider, Message, ProgressSpinner, TranslatePipe],
  templateUrl: './car-images-upload.component.html',
  styleUrl: './car-images-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarImagesUploadComponent {
  private readonly store: Store = inject(Store);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService: TranslateService =
    inject(TranslateService);
  private readonly destroyed$: Subject<void> = new Subject<void>();

  @Input() visible: boolean = false;

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('fu') fileUpload: ElementRef<HTMLInputElement> | undefined;

  previewImages: PreviewFile[] = [];

  allowedTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];
  displayAllowedTypes: string = ['png', 'jpeg', 'jpg', 'webp'].join(', ');
  maxFilesToUpload: number = 5;
  maxFileSize: number = 1000000; // 1MB
  isProcessing: boolean = false;
  isUploading: boolean = false;

  handleClose(): void {
    this.closed.emit();
  }

  triggerFileUpload(): void {
    this.fileUpload?.nativeElement.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (!files) {
      return;
    }

    if (files.length > this.maxFilesToUpload) {
      this.showErrorToast('FILE_MAX_FILES_TO_UPLOAD', {
        maxFiles: this.maxFilesToUpload,
        actualFiles: files.length,
      });
      return;
    }

    this.previewImages = [];
    this.isProcessing = true;

    let filesToLoad = 0;
    let filesLoaded = 0;

    for (const file of files) {
      const preview: PreviewFile = {
        name: file.name,
        size: file.size,
        file,
        url: '',
      };

      if (!this.isFileTypeAllowed(file)) {
        this.showErrorToast(`FILE_UNSUPPORTED_TYPE`, {
          fileType: file.type.split('/')[1],
          allowedTypes: this.allowedTypes
            .map((type) => type.split('/')[1])
            .join(', '),
        });
        continue;
      }

      if (!this.isFileSizeAllowed(file)) {
        const limitInMb = (this.maxFileSize / 1024 / 1024).toFixed(0);
        const actualFileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        preview.error = this.translateService.instant('FILE_SIZE_EXCEEDS', {
          fileSizeLimit: limitInMb,
          actualFileSize: actualFileSizeMB,
        });
        this.previewImages.push(preview);
        continue;
      }

      if (file.size === 0) {
        this.showErrorToast('File is empty. Please select a valid file.');
        continue;
      }

      if (!file.name) {
        this.showErrorToast('Invalid file. File name is missing.');
        continue;
      }

      if (!file.lastModified) {
        this.showErrorToast(
          'Invalid file. Modification date is not available.',
        );
        continue;
      }

      filesToLoad++;
      const reader = new FileReader();
      reader.onload = () => {
        preview.url = reader.result as string;
        this.previewImages.push(preview);
        filesLoaded++;

        if (filesLoaded === filesToLoad) {
          this.isProcessing = false;
          this.cdr.detectChanges();
        }
      };
      reader.readAsDataURL(file);
    }

    if (filesToLoad === 0) {
      this.isProcessing = false;
    }
  }

  removeFile(name: string): void {
    this.previewImages = this.previewImages.filter(
      (file: PreviewFile) => file.name !== name,
    );
  }

  uploadImages(): void {
    this.isUploading = true;
    const files: File[] = this.previewImages.map(
      (file: PreviewFile) => file.file,
    );

    this.store
      .dispatch(
        new CarsActions.UploadCarImages(
          this.store.selectSnapshot(CarsState.carId) as string,
          this.store.selectSnapshot(UsersState.currentUser)?.id as string,
          files,
        ),
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.isUploading = false;
          this.previewImages = [];
          this.showSuccessToast();
          this.handleClose();
        },
        error: (error) => {
          this.isUploading = false;
          this.showErrorToast(error.error.message);
        },
      });
  }

  private isFileTypeAllowed(file: File): boolean {
    return this.allowedTypes.includes(file.type);
  }

  private isFileSizeAllowed(file: File): boolean {
    const fileSizeMB = file.size / 1024 / 1024;
    return fileSizeMB < 1;
  }

  private showSuccessToast(): void {
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'success',
        key: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant(
          'Car images has been uploaded successfully',
        ),
      }),
    );
  }

  private showErrorToast(error: string, param?: Record<string, any>): void {
    this.isUploading = false;
    this.store.dispatch(
      new ToastActions.ShowToast({
        ...INITIAL_TOAST_OPTIONS,
        severity: 'error',
        key: 'success',
        summary: this.translateService.instant('Error'),
        detail: this.translateService.instant(error, param),
      }),
    );
  }
}
