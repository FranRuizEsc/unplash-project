import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { switchMap } from 'rxjs';
import { IUser } from '../../../core/models/user.interfafce';
import { MatIconModule } from '@angular/material/icon';
import { PhotosListComponent } from '../../photos/photos-list/photos-list.component';

@Component({
  selector: 'app-user-detail',
  imports: [ToolbarComponent, PhotosListComponent, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  protected userInfo$$ = signal<IUser | null>(null);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.route.params.pipe(takeUntilDestroyed(),
      switchMap((params) => this.userService.getUserByName(params['username'])))
      .subscribe((user: IUser) => {
        console.log(user);
        this.userInfo$$.set(user);
      });
  }

  protected goToSocialMedia(event: Event) {
    const url = (event.target as HTMLSelectElement).value;
    if (url) {
      window.open(url, '_blank');
      (event.target as HTMLSelectElement).selectedIndex = 0;
    }
  }
}
