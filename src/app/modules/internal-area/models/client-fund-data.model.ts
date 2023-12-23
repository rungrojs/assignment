export interface IClientFundDataModel {
    Id: string
    Name: string
    GeneralName: string
    Status: string
    G_Con: number
    G_Con_M: number

    G_Dis: number
    G_Dis_M: number
    G_NAV_M: number
    G_NAV: number
    G_TOT: number
    G_TOT_M: number
}
// ,
//                     "Allocation": [
//                         {
//                             "Name": "Energy",
//                             "Val": 1
//                         },
//                         {
//                             "Name": "Insurance",
//                             "Val": 1
//                         },
//                         {
//                             "Name": "Material",
//                             "Val": 1
//                         }
//                     ]