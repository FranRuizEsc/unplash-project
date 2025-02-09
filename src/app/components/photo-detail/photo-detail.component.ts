import { Component, Inject, Optional, signal } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPhoto } from '../../shared/models/photo-info.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-photo-detail',
  imports: [MatProgressSpinnerModule],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss'
})
export class PhotoDetailComponent {
  protected photoInfo$$ = signal<IPhoto | null>(null);

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() public dialogRef: MatDialogRef<PhotoDetailComponent>
  ) {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {

      const photoId = this.data?.id || params['photo_id'];
      if (photoId) {
        this.getPhotoDetails(photoId)
      }
    });
  }


  protected close() {
    this.dialogRef.close()
  }

  protected formatNumber(number: number): string {
    return new Intl.NumberFormat('es-ES').format(number);
  }


  private getPhotoDetails(photoId: string) {
    this.mainService.getPhotoById(photoId)
      .subscribe((photo: IPhoto) => {
        this.photoInfo$$.set(photo);
        console.log('entra', this.photoInfo$$())
      });
  }
}

