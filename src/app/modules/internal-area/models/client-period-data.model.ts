import { IClientFundDataModel } from "./client-fund-data.model"

export interface IClientPeriodDataModel {
    Datas: number[][]
    FundDatas: IClientFundDataModel[]
    FundDetails: []
    FundSummary: []
    Previous: string
    Current: string
}