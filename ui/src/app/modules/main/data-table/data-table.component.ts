import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainService } from '@fboservices/main.service';
import { PAGE_SIZE_OPTIONS } from '@fboutil/constants';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { QueryData } from '@shared/util/query-data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [ './data-table.component.scss' ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px',
        minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent {

  @Input() tableHeader: string;

  @Input() displayedColumns: Array<string>;

  @Input() columnHeaders: Record<string, string>;

  private _tableData:Array<unknown>;

  @Input()
  get tableData(): Array<unknown> {

    return this._tableData;

  }

  set tableData(tableData: Array<unknown>) {

    this._tableData = tableData;
    this.dataSource.data = tableData;

  }

  @Input() loading:boolean;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  extraColumns: Array<string>;

  dataSource = new MatTableDataSource<unknown>([]);

  pageSizeOptions:Array<number> = PAGE_SIZE_OPTIONS;

  expandedElement: unknown | null;

  queryParams:QueryData = { };

  constructor(private router:Router,
    private readonly mainService: MainService) { }

  ngAfterViewInit():void {

    // eslint-disable-next-line no-underscore-dangle
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
    if (this.mainService.isMobileView()) {

      // eslint-disable-next-line no-underscore-dangle
      this.paginator._intl.itemsPerPageLabel = '';
      const COLUMN_COUNT_MOBILE_VIEW = 3;
      this.extraColumns = this.displayedColumns;
      this.displayedColumns = this.extraColumns.splice(0, COLUMN_COUNT_MOBILE_VIEW);

    }
    this.paginator.page.subscribe((evt: PageEvent) => {

      this.queryParams.limit = evt.pageSize;
      this.queryParams.start = evt.pageIndex * evt.pageSize;
      this.router.navigate([], { queryParams: this.queryParams });

    });
    this.sort.sortChange.subscribe((cSort:Sort) => {

      this.queryParams.sortc = cSort.active;
      this.queryParams.sortd = cSort.direction;
      this.router.navigate([], { queryParams: this.queryParams });

    });

  }

}
