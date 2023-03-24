import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router: Router) {

  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    // Route the data to our "search" route, it will be handled by the ProductListComponent
    // (Why ? ) : To reuse the logic and view for listing products
    this.router.navigateByUrl(`/search/${value}`);
  }

}
