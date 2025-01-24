import { Component } from '@angular/core';
import { PhotosListComponent } from '../photos-list/photos-list.component';
import { SearcherHeaderComponent } from '../../../shared/components/searcher-header/searcher-header.component';

@Component({
  selector: 'main',
  imports: [PhotosListComponent, SearcherHeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
