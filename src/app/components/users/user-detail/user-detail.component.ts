import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { switchMap } from 'rxjs';
import { IUser } from '../../../core/models/user.interfafce';
import { MatIconModule } from '@angular/material/icon';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { UserCollectionsListComponent } from '../user-collections-list/user-collections-list.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    PhotosListComponent,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    RouterLink,
    UserCollectionsListComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  protected userInfo$$ = signal<IUser | null>(null);
  protected activeLink = signal<string>('photos');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.pipe(takeUntilDestroyed(),
      switchMap((params) => this.userService.getUserByName(params['username'])))
      .subscribe((user: IUser) => {
        this.userInfo$$.set(user);
      });

    this.activeLink.set(this.route.snapshot.firstChild?.routeConfig?.path || 'photos');
  }

  protected goToSocialMedia(event: Event) {
    const url = (event.target as HTMLSelectElement).value;
    if (url) {
      window.open(url, '_blank');
      (event.target as HTMLSelectElement).selectedIndex = 0;
    }
  }

  protected goTolocationSearch(location: string) {
    if (location) {
      this.router.navigate(['/search'], { queryParams: { searchTerm: location } });
    }
  }

  protected openCategory(category: string) {
    this.router.navigate(['/search'], { queryParams: { searchTerm: category } });
  }

  protected setActiveLink(link: string) {
    this.activeLink.set(link);
  }
}
