import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosListComponent } from '../../../components/photos/photos-list/photos-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-result',
  imports: [PhotosListComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  protected searchTerm$$ = signal<string>('')


  constructor(private route: ActivatedRoute) {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      this.searchTerm$$.set(queryParams['searchTerm']);
    });
  }
}