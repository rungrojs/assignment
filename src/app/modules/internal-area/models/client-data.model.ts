import { IClientPeriodDataModel } from "./client-period-data.model"

export interface IClientDataModel {
    Id: number
    Name: string
    Logo: string
    Periods?: Map<string, IClientPeriodDataModel>
    CurrentPeriod?: IClientPeriodDataModel
    AggItems: string[]
    AggKeys: string[]
}

