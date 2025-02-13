import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserCollectionCardComponent } from '../user-collection-card/user-collection-card.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'user-collections-list',
  imports: [UserCollectionCardComponent],
  templateUrl: './user-collections-list.component.html',
  styleUrl: './user-collections-list.component.scss'
})
export class UserCollectionsListComponent implements OnInit {

  userName = input.required<string>();

  private userService = inject(UserService);

  protected collections$$ = signal<any[]>([]);

  ngOnInit() {
    this.getCollections(this.userName());
  }


  private getCollections(userName: string) {
    this.userService.getUserCollections(userName).subscribe((collections) => {
      this.collections$$.set(collections)
    })
  }
}
