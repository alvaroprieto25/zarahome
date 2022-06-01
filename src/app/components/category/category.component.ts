import { Component, HostListener, OnInit } from '@angular/core';
import productos from "../../data/productos.json";
import { Product } from 'src/app/interfaces/Product';
import { max, min, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products: Array<Product> = [];
  active = "";
  selectedProductName = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    productos.products.forEach((e: any) => {
      this.products.push(e);
    });
  }

  getMinPrice(product: Product){
    let colorMinPrices: number[] = [], res = "";
    product.colors.forEach(c => {
      colorMinPrices.push(Number(c.sizes[0].price));
    })
    let maxPriceNew = from(colorMinPrices).pipe(min((a,b)=>a-b));
    maxPriceNew.subscribe(result => {
      res = String(result);
      res = res.substring(0, res.length-2) + ',' + res.substring(res.length-2, res.length);
    });

    return res;
    /*
    let minPrice = Number.MAX_VALUE;
    product.colors.forEach(c => {
      c.sizes.forEach(s => {
        if(Number(s.price) < minPrice){
          minPrice = Number(s.price);
        }
      })
    });
    let result = String(minPrice);
    return result.substring(0, result.length-2) + ',' + result.substring(result.length-2, result.length);
    */
  }

  getMaxPrice(product: Product){
    let colorMaxPrices: number[] = [], res = "";
    product.colors.forEach(c => {
      colorMaxPrices.push(Number(c.sizes[c.sizes.length-1].price));
    })
    let maxPriceNew = from(colorMaxPrices).pipe(max((a,b)=>a-b));
    maxPriceNew.subscribe(result => {
      res = String(result);
      res = res.substring(0, res.length-2) + ',' + res.substring(res.length-2, res.length);
    });

    return res;
    /*
    let maxPrice = Number.MIN_VALUE;
    product.colors.forEach(c => {
      c.sizes.forEach(s => {
        if(Number(s.price) > maxPrice){
          maxPrice = Number(s.price);
        }
      })
    });
    let result = String(maxPrice);
    return result.substring(0, result.length-2) + ',' + result.substring(result.length-2, result.length);
    */
  }

  showName(color: string, name: string){
    this.active = color;
    this.selectedProductName = name;
  }

  reset(){
    this.active = "";
    this.selectedProductName = "";
  }

  redirectToProduct(p: Product){
    this.router.navigate(['/nombre-producto'], {queryParams: {p: p.id}});
  }
  

}
