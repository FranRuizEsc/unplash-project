import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';

@Component({
  selector: 'collection-details',
  imports: [PhotosListComponent],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss'
})
export class CollectionDetailsComponent {
  protected collectionId: string;

  constructor(
    private route: ActivatedRoute) {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      this.collectionId = queryParams['collectionId'];
    })
  }
}
