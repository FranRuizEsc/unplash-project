import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PhotosListComponent } from '../../../components/photos/photos-list/photos-list.component';
import { MainService } from '../../../services/main.service';
import { SearcherHeaderComponent } from '../searcher-header/searcher-header.component';

@Component({
  selector: 'app-search-result',
  imports: [PhotosListComponent, SearcherHeaderComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mainService = inject(MainService);
  private subscription = new Subscription();

  protected searchTerm: string = '';
  protected searchResult: any[] = [];

  ngOnInit() {
    const queryParams$ = this.route.queryParams

    this.subscription.add(queryParams$.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
    }));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
