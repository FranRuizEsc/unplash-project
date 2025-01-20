import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/main/photos-list/photos-list.component').then((m) => m.PhotosListComponent),
	}
]