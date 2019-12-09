import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
// el operador map sirve para transformar lo que un observable puede regresar
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://heroesapp-67019.firebaseio.com/'


  constructor(private http: HttpClient) { 

  }

  crearHeroe(heroe: HeroeModel){
    // .json para decirle a firebase que use su REST API
    // /8/ segundo argumento es el body, lo que se envia en la api
    
    // se pasa por el metodo pipe de los observables, dentro del pipe ya pyuedo usar los operadores 
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp: any) => {
        // en vez de devolver solo la respuesta de firebase, se devuelve el heroe con el id modificado
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
}
