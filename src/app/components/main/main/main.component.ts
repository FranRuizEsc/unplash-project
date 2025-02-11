import { Component } from '@angular/core';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';

@Component({
  selector: 'main',
  imports: [PhotosListComponent, ToolbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
