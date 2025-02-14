import { Component, input } from '@angular/core';
import { ICollection } from '../../../core/models/collection.interface';

@Component({
  selector: 'user-collection-card',
  imports: [],
  templateUrl: './user-collection-card.component.html',
  styleUrl: './user-collection-card.component.scss'
})
export class UserCollectionCardComponent {

  collection = input.required<ICollection>()

}
