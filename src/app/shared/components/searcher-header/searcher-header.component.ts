import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'searcher-header',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './searcher-header.component.html',
  styleUrl: './searcher-header.component.scss'
})
export class SearcherHeaderComponent {
  private mainService = inject(MainService);
  private router = inject(Router);

  protected searchTerm: string = '';

  search() {
    // console.log(this.searchTerm)
    this.mainService.searchPhotos(this.searchTerm, 1).subscribe((data) => {
      console.log(data)

      this.router.navigate(['/search'], { queryParams: { searchTerm: this.searchTerm } });
    });

  }
}
