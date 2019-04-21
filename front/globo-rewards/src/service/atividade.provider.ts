import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AtividadeProvider {

    constructor(public http: HttpClient) { }

    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private atividadeURL = "https://globo-rewards-api.mybluemix.net/atividade"


    getAtividades(): Observable<Object> {
        return this.http.get(this.atividadeURL)
            .pipe(
                (res => res)
            );
    }

    
}