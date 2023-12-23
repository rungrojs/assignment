import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { FundService } from '../../services/fund.services';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  @ViewChild('allocate', { read: MatRipple })
  ripperAllocate?: MatRipple

  @ViewChild('investment', { read: MatRipple })
  ripperInvestment?: MatRipple

  optionAllocate = {
    options: {
      colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      pieHole: 0.4,
      pieSliceText: 'value',
      legend: {
        position: 'right'
      }
    },
    chartType: ChartType.PieChart,
    title: '',
    itemNames: ['name', 'value'],
    height: 400,
    mode: 'Sector'
  }

  optionInvest = {
    options: {
      legend: {
        position: 'bottom'
      },
      pointSize: 3,
      vAxis: {
        title: 'USD (M)',
      },
      hAxis: {
        ticks: [],
        slantedText: true,
      },
    },
    chartType: ChartType.LineChart,
    title: '',
    itemNames: ["Quarter", "Cumulative investment cost", "Cumulative total value"],
    width: 600,
    height: 400
  }

  selectedDate: any = '2020-01-01'

  currentData: any

  dataAllocate: any[] = []

  dataInvest: any[] = []

  portGroup?: string

  constructor(
    private fundService: FundService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  getCurrentClientId() {
    return this.activatedRoute.snapshot.params['clientId'];
  }

  getCurrentFundId() {
    return this.activatedRoute.snapshot.params['fundId'];
  }

  loadData(isLoadAllocation: boolean = true, isLoadInvestment: boolean = true) {
    this.fundService.getPerformanceData(this.getCurrentClientId(), this.getCurrentFundId(), this.selectedDate)
      .subscribe(result => {
        this.currentData = result;
        if (isLoadAllocation) {
          this.bindAllocationChart();
        }
        if (isLoadInvestment) {
          this.bindInvestmentChart();
        }
      });
  }

  bindAllocationChart() {
    this.dataAllocate = this.currentData[`Summary${this.optionAllocate.mode}`].map((t: any) => [t.name, t.value]);
    this.ripperAllocate?.launch({});
  }

  bindInvestmentChart() {
    this.dataInvest = (this.currentData.Investment as any[]);
    this.ripperInvestment?.launch({});
  }

  changeGroupBy(value: any) {
    this.optionAllocate.mode = value;
    this.bindAllocationChart();
  }

  changeDate(value: any) {
    this.selectedDate = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD')
    this.loadData(true, false);
  }

  changePortGroupBy(value: any) {
    this.portGroup = value;
  }
}
