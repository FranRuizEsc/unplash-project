import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';
import { CollectionService } from '../../../core/services/collection.service';
import { ICollection } from '../../../core/models/collection.interface';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'collection-details',
  imports: [PhotosListComponent, MatChipsModule],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss'
})
export class CollectionDetailsComponent {
  protected collectionId: string;
  protected collection: ICollection;

  private collectionService = inject(CollectionService)
  private router = inject(Router)

  constructor(
    private route: ActivatedRoute) {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      this.collectionId = queryParams['collectionId'];
      this.getCollectionInfo(this.collectionId)
    })
  }

  protected openCategory(category: string) {
    this.router.navigate(['/search'], { queryParams: { searchTerm: category } });
  }

  protected goToUserDetail() {
    this.router.navigate(['/user', this.collection.user.username]);
  }

  private getCollectionInfo(collectionId: string) {
    this.collectionService.getCollectionById(collectionId).subscribe((collection: ICollection) => {
      console.log(collection)
      this.collection = collection
    })
  }


}
