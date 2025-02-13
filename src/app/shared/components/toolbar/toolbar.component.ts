import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscription = new Subscription()

  protected searchTerm: string = '';

  ngOnInit() {
    const queryParams$ = this.route.queryParams

    this.subscription.add(queryParams$.subscribe((queryParams) => {
      this.searchTerm = queryParams['searchTerm'];
    }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected search() {
    this.router.navigate(['/search'], { queryParams: { searchTerm: this.searchTerm } });
  }

  protected navigateTohome() {
    this.searchTerm = '';
    this.router.navigate(['/']);
  }
}
