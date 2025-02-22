import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserCollectionCardComponent } from '../user-collection-card/user-collection-card.component';
import { UserService } from '../../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ICollection } from '../../../core/models/collection.interface';

@Component({
  selector: 'user-collections-list',
  imports: [UserCollectionCardComponent, MatProgressSpinnerModule],
  templateUrl: './user-collections-list.component.html',
  styleUrl: './user-collections-list.component.scss'
})
export class UserCollectionsListComponent implements OnInit {

  userName = input.required<string>();

  private userService = inject(UserService);

  protected collections$$ = signal<ICollection[]>([]);
  protected isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.getCollections(this.userName());
  }

  private getCollections(userName: string) {
    this.userService.getUserCollections(userName).subscribe((collections) => {
      this.collections$$.set(collections)
      this.isLoading = false;
    })
  }
}
