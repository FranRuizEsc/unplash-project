import { ICollection } from './../../../core/models/collection.interface';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserCollectionCardComponent } from '../user-collection-card/user-collection-card.component';
import { UserService } from '../../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollectionService } from '../../../core/services/collection.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'user-collections-list',
  imports: [UserCollectionCardComponent, MatProgressSpinnerModule, MatTooltipModule, MatIconModule, ScrollingModule],
  templateUrl: './user-collections-list.component.html',
  styleUrl: './user-collections-list.component.scss',
})
export class UserCollectionsListComponent implements OnInit {
  userName = input.required<string>();

  private userService = inject(UserService);
  private collectionService = inject(CollectionService);
  private router = inject(Router);
  private page = 1;
  private hasMoreCollections = true;


  protected collections$$ = signal<ICollection[]>([]);
  protected isLoading: boolean = false;

  ngOnInit() {
    this.loadCollections();
  }


  onScroll(event: any) {
    const viewport = event.target;
    const scrollPosition = viewport.scrollTop + viewport.clientHeight;
    const scrollThreshold = viewport.scrollHeight - 50;

    if (scrollPosition >= scrollThreshold && !this.isLoading && this.hasMoreCollections) {
      this.page++;
      this.loadCollections(this.page);
    }
  }

  protected openCollection(collectionId: number) {
    this.router.navigate(['/collection', collectionId]);
  }

  private loadCollections(page = 1) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.userService.getUserCollections(this.userName(), page).pipe(
      switchMap((collections) => {
        if (!collections || collections.length === 0) {
          this.hasMoreCollections = false;
          return of([]);
        }

        const collectionObservables = collections.map((collection: ICollection) =>
          this.collectionService.getCollectionPhotosById(collection.id.toString(), page).pipe(
            map(photos => ({
              ...collection,
              hasPhotos: photos.length > 0
            }))
          )
        );
        return forkJoin(collectionObservables);
      })
    ).subscribe((collectionsWithStatus: ICollection[]) => {
      const currentCollections = this.collections$$();
      const newCollections = collectionsWithStatus.filter(
        (newCollection) => !currentCollections.some((existing) => existing.id === newCollection.id)
      );
      this.collections$$.set([...currentCollections, ...newCollections]);
      this.isLoading = false;
      this.hasMoreCollections = collectionsWithStatus.length > 0;
    });
  }
}
