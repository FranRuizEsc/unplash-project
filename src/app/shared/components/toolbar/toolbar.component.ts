import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected searchTerm$$ = signal<string>('');


  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      this.searchTerm$$.set(queryParams['searchTerm']);
    });
  }

  protected search() {
    this.router.navigate(['/search'], { queryParams: { searchTerm: this.searchTerm$$() } });
  }

  protected navigateTohome() {
    this.searchTerm$$.set('');
    this.router.navigate(['/']);
  }
}
