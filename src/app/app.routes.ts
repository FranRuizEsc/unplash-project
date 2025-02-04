import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/main/main/main.component').then((m) => m.MainComponent),
	},
	{
		path: 'search',
		loadComponent: () => import('./components/search-result/search-result.component').then((m) => m.SearchResultComponent),
	}
]