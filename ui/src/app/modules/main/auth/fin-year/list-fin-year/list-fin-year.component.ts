import { Component, OnInit } from '@angular/core';
import { FinYearService } from '@fboservices/auth//fin-year.service';
import { ListQueryRespType } from '@fboutil/types/list.query.resp';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryData } from '@shared/util/query-data';
import { FilterItem } from '../../../directives/table-filter/filter-item';
import { FilterFinYearComponent } from '../filter-fin-year/filter-fin-year.component';
import { FinYear } from '@shared/entity/auth/fin-year';
import * as dayjs from 'dayjs';
import { environment } from '@fboenvironments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ExportPopupComponent } from '../../../export-popup/export-popup.component';
import { MainService } from '../../../../../services/main.service';
@Component({
  selector: 'app-list-fin-year',
  templateUrl: './list-fin-year.component.html',
  styleUrls: [ './list-fin-year.component.scss' ]
})
export class ListFinYearComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'code', 'startDate', 'endDate', 'branch.name' ];

  columnHeaders = {
    name: 'Name',
    code: 'Code',
    startDate: 'StartDate',
    endDate: 'EndDate',
    'branch.name': 'Branch',

  }
  xheaders = [

    { header: 'Name', key: 'name', width: 30, },
    { header: 'Code', key: 'code', width: 15 },
    { header: 'StartDate', key: 'startDate', width: 15 },
    { header: 'EndDate', key: 'EndDate', width: 15 },
    { header: 'Branch', key: 'Branch', width: 25 },

  ];

  loading = true;

  queryParams: QueryData = {};

  routerSubscription: Subscription;


  FinYears: ListQueryRespType<FinYear> = {
    totalItems: 0,
    pageIndex: 0,
    items: []
  };


  filterItem: FilterItem;

  columnParsingFn = (element:unknown, column:string): string => {

    switch (column) {


    case 'startDate':
      return dayjs(element[column]).format(environment.dateFormat);

    case 'endDate':
      return dayjs(element[column]).format(environment.dateFormat);


    }
    return null;

  }

  constructor(private activatedRoute: ActivatedRoute,
    private finYearService: FinYearService,
    private dialog: MatDialog,
    private mainservice: MainService,) { }


  private loadData = () => {

    this.loading = true;

    this.queryParams.include = [ {
      relation: 'branch'
    } ];
    this.finYearService.list(this.queryParams).subscribe((finyear) => {


      this.FinYears = finyear;


      this.loading = false;


    }, (error) => {

      console.error(error);
      this.loading = false;

    });

  };


  ngOnInit(): void {

    this.filterItem = new FilterItem(FilterFinYearComponent, {});

  }

  ngAfterViewInit():void {

    this.activatedRoute.queryParams.subscribe((value) => {

      const {whereS, ...qParam} = value;
      this.queryParams = qParam;
      if (whereS) {

        this.queryParams.where = JSON.parse(whereS);

      }

      this.loadData();


    });

  }
  handleExportClick = (): void => {

    const tParams = {...this.queryParams};
    tParams.limit = this.FinYears.totalItems;
    this.loading = true;
    let data = []
    this.finYearService.queryData(tParams).subscribe((items) => {

      items.forEach((element: any) => {
        const temp = [element.name, element.code, element.startDate,element.endDate,element.branch.name];

        data.push(temp)
    });
    const result = {
      eheader:this.xheaders,
      header:this.columnHeaders,
      rowData: data
    }
  this.mainservice.setExport(result)

      this.dialog.open(ExportPopupComponent, {
        height: '500px',
        data: {items,
          displayedColumns: this.displayedColumns,
          columnHeaders: this.columnHeaders}});
      this.loading = false;


    }, (error) => {

      console.error(error);
      this.loading = false;

    });

  }

}
