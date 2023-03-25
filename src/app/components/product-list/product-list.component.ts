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
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  // New properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;


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

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {

    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(searchKeyword).subscribe(
      data => {
        this.products = data;
      }
    );

  }

  handleListProducts() {

    // Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the id param string and convert it to number using +operator, also make
      // note of the non-null assertion
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }


    /**
     * Check if we have a previous category than previous
     * Note: Angular will reuse a component if it is currently being viewed (state information will be retained)
     **/

    // If we have a different category Id than previous set the page number to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId; // update previous category Id for the next time the method is fired

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);



    // Method in the service is only invoked once we subscribe
    // Get the product list for current category id
    this.productService.getProductListPaginated(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
                       .subscribe(
                        data => {
                          this.products = data._embedded.products;
                          this.pageNumber = data.page.number + 1; // Pages in Spring Data REST are 0-based, whereas in ng they are 1-based
                          this.pageSize = data.page.size;
                          this.totalElements = data.page.totalElements;
                        }
                       );

  }

}
