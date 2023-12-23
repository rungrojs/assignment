import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';
import { FundService } from '../../services/fund.services';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  currentPeriod: string = 'Q1 2021'

  fund: any = {}

  options = {
    legend: { position: 'top', maxLines: 3 },
    hAxis: {
      title: ''
    },
    vAxis: {
      minValue: 0
    },
    isStacked: true,
    colors: ['transparent', '#0070c0', '#1f4e79']
  }

  datas: any[][] = []

  settings = {
    title: '',
    chartType: ChartType.ColumnChart,
    itemNames: [] as string[],
    width: 850,
    height: 300
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private fundService: FundService
  ) { }

  ngOnInit(): void {
    this.getDataByPeriod();
  }

  getDataByPeriod() {
    let clientId = this.getCurrentClientId();
    this.fundService.getFundData(clientId, this.currentPeriod).subscribe(result => {
      this.fund = result;
      let datas = []
      for (let indexKey = 0; indexKey < this.fund.AggKeys.length; indexKey++) {
        let key = this.fund.AggKeys[indexKey];
        let item = [this.fund.AggItems[indexKey], this.fund.Margin[key]]
        for (const element of this.fund.CurrentPeriod.FundDatas) {
          item.push(element[key]);
        }
        datas.push(item)
      }
      this.datas = datas;

      let itemNames = ['Value', ''];
      for (const element of this.fund.CurrentPeriod.FundDatas) {
        itemNames.push(element.GeneralName);
      }
      this.settings.itemNames = itemNames;
    });
  }

  changePeriod(periodId: string) {
    this.currentPeriod = periodId;
    this.getDataByPeriod();
  }

  getCurrentClientId() {
    return this.activatedRoute.snapshot.params['clientId'];
  }

  transformValue(v: number): number {
    return Math.abs(v)
  }
}
