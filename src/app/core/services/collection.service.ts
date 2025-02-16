import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPhoto } from '../models/photo-info.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private http = inject(HttpClient);

  getCollectionById(collectionId: string): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${environment.apiUrl}/collections/${collectionId}/photos`);
  }
}
