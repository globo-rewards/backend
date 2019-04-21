import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProgramaProvider {

    constructor(public http: HttpClient) { }

    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private programaURL = "https://globo-rewards-api.mybluemix.net/programa"

    private anuncioURL = "https://globo-rewards-api.mybluemix.net/anuncio"


    getProgramas(): Observable<Object> {
        return this.http.get(this.programaURL)
            .pipe(
                (res => res)
            );
    }


    addAnuncio(anuncio: any): Observable<Object> {
        return this.http.post(this.anuncioURL, anuncio)
            .pipe(
                (res => res)
            );
    }

}