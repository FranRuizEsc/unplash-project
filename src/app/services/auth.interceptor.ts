import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = environment.apiKey

        const authReq = req.clone({
            setHeaders: {
                Authorization: `Client-ID ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        return next.handle(authReq);
    }
}