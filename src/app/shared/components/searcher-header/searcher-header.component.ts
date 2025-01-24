import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'searcher-header',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './searcher-header.component.html',
  styleUrl: './searcher-header.component.scss'
})
export class SearcherHeaderComponent {
  protected searchTerm: string = '';

  ngOnInit() {
    // console.log(this.searchTerm)
  }

  search() {
    console.log(this.searchTerm)
  }
}
