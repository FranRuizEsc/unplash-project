import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/main/main/main.component').then((m) => m.MainComponent),
	},
	{
		path: 'search',
		loadComponent: () => import('./../app/shared/components/search-result/search-result.component').then((m) => m.SearchResultComponent),
	},
	{
		path: 'photo/:photo_id',
		loadComponent: () => import('./components/photos/photo-detail/photo-detail.component').then((m) => m.PhotoDetailComponent)
	}
]