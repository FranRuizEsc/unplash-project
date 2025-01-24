import { MainService } from '../../services/main.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../../shared/components/photo-card/photo-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'photos-list',
  imports: [PhotoCardComponent, CommonModule],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {
  @Input() searchTerm: string;

  private mainService = inject(MainService);
  private page = 1

  protected listPhotos: any[] = [];


  ngOnInit() {
    if (this.searchTerm) {
      this.searchPhotos(this.searchTerm, this.page);
    } else {
      this.getAllPhotos(this.page);
    }
  }

  protected loadMorePhotos() {
    this.page++;
    if (this.searchTerm) {
      this.searchPhotos(this.searchTerm, this.page);
    } else {
      this.getAllPhotos(this.page);
    }
  }

  private updatePhotosList(newPhotos: any[]) {
    if (this.page === 1) {
      this.listPhotos = newPhotos;
    } else {
      this.listPhotos = [...this.listPhotos, ...newPhotos].filter((photo, index, self) =>
        index === self.findIndex((p) => p.id === photo.id)
      );
    }
  }

  private getAllPhotos(page: number) {
    this.mainService.getAllPhtos(page).subscribe((data) => {
      this.updatePhotosList(data);
    });
  }

  private searchPhotos(searchTerm: string, page: number) {
    this.mainService.searchPhotos(searchTerm, page).subscribe((data) => {
      this.updatePhotosList(data.results);
    });
  }


}
