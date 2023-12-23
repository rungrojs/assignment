import { IFundModel } from "./fund.model";
import { IHighlight } from "./highlight.model";

export interface IClientModel {
  Id: string;
  Name: string;
  Logo: string;
  Funds?: (IFundModel)[] | null;
  Highlights: (IHighlight)[] | null
}

