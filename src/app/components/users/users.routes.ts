import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";

export const USER_ROUTES: Routes = [
	{
		path: ':username',
		component: UserDetailComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('../photos/photos-list/photos-list.component')
					.then(m => m.PhotosListComponent)
			},
			{
				path: 'likes',
				loadComponent: () => import('../photos/photos-list/photos-list.component')
					.then(m => m.PhotosListComponent)
			},
			{
				path: 'collections',
				loadComponent: () => import('./user-collections-list/user-collections-list.component')
					.then(m => m.UserCollectionsListComponent),
				children: [
					{
						path: ':collectionId',
						loadComponent: () => import('./user-collection-photos/user-collection-photos.component')
							.then(m => m.UserCollectionPhotosComponent)
					}
				]
			}
		]
	}
]