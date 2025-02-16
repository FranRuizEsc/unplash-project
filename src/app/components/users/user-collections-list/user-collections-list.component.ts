import { ICollection } from './../../../core/models/collection.interface';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserCollectionCardComponent } from '../user-collection-card/user-collection-card.component';
import { UserService } from '../../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollectionService } from '../../../core/services/collection.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'user-collections-list',
  imports: [UserCollectionCardComponent, MatProgressSpinnerModule, MatTooltipModule, MatIconModule],
  templateUrl: './user-collections-list.component.html',
  styleUrl: './user-collections-list.component.scss'
})
export class UserCollectionsListComponent implements OnInit {

  userName = input.required<string>();

  private userService = inject(UserService);
  private collectionService = inject(CollectionService)
  private router = inject(Router);

  protected collections$$ = signal<ICollection[]>([]);
  protected isLoading: boolean = false;

  ngOnInit() {
    this.getCollections(this.userName());
  }

  protected openCollection(collectionId: number) {
    this.router.navigate(['/collection', collectionId]);
  }

  private getCollections(userName: string) {
    this.userService.getUserCollections(userName).pipe(
      switchMap(collections => {
        const collectionObservables = collections.map((collection: ICollection) =>
          this.collectionService.getCollectionById(collection.id.toString()).pipe(
            map(photos => ({
              ...collection,
              hasPhotos: photos.length > 0
            }))
          )
        );
        return forkJoin(collectionObservables);
      })
    ).subscribe((collectionsWithStatus: ICollection[]) => {
      this.collections$$.set(collectionsWithStatus);
      this.isLoading = false;
    });
  }
}
