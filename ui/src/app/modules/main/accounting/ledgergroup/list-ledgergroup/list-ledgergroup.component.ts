import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListQueryRespType } from '@fboutil/types/list.query.resp';
import { QueryData } from '@shared/util/query-data';
import { Subscription } from 'rxjs';
import { LedgerGroup } from '@shared/entity/accounting/ledger-group';
import { ActivatedRoute } from '@angular/router';
import { LedgerGroupService } from '@fboservices/accounting/ledger-group.service';
import { FilterItem } from '../../../directives/table-filter/filter-item';
import { FilterLedgergroupComponent } from '../filter-ledgergroup/filter-ledgergroup.component';
import { MatDialog } from '@angular/material/dialog';
import { ExportPopupComponent } from '../../../export-popup/export-popup.component';
import { MainService } from '../../../../../services/main.service';
import { ImportErrordataPopupComponent } from '../../../import-errordata-popup/import-errordata-popup.component';
@Component({
  selector: 'app-list-ledgergroup',
  templateUrl: './list-ledgergroup.component.html',
  styleUrls: [ './list-ledgergroup.component.scss' ]
})
export class ListLedgergroupComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'name', 'code', 'parent.name', 'parent.code', 'details' ];

  c = this.displayedColumns.length;

  columnHeaders = {
    name: 'Name',
    code: 'Code',
    'parent.name': 'Parent Name',
    'parent.code': 'Parent Code',
    details: 'Details',

  };

  xheaders = [

    {key: 'name',
      width: 30, },
    {key: 'code',
      width: 15 },
    { key: 'parent.name',
      width: 25 },
    { key: 'parent.code',
      width: 25 },
    { key: 'details',
      width: 35 }
  ];

  iheaders = [
    'Name',
    'Code',
    'Parent Name',
    'Parent Code',
    'Details'
  ];

  displayedColumns1: string[] = [ 'Name', 'Code', 'Details' ];

  columnHeaders1 = {
    Name: 'Name',
    Code: 'Code',
    Details: 'Details',
  };

  queryParams: QueryData = { };

  routerSubscription: Subscription;

  loading = true;

  ledgerGroups: ListQueryRespType<LedgerGroup> = {
    totalItems: 0,
    pageIndex: 0,
    items: []
  };

  filterItem: FilterItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly ledgerGroupService: LedgerGroupService,
    private dialog: MatDialog,
    private mainservice: MainService) { }

    private loadData = () => {

      this.loading = true;

      this.queryParams.include = [
        {
          relation: 'parent',
        }
      ];
      this.ledgerGroupService.list(this.queryParams).subscribe((ledgerGroup) => {

        this.ledgerGroups = ledgerGroup;
        this.loading = false;

      }, (error) => {

        console.error(error);
        this.loading = false;

      });

    }

    ngOnInit(): void {

      this.filterItem = new FilterItem(FilterLedgergroupComponent, {});

    }

    ngAfterViewInit(): void {

      this.activatedRoute.queryParams.subscribe((value) => {

        const {whereS, ...qParam} = value;
        this.queryParams = qParam;
        if (whereS) {

          this.queryParams.where = JSON.parse(whereS);

        }
        this.loadData();

      });


    }

    handleImportClick = (file: File): void => {

      this.ledgerGroupService.importLedgerGroup(file).subscribe((items) => {

        this.dialog.open(ImportErrordataPopupComponent, {height: '500px',
          data: {items,
            displayedColumns: this.displayedColumns1,
            columnHeaders: this.columnHeaders1}});

      });


    }

    handleExportClick = (): void => {

      const tParams = {...this.queryParams};
      tParams.limit = this.ledgerGroups.totalItems;
      this.loading = true;
      const data = [];
      this.ledgerGroupService.queryData(tParams).subscribe((items) => {

        items.forEach((element) => {


          const temp = [ element.name, element.code, element.parent?.name, element.parent?.code, element.details ];

          data.push(temp);

        });
        const result = {
          cell: this.c,
          rheader: this.iheaders,
          eheader: this.xheaders,
          header: this.columnHeaders,
          rowData: data
        };
        this.mainservice.setExport(result);

        this.dialog.open(ExportPopupComponent, {height: '500px',
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
