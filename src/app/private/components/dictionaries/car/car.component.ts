import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Car } from '../../../model/car';
import { CarService } from '../../../services/car.service';
import { EditItemComponent } from '../../dialog/edit-item/edit-item.component';
import { ItemData } from '../../dialog/item-data';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'model'];
  dataSource: MatTableDataSource<Car>;

  constructor(private carService: CarService,
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

  update(car: Car) {
    this.openDialog({id: car.id, value: car.model} as ItemData);
  }

  private openDialog(item: ItemData): void {
    const dialogRef: MatDialogRef<EditItemComponent, ItemData> = this.dialog.open(EditItemComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.carService.update(new Car(result.id, result.value)).subscribe(() => this.initDataSource());
        } else {
          this.carService.save(new Car(result.id, result.value)).subscribe(() => this.initDataSource());
        }
      }
    });
  }

  private initDataSource() {
    this.carService.getAll().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
