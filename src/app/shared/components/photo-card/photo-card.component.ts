import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PhotoDetailComponent } from '../../../components/photo-detail/photo-detail.component';
@Component({
  selector: 'photo-card',
  imports: [RouterModule, MatDialogModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  @Input({ required: true }) photo: any;

  private matDialog = inject(MatDialog);

  protected openPhotoDetailDialog(photoId: string) {
    history.pushState(null, '', `/photo/${photoId}`);

    const dialog = this.matDialog.open(PhotoDetailComponent, {
      width: '90%',
      maxWidth: 'none',
      maxHeight: '95%',
      data: { id: photoId }
    });

    dialog.afterClosed().subscribe(() => {
      history.pushState(null, '', '/');
    });
  }
}
