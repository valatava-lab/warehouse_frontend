import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, AfterViewInit {

  form: FormGroup = new FormGroup({
    customer: new FormControl(false),
    description: new FormControl(false),
    code: new FormControl(false),
    bridge: new FormControl(false),
    price: new FormControl(false),
    amount: new FormControl(false)
  });

  customer = this.form.get('customer');
  description = this.form.get('description');
  code = this.form.get('code');
  bridge = this.form.get('bridge');
  price = this.form.get('price');
  amount = this.form.get('amount');

  /**
   * Control column ordering and which columns are displayed.
   */
  columnDefinitions = [
    {
      def: 'customer',
      label: 'Производитель',
      hide: this.customer.value
    },
    {
      def: 'description',
      label: 'Описание',
      hide: this.description.value
    },
    {
      def: 'code',
      label: 'Код товара',
      hide: this.code.value
    },
    {
      def: 'bridge',
      label: 'Перемычка',
      hide: this.bridge.value
    },
    {
      def: 'price',
      label: 'Цена',
      hide: this.price.value
    },
    {
      def: 'amount',
      label: 'Кол-во',
      hide: this.amount.value
    }
  ];

  dataSource: MatTableDataSource<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initDataSource();
  }

  ngAfterViewInit() {
    const o1: Observable<boolean> = this.customer.valueChanges;
    const o2: Observable<boolean> = this.description.valueChanges;
    const o3: Observable<boolean> = this.code.valueChanges;
    const o4: Observable<boolean> = this.bridge.valueChanges;
    const o5: Observable<boolean> = this.price.valueChanges;
    const o6: Observable<boolean> = this.price.valueChanges;

    merge(o1, o2, o3, o4, o5, o6).subscribe(v => {
      this.columnDefinitions[0].hide = this.customer.value;
      this.columnDefinitions[1].hide = this.description.value;
      this.columnDefinitions[2].hide = this.code.value;
      this.columnDefinitions[3].hide = this.bridge.value;
      this.columnDefinitions[4].hide = this.price.value;
      this.columnDefinitions[5].hide = this.price.value;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  private initDataSource() {
    this.productService.getAll().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
