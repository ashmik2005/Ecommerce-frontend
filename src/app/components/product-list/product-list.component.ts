import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Dev process for product search feature:
  // Step 5: Enhance ProductListComponent to read the category id
  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              // The current active route that loaded the component. Useful for
              // accessing route parameters
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {


    // Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the id param string and convert it to number using +operator, also make
      // note of the non-null assertion
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    // Method in the service is only invoked once we subscribe
    // Get the product list for current category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data; // Assign results to products array
      }
    )
  }

}
