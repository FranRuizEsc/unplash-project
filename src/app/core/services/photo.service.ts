import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IPhoto, IPhotoSearchResult } from '../models/photo-info.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private http = inject(HttpClient);

  getAllPhotos(page = 1): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(environment.apiUrl + '/photos', { params: { page, per_page: 15 } });
  }

  getPhotoById(id: string): Observable<IPhoto> {
    return this.http.get<IPhoto>(environment.apiUrl + '/photos/' + id)
  }

  searchPhotos(query: string, page = 1): Observable<IPhoto[]> {
    return this.http.get<IPhotoSearchResult>(environment.apiUrl + '/search/photos', { params: { page, per_page: 15, query } }).pipe(map(photos => photos.results));
  }
}