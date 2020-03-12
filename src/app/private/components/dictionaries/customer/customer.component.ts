import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { EditItemComponent } from '../../dialog/edit-item/edit-item.component';
import { ItemData } from '../../dialog/item-data';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description'];
  dataSource: MatTableDataSource<Customer>;

  constructor(private customerService: CustomerService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.openDialog({id: null, value: null} as ItemData);
  }

  update(customer: Customer) {
    this.openDialog({id: customer.id, value: customer.description} as ItemData);
  }

  private openDialog(item: ItemData): void {
    const dialogRef: MatDialogRef<EditItemComponent, ItemData> = this.dialog.open(EditItemComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.customerService.update(new Customer(result.id, result.value)).subscribe(() => this.initDataSource());
        } else {
          this.customerService.save(new Customer(result.id, result.value)).subscribe(() => this.initDataSource());
        }
      }
    });
  }

  private initDataSource() {
    this.customerService.getAll().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
