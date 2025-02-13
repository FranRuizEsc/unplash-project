import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserLikesComponent } from "./user-likes/user-likes.component";
import { UserCollectionsComponent } from "./user-collections/user-collections.component";
import { PhotosListComponent } from "../photos/photos-list/photos-list.component";

export const USER_ROUTES: Routes = [
	{
		path: ':username', component: UserDetailComponent,
		children: [
			{ path: '', component: PhotosListComponent },
			{ path: 'likes', component: UserLikesComponent },
			{ path: 'collections', component: UserCollectionsComponent }
		]
	}
]