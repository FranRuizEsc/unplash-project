import { IPhoto } from './../../../core/models/photo-info.interface';
import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PhotoDetailComponent } from '../photo-detail/photo-detail.component';
@Component({
  selector: 'photo-card',
  imports: [RouterModule, MatDialogModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  photo = input.required<IPhoto>()

  private matDialog = inject(MatDialog);

  protected openPhotoDetailDialog(photoId: string) {
    if (!photoId) return;

    history.pushState(null, '', `/photo/${photoId}`);

    const dialog = this.matDialog.open(PhotoDetailComponent, {
      width: '90%',
      maxWidth: 'none',
      maxHeight: '95%',
      data: { id: photoId }
    });

    dialog.afterClosed().subscribe(() => {
      if (location.pathname.includes('/photo/')) {
        history.pushState(null, '', '/');
      }
    });
  }
}
