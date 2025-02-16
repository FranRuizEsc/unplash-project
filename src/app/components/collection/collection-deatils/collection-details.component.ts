import { Component } from '@angular/core';
import { CollectionService } from '../../../core/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'collection-details',
  imports: [],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss'
})
export class CollectionDetailsComponent {
  protected hasImages = false

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute) {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      this.getColectionById(queryParams['collectionId']);
    })
  }

  protected getColectionById(collectionId: string) {
    this.collectionService.getCollectionById(collectionId).subscribe((collection) => {
      if (collection.length > 0) {
        this.hasImages = true;
      }
      console.log('collectionsnsnsnsns', collection);
    })
  }
}


