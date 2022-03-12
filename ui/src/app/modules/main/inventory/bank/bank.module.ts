import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBankComponent } from './list-bank/list-bank.component';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { BankRoutingModule } from './bank.routing.module';
import { DeleteBankComponent } from './delete-bank/delete-bank.component';
import { DataTableModule } from '../../data-table/data-table.module';
import {MatTableModule} from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatSortModule} from '@angular/material/sort';
import { ToolBarModule } from '../../tool-bar/tool-bar.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FilterBankComponent } from './filter-bank/filter-bank.component';
@NgModule({
  declarations: [ ListBankComponent, CreateBankComponent, DeleteBankComponent, FilterBankComponent ],
  imports: [
    CommonModule, BankRoutingModule, DataTableModule, MatTableModule, NgxSkeletonLoaderModule,
    MatSortModule, ToolBarModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, FormsModule,
    MatInputModule, MatButtonModule
  ]
})
export class BankModule { }
