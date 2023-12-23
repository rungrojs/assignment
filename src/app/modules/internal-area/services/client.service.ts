import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IClientModel } from '../models/client.model';

@Injectable()
export class ClientService {
    constructor(private http: HttpClient) { }

    public getClients(): Observable<Array<IClientModel>> {
        return this.http.get<Array<IClientModel>>('/assets/datas/client.json');
    }

    public getClient(clientId: string): Observable<Array<IClientModel>> {
        return this.http.get<Array<IClientModel>>('/assets/datas/client.json')
            .pipe(map(data => data.filter(data => data.Id === clientId)));
    }
}