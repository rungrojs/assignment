import { Type } from "@angular/core";

export interface IMenuModel {
    Id?: string
    Name: string,
    Path?: string,
    Component?: Type<any>,
    IsShowInNavigation: boolean,
    ChildMethod?: string
    Childs: Array<IMenuModel>
}