import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerReportComponent } from './ledger/ledger-report/ledger-report.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { DataTableModule } from '../../data-table/data-table.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterLedgerReportComponent } from './ledger/filter-ledger-report/filter-ledger-report.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ LedgerReportComponent, FilterLedgerReportComponent ],
  imports: [
    CommonModule, ReportsRoutingModule, DataTableModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule,
    ReactiveFormsModule, FormsModule, MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatInputModule
  ]
})
export class ReportsModule { }
