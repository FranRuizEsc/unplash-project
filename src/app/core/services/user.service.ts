import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/user.interfafce';
import { IPhoto } from '../models/photo-info.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUserByName(name: string) {
    return this.http.get<IUser>(environment.apiUrl + '/users/' + name)
  }

  getUserPhotos(username: string, page = 1) {
    return this.http.get<IPhoto[]>(environment.apiUrl + '/users/' + username + '/photos', { params: { page, per_page: 15 } })
  }
}
