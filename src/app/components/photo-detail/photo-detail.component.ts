import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPhoto } from '../../shared/models/photo-info.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IUser } from '../../shared/models/user.interfafce';

@Component({
  selector: 'app-photo-detail',
  imports: [MatProgressSpinnerModule],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss'
})
export class PhotoDetailComponent implements OnDestroy {

  protected photoInfo: IPhoto;
  protected userInfo: IUser;

  private photoId: string

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() public dialogRef: MatDialogRef<PhotoDetailComponent>
  ) {
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

  ngOnDestroy(): void {
    this.route.queryParams.subscribe().unsubscribe();
  }

  protected close() {
    this.dialogRef.close()
  }

  protected formatNumber(number: number): string {
    return new Intl.NumberFormat('es-ES').format(number);
  }


  private getPhotoDetails(id: string) {
    this.mainService.getPhotoById(id).subscribe((res: IPhoto) => {

      console.log('res', res)
      this.photoInfo = res;
      this.userInfo = res.user;

      console.log('photoInfo', this.photoInfo)
    })
  }
}
