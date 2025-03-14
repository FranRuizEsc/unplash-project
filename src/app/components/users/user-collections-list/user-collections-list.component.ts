import { ICollection } from './../../../core/models/collection.interface';
import { Component, inject, input, OnInit } from '@angular/core';
import { UserCollectionCardComponent } from '../user-collection-card/user-collection-card.component';
import { UserService } from '../../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollectionService } from '../../../core/services/collection.service';
import { switchMap, map, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'user-collections-list',
  imports: [
    UserCollectionCardComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    CommonModule,
    ScrollingModule,
  ],
  templateUrl: './user-collections-list.component.html',
  styleUrl: './user-collections-list.component.scss',
})
export class UserCollectionsListComponent implements OnInit {
  userName = input.required<string>();

  private userService = inject(UserService);
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  private page = 1;
  private hasMorePhotos = true;

  protected collections: ICollection[] = [];
  protected isLoading: boolean = false;

  ngOnInit() {
    this.loadCollections();
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    if (scrollTop + clientHeight >= scrollHeight - 100 && this.hasMorePhotos) {
      this.page++;
      this.loadCollections();
    }
  }

  protected openCollection(collectionId: number) {
    this.router.navigate(['/collection', collectionId]);
  }


  private loadCollections() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.getCollections(this.userName(), this.page).subscribe((collectionsWithStatus: ICollection[]) => {
      this.updateCollections(collectionsWithStatus);
      this.isLoading = false;
    });
  }

  private updateCollections(collections: ICollection[]) {
    const existingIds = new Set(this.collections.map(collection => collection.id));
    collections = collections.filter(collection => !existingIds.has(collection.id));
    this.collections = [...this.collections, ...collections];
  }

  private getCollections(userName: string, page: number) {
    return this.userService
      .getUserCollections(userName, page)
      .pipe(
        switchMap(collections => {
          const collectionObservables = collections.map((collection: ICollection) =>
            this.collectionService.getCollectionPhotosById(collection.id.toString()).pipe(
              map(photos => ({
                ...collection,
                hasPhotos: photos.length > 0,
              }))
            )
          );
          return forkJoin(collectionObservables);
        })
      );
  }
}
