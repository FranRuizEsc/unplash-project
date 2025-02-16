import { PhotoService } from '../../../core/services/photo.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services/user.service';
import { IPhoto } from '../../../core/models/photo-info.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'photos-list',
  imports: [PhotoCardComponent, CommonModule, ScrollingModule, MatProgressSpinnerModule],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {
  searchTerm = input<string>()
  userName = input<string>()
  isUserLiked = input<boolean>()
  collectionId = input<string>()


  private photoService = inject(PhotoService);
  private userService = inject(UserService);
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  private page = 1
  private hasMorePhotos = true;

  protected isLoading = false;
  protected listPhotos: IPhoto[] = [];


  ngOnInit() {
    this.loadPhotos();
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    if (scrollTop + clientHeight >= scrollHeight - 100 && this.hasMorePhotos) {
      this.page++
      this.loadPhotos();
    }
  }

  protected goToUserDetail(userName: string) {
    this.router.navigate(['/user', userName]);
  }

  private loadPhotos() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.getPhotosBasedOnContext().subscribe((photos) => {
      this.hasMorePhotos = photos.length > 0;
      this.updatePhotosList(photos);
      this.isLoading = false;
    });
  }

  private getPhotosBasedOnContext(): Observable<IPhoto[]> {
    const searchTerm = this.searchTerm();
    const userName = this.userName();
    const isUserLiked = this.isUserLiked();
    const collectionId = this.collectionId();

    if (collectionId) {
      return this.collectionService.getCollectionPhotosById(collectionId, this.page);
    }
    if (searchTerm) {
      return this.photoService.searchPhotos(searchTerm, this.page);
    }
    if (isUserLiked && userName) {
      return this.userService.getUserPhotosLiked(userName, this.page);
    }
    if (userName) {
      return this.userService.getUserPhotos(userName, this.page);
    }
    return this.photoService.getAllPhotos(this.page);
  }

  private updatePhotosList(newPhotos: IPhoto[]) {
    const existingIds = new Set(this.listPhotos.map(photo => photo.id));
    const filteredPhotos = newPhotos.filter(photo => !existingIds.has(photo.id));
    this.listPhotos = [...this.listPhotos, ...filteredPhotos];
  }
}
