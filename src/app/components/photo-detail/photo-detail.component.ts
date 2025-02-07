import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-photo-detail',
  imports: [],
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.scss'
})
export class PhotoDetailComponent {

  private mainService = inject(MainService)
  private route = inject(ActivatedRoute);
  private subscription = new Subscription();
  private photoId: string


  ngOnInit() {
    const queryParams$ = this.route.params

    this.subscription.add(queryParams$.subscribe((queryParams) => {
      this.photoId = queryParams['photo_id']
    }))

    this.getPhotoDeatils(this.photoId)
  }

  private getPhotoDeatils(id: string) {
    this.mainService.getPhotoById(id).subscribe((res: any) => {
      console.log('res', res)
    })
  }
}
