import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class ProductService {

    private URL_BASE = environment.URL_BASE; 

    constructor(private httpClient: HttpClient){};

    findAll(numberOdResults: number = 10) {
        return this.httpClient.get(this.URL_BASE+'products', {
            params: {
                limit: numberOdResults.toString()
            }
        })
    }
}