import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  count: Number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {  
    this.findAll();    
  }

  // findAll():any {
  //   this.productService.findAll().subscribe({
  //     next: (prods: any) => {
  //       // this.products = prods.products     
  //       return prods;
  //     },
  //     error: err =>  console.log('Error', err)      
  //   });
  // }

  findAll(): void {
    this.productService.findAll().subscribe( (prods: any) => {
      this.count = prods.count;
      this.products = prods.products;
    })    
  }

}
