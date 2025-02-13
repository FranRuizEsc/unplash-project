import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private http = inject(HttpClient);

  getAllPhotos(page = 1) {
    return this.http.get<any>(environment.apiUrl + '/photos', { params: { page, per_page: 15 } });
  }

  getPhotoById(id: string) {
    return this.http.get<any>(environment.apiUrl + '/photos/' + id)
  }

  searchPhotos(query: string, page = 1) {
    return this.http.get<any>(environment.apiUrl + '/search/photos', { params: { page, per_page: 15, query } });
  }
}