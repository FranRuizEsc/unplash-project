import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'photo-card',
  imports: [RouterModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  @Input({ required: true }) photo: any;
}
