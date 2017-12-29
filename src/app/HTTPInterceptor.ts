import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

/**
 * Questa classe ha il compito di intercttare tutte le richieste HTTP e aggiungerci il JWT nell'header se l'utente è
 * loggato, in caso contrario non fa nulla
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

/**
 * Questa classe ha il compito di intercettare tutte le richieste HTTP ed inserire l'URL del backend in ognununa di esse
 * in modo tale che, in caso di bisogno, basta cambiare l'URL da qui per tutta l'applicazione
 */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
    backendURL = `http://188.226.186.60/pollutech/api/`;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const apiReq = req.clone({url: this.backendURL + `${req.url}`});
        return next.handle(apiReq);
    }
}