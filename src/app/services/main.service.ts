import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private http = inject(HttpClient);

  getAllPhtos() {
    return this.http.get<any>(environment.apiUrl + '/photos');
  }
}