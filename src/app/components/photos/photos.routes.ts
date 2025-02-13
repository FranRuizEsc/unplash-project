import { Routes } from "@angular/router";
import { PhotoDetailComponent } from "./photo-detail/photo-detail.component";

export const PHOTOS_ROUTES: Routes = [
    { path: ':photo_id', component: PhotoDetailComponent }
]