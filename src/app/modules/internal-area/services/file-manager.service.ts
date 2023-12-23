import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { IFileModel } from '../models/file.model';

@Injectable()
export class FileManagerService {
    constructor(private http: HttpClient) { }

    public getFile(clientId: string, docId: string): Observable<IFileModel> {
        return this.http.get<Map<string, IFileModel>>(`/assets/datas/file.json`)
            .pipe(map((t) => (t as any)[docId]));

    }

    public getDocTypeName(clientId: string, docId: string): Observable<string> {
        let docTypeName = new Subject<string>()
        setTimeout(() => {
            if (docId == '1') {
                docTypeName.next('Tax center');
            }
            else if (docId == '2') {
                docTypeName.next('Other documents');
            }
        }, 1);
        return docTypeName.asObservable()
    }
}