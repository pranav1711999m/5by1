import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import { ProductRoutingModule } from './product.routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ToolBarModule } from '../../tool-bar/tool-bar.module';
import { DataTableModule } from '../../data-table/data-table.module';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { FilterProductComponent } from './filter-product/filter-product.component';

@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    DeleteProductComponent,
    FilterProductComponent,
  ],
  imports: [
    CommonModule, ToolBarModule, DataTableModule, ProductRoutingModule, MatTableModule,
    MatSortModule, MatInputModule, MatSelectModule, MatIconModule, MatPaginatorModule,
    MatButtonModule, MatButtonToggleModule, MatSlideToggleModule, MatAutocompleteModule, FormsModule,
    ReactiveFormsModule, MatChipsModule, MatRadioModule, ReactiveFormsModule, NgxSkeletonLoaderModule
  ]
})
export class ProductModule { }
