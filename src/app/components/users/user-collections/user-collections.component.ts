import { Component, input } from '@angular/core';

@Component({
  selector: 'user-collections',
  imports: [],
  templateUrl: './user-collections.component.html',
  styleUrl: './user-collections.component.scss'
})
export class UserCollectionsComponent {

  userName = input.required<string>();

}
