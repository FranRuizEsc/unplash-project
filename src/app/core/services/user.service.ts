import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/user.interfafce';
import { IPhoto } from '../models/photo-info.interface';
import { ICollection } from '../models/collection.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUserByName(name: string): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + '/users/' + name)
  }

  getUserPhotos(username: string, page = 1): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(environment.apiUrl + '/users/' + username + '/photos', { params: { page, per_page: 15 } })
  }

  getUserPhotosLiked(username: string, page = 1): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(environment.apiUrl + '/users/' + username + '/likes', { params: { page, per_page: 15 } })
  }

  getUserCollections(username: string, page = 1): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(environment.apiUrl + '/users/' + username + '/collections', { params: { page, per_page: 15 } })
  }
}
