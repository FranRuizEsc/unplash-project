import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";

export const USER_ROUTES: Routes = [
	{ path: ':username', component: UserDetailComponent }
]