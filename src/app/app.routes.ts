import { Routes } from '@angular/router';

export const ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./components/main/main/main.component').then((m) => m.MainComponent),
	},
	{
		path: 'search',
		loadComponent: () => import('./shared/components/search-result/search-result.component').then((m) => m.SearchResultComponent),
	},
	{
		path: 'photo',
		loadChildren: () => import('./components/photos/photos.routes').then((m) => m.PHOTOS_ROUTES)
	},
	{
		path: 'user',
		loadChildren: () => import('./components/users/users.routes').then((m) => m.USER_ROUTES)
	},
	{
		path: 'collection',
		loadChildren: () => import('./components/collection/collection.routes').then((m) => m.COLLECTION_ROUTES)
	}
]