import { MainService } from '../../../services/main.service';
import { Component, inject, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card/photo-card.component';

@Component({
  selector: 'app-photos-list',
  imports: [PhotoCardComponent],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {

  private mainService = inject(MainService);
  protected photos: any[] = [];


  ngOnInit() {
    this.getAllPhotos();
  }

  private getAllPhotos() {
    this.mainService.getAllPhtos().subscribe((data) => {
      console.log('data', data)
      this.photos = data;
    })
  }
}
