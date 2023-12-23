import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IClientModel } from '../models/client.model';
import { IMenuModel } from 'src/app/common/models/menu.model';
import { IClientDataModel } from '../models/client-data.model';
import * as moment from 'moment';

@Injectable()
export class FundService {

    constructor(private http: HttpClient) { }

    public getFunds(clientId: string): Observable<Array<IMenuModel>> {
        return this.http.get<Array<IClientModel>>('/assets/datas/client.json')
            .pipe(map(datas => {
                let funds = datas.filter(data => data.Id === clientId)[0].Funds;
                return funds?.map(t => ({ Name: t.GeneralName, Path: `client/${clientId}/fund/${t.Id}` } as IMenuModel))
                    ?? [];
            }));
    }

    public getPortfolio(clientId: string): Observable<Array<IMenuModel>> {
        return this.http.get<Array<IClientModel>>('/assets/datas/client.json')
            .pipe(map(datas => {
                let funds = datas.filter(data => data.Id === clientId)[0].Highlights;
                return funds?.map(t => ({ Name: t.Name } as IMenuModel))
                    ?? [];
            }));
    }

    public getFileManager(clientId: string): Observable<Array<IMenuModel>> {
        return this.http.get<Array<IClientModel>>('/assets/datas/client.json')
            .pipe(map(datas => {
                return [
                    { Id: '1', Name: 'Tax center', Path: `client/${clientId}/file-manager/1` } as IMenuModel,
                    { Id: '2', Name: 'Other documents', Path: `client/${clientId}/file-manager/2` } as IMenuModel]
            }));
    }

    public getFundData(clientId: string, period: string): Observable<IClientDataModel> {
        return this.http.get<IClientDataModel>(`/assets/datas/client-${clientId}.json`).pipe(map(data => {
            data.CurrentPeriod = (data.Periods as any)[period]; data.Periods = undefined; return data;
        }));
    }

    public getPerformanceData(clientId: string, fundId: string, period: string): Observable<any> {

        // logic mock data

        return this.http.get<any>(`/assets/datas/fund-perf.json`).pipe(map(data => {

            let dateObject = moment(period);
            let mockData = (dateObject.year() % 100) + (dateObject.month());
            let matchedData = data[clientId][fundId];
            return {
                Name: matchedData.Name,
                SummarySector: matchedData.Summary.Sector.map((t: any) => { return { name: t.name, value: (t.value * 10) + mockData }; }),
                SummaryIndustry: matchedData.Summary.Industry.map((t: any) => { return { name: t.name, value: (t.value * 10) + mockData }; }),
                Investment: matchedData.Investment ?? [],
                PortDatas: matchedData.PortDatas
            };
        }));
    }
}