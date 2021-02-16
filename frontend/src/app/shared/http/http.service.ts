import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class HttpService {
    // private endpoint = 'http://localhost:4005/api/';
    private endpoint = "http://15.206.93.148:4005/api/";

    constructor(private http: HttpClient) {}

    createAuthorizationHeader(headers: Headers) {
        headers.append("Authorization", "Basic lskdjfluweiowuri");
    }

    post(url, body, options): Observable<Response> {
        return this.http
            .post(this.endpoint + url, body, httpOptions)
            .pipe(map(this.parseData))
            .pipe(catchError(this.handleError));
    }

    get(url) {
        console.log(this.endpoint + url);
        return this.http
            .get(this.endpoint + url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    put(url, body, options): Observable<Response> {
        return this.http
            .put(this.endpoint + url, body, httpOptions)
            .pipe(map(this.parseData))
            .pipe(catchError(this.handleError));
    }

    delete(url) {
        return this.http
            .delete(this.endpoint + url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    private parseData(response: any) {
        return response;
    }

    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.error ? error.error : error.toString();

        return throwError(errorMessage);
    }
}
