import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MainService } from '@fboservices/main.service';

interface FoodNode {
  path: string;
  name: string;
  icon?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    icon: 'space_dashboard'
  },
  {path: 'item',
    name: 'Item',
    icon: 'layers',
    children: [
      {path: 'unit',
        name: 'Units'},
      {path: 'tax',
        name: 'Taxes'},
      {path: 'category',
        name: 'Categories'},
      {path: 'product',
        name: 'Products'},
    ]},
  {
    path: 'sale',
    name: 'Sale',
    icon: 'paid',
    children: [
      {path: 'invoice',
        name: 'Invoices'},
      {path: 'revenue',
        name: 'Revenues'},
      {path: 'customer',
        name: 'Customers'},
    ]
  },
  {path: 'purchase',
    name: 'Purchases',
    icon: 'shopping_cart',
    children: [
      {path: 'bill',
        name: 'Bills'},
      {path: 'payment',
        name: 'Payments'},
      {path: 'vendor',
        name: 'Vendors'},
    ]},
  {path: 'banking',
    name: 'Banking',
    icon: 'business_center',
    children: [
      {path: 'bank',
        name: 'Banks'},
      {path: 'transfer',
        name: 'Transfers'},
      {path: 'transaction',
        name: 'Transactions'},
    ] },
  {path: 'accounts',
    name: 'Accounts',
    icon: 'business_center',
    children: [
      {path: 'ledgerGroup',
        name: 'Ledger Group'},
      {path: 'ledger',
        name: 'Ledger'},
      {path: 'voucher',
        name: 'Voucher'},
      {path: 'cost-centre',
        name: 'Cost Centre'},
    ] },
  {path: 'report',
    name: 'Reports',
    icon: 'pie_chart'},
  {path: 'setting',
    name: 'Settings',
    icon: 'settings',
    children: [
      {path: 'branch',
        name: 'Branch'},
      {path: 'company',
        name: 'Company'},
      {path: 'fin-year',
        name: 'Fin Year'},
      {path: 'user',
        name: 'User'},
    ]}
];

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: [ './left-nav.component.scss' ]
})
export class LeftNavComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);

  dataSource = new MatTreeNestedDataSource<FoodNode>();

  activeNode:FoodNode = null;

  leftMenuDrawerOpened = false;

  constructor(private readonly mainService: MainService) {

    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {

    this.mainService.leftMenuDrawerSubject.subscribe((opened) => (this.leftMenuDrawerOpened = opened));

  }

  hasChild = (level: number, node: FoodNode):boolean => Boolean(node.children) && node.children.length > 0;

  handleMenuClick = (node: FoodNode):void => {

    this.activeNode = Boolean(node.children || node.children?.length) ? null : node;
    this.treeControl.isExpanded(node) ? this.treeControl.collapse(node) : this.treeControl.expand(node);

  }

}
