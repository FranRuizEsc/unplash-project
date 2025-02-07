import { Component, Inject, Optional } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-detail',
  imports: [],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss'
})
export class PhotoDetailComponent {

  private photoId: string

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() public dialogRef: MatDialogRef<PhotoDetailComponent>
  ) {
    console.log(data)
    this.photoId = data?.id
  }

  ngOnInit() {
    if (!this.photoId) {
      this.route.params.subscribe(params => {
        this.photoId = params['photo_id'];
        this.getPhotoDetails(this.photoId);
      });
    } else {
      this.getPhotoDetails(this.photoId);
    }
  }

  private getPhotoDetails(id: string) {
    this.mainService.getPhotoById(id).subscribe((res: any) => {
      console.log('res', res)
    })
  }
}
