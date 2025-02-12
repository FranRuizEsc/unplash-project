import { Component, Inject, Optional, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { IPhoto } from '../../../core/models/photo-info.interface';
import { PhotoService } from '../../../core/services/photo.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-photo-detail',
  imports: [MatChipsModule, CommonModule, ToolbarComponent],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss',
})
export class PhotoDetailComponent {
  protected photoInfo$$ = signal<IPhoto | null>(null);
  protected isDialog: boolean;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() public dialogRef: MatDialogRef<PhotoDetailComponent>
  ) {
    this.route.params.pipe(
      takeUntilDestroyed(),
      switchMap((params) => {
        const photoId = this.data?.id || params['photo_id'];
        return photoId ? this.photoService.getPhotoById(photoId) : of(null);
      })
    ).subscribe((photo: IPhoto) => {
      if (photo) {
        this.photoInfo$$.set(photo);
      }
    });

    this.isDialog = !!this.dialogRef
  }

  protected formatNumber(number: number): string {
    return new Intl.NumberFormat('es-ES').format(number);
  }

  protected openFullscreen() {
    const imageUrl = this.photoInfo$$()?.urls?.raw;
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }

  protected openCategory(category: string) {
    this.dialogRef?.close();
    this.router.navigate(['/search'], { queryParams: { searchTerm: category } });
  }

  protected openUserDetail() {
    const username = this.photoInfo$$()?.user?.username;
    this.dialogRef?.close();
    this.router.navigate(['/user', username]);
  }
}

