import { Component } from '@angular/core';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';

@Component({
  selector: 'main',
  imports: [PhotosListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
