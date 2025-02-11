import { PhotoService } from '../../../services/photo.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { tap } from 'rxjs/internal/operators/tap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'photos-list',
  imports: [PhotoCardComponent, CommonModule, ScrollingModule, MatProgressSpinnerModule],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {
  @Input() searchTerm: string;

  private photoService = inject(PhotoService);
  private page = 1

  protected isLoading = false;
  protected listPhotos: any[] = [];


  ngOnInit() {
    this.loadInitialPhotos();
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadMorePhotos();
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

  private loadInitialPhotos() {
    this.isLoading = true;
    if (this.searchTerm) {
      this.searchPhotos(this.searchTerm, this.page);
    } else {
      this.getAllPhotos(this.page);
    }
  }

  private updatePhotosList(newPhotos: any[]) {
    const existingIds = new Set(this.listPhotos.map((photo) => photo.id));
    const filteredPhotos = newPhotos.filter((photo) => !existingIds.has(photo.id));

    this.listPhotos = [...this.listPhotos, ...filteredPhotos];
    this.isLoading = false;
  }

  private getAllPhotos(page: number) {
    this.photoService.getAllPhtos(page).pipe(
      tap((data) => {
        this.updatePhotosList(data);
        this.isLoading = false;
      })
    ).subscribe();
  }

  private searchPhotos(searchTerm: string, page: number) {
    this.photoService.searchPhotos(searchTerm, page).pipe(
      tap((data) => {
        this.updatePhotosList(data.results);
        this.isLoading = false;
      })
    ).subscribe();
  }
}
