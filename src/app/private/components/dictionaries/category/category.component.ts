import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { EditItemComponent } from '../../dialog/edit-item/edit-item.component';
import { ItemData } from '../../dialog/item-data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description'];
  dataSource: MatTableDataSource<Category>;

  constructor(private categoryService: CategoryService,
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

  update(category: Category) {
    this.openDialog({id: category.id, value: category.description} as ItemData);
  }

  private openDialog(item: ItemData): void {
    const dialogRef: MatDialogRef<EditItemComponent, ItemData> = this.dialog.open(EditItemComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.categoryService.update(new Category(result.id, result.value)).subscribe(() => this.initDataSource());
        } else {
          this.categoryService.save(new Category(result.id, result.value)).subscribe(() => this.initDataSource());
        }
      }
    });
  }

  private initDataSource() {
    this.categoryService.getAll().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
