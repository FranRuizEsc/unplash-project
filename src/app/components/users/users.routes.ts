import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { PhotosListComponent } from "../photos/photos-list/photos-list.component";
import { UserCollectionsListComponent } from "./user-collections-list/user-collections-list.component";

export const USER_ROUTES: Routes = [
	{
		path: ':username', component: UserDetailComponent,
		children: [
			{ path: '', component: PhotosListComponent },
			{ path: 'likes', component: PhotosListComponent },
			{ path: 'collections', component: UserCollectionsListComponent }
		]
	}
]