import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/main/main/main.component').then((m) => m.MainComponent),
	}
]