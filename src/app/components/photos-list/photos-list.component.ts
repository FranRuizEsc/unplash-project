import { MainService } from '../../services/main.service';
import { Component, inject, OnInit } from '@angular/core';
import { PhotoCardComponent } from '../../shared/components/photo-card/photo-card.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { VirtualScrollerModule } from '@iharbeck/ngx-virtual-scroller';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'photos-list',
  imports: [PhotoCardComponent, NgScrollbarModule, VirtualScrollerModule, CommonModule],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {
  private mainService = inject(MainService);
  private page = 1
  protected photos: any[] = [];


  ngOnInit() {
    this.page = 1;
    this.getAllPhotos(this.page);
  }

  protected loadMorePhotos() {
    this.page++;
    this.getAllPhotos(this.page);
  }

  private getAllPhotos(page: number) {
    this.mainService.getAllPhtos(page).subscribe((data) => {
      if (this.page === 1) {
        this.photos = data;
      } else {
        this.photos = [...this.photos, ...data].filter((photo, index, self) =>
          index === self.findIndex((p) => p.id === photo.id)
        );
      }
    });

  }
}
