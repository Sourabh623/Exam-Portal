import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private login: LoginService){}
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        
            //add the jwt token from local storage and add the token to the request header
            let authReq = req;
            let token = this.login.getToken();
            if(token!=null)
            {
                authReq = authReq.clone({
                    setHeaders: {Authorization:`Bearer ${token}`}
                });
            }
            return next.handle(authReq);
        }
}
export const authProviders=
    {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptor, 
        multi: true,
    }
