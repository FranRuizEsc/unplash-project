import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

    // const token = environment.apiKey
    const token = 'HfShdtTT-I55evG98MofLILhoZUD6pYTgSDGhAefHwU'

    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Client-ID ${token}`)
        })
    }

    return next(req);
}