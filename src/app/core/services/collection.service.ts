import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPhoto } from '../models/photo-info.interface';
import { ICollection } from '../models/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private http = inject(HttpClient);


  getCollectionById(id: string) {
    return this.http.get<ICollection>(environment.apiUrl + '/collections/' + id);
  }

  getCollectionPhotosById(collectionId: string, page = 1): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${environment.apiUrl}/collections/${collectionId}/photos`, { params: { page, per_page: 15 } });
  }

}
