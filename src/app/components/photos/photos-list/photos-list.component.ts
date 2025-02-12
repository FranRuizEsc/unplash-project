import { PhotoService } from '../../../core/services/photo.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services/user.service';
import { IPhoto } from '../../../core/models/photo-info.interface';
import { map } from 'rxjs';

@Component({
  selector: 'photos-list',
  imports: [PhotoCardComponent, CommonModule, ScrollingModule, MatProgressSpinnerModule],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {
  searchTerm = input<string>()
  userName = input<string>()

  private photoService = inject(PhotoService);
  private userService = inject(UserService);
  private page = 1

  protected isLoading = false;
  protected listPhotos: any[] = [];


  ngOnInit() {
    this.loadPhotos();
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.page++
      this.loadPhotos();
    }
  }

  private loadPhotos() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.getPhotosBasedOnContext().subscribe((photos => {
        this.updatePhotosList(photos);
        this.isLoading = false;
      }));
    }
  }

  private getPhotosBasedOnContext() {
    const searchTerm = this.searchTerm();
    const userName = this.userName();

    if (searchTerm) {
      return this.photoService.searchPhotos(searchTerm, this.page).pipe(map((response) => response.results));
    }
    if (userName) {
      return this.userService.getUserPhotos(userName, this.page);
    }
    return this.photoService.getAllPhtos(this.page);
  }

  private updatePhotosList(newPhotos: IPhoto[]) {
    const existingIds = new Set(this.listPhotos.map(photo => photo.id));
    const filteredPhotos = newPhotos.filter(photo => !existingIds.has(photo.id));
    this.listPhotos = [...this.listPhotos, ...filteredPhotos];
  }
}
