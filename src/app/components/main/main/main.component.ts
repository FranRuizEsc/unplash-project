import { Component } from '@angular/core';
import { SearcherHeaderComponent } from '../../../shared/components/searcher-header/searcher-header.component';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';

@Component({
  selector: 'main',
  imports: [PhotosListComponent, SearcherHeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
