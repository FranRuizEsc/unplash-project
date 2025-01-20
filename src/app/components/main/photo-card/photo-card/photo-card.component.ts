import { Component, Input } from '@angular/core';

@Component({
  selector: 'photo-card',
  imports: [],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  @Input({ required: true }) photo: any;


  ngOnInit() {
  }
}
