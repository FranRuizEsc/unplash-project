import { Component, Inject, Optional, signal } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPhoto } from '../../shared/models/photo-info.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-photo-detail',
  imports: [MatChipsModule],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss',
})
export class PhotoDetailComponent {
  protected photoInfo$$ = signal<IPhoto | null>(null);

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() public dialogRef: MatDialogRef<PhotoDetailComponent>
  ) {
    this.route.params.pipe(
      takeUntilDestroyed(),
      switchMap((params) => {
        const photoId = this.data?.id || params['photo_id'];
        return photoId ? this.mainService.getPhotoById(photoId) : of(null);
      })
    ).subscribe((photo: IPhoto) => {
      if (photo) {
        this.photoInfo$$.set(photo);

        console.log('photo', photo)
      }
    });
  }

  protected close() {
    this.dialogRef.close()
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
}

