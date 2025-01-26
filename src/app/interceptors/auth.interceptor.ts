import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const token = environment.apiKey

    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Client-ID ${token}`)
        })
    }

    return next(req);
}