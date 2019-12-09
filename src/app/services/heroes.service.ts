import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
// el operador map sirve para transformar lo que un observable puede regresar
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroesService {
  private url = "https://heroesapp-67019.firebaseio.com/";

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    // .json para decirle a firebase que use su REST API
    // /8/ segundo argumento es el body, lo que se envia en la api

    // se pasa por el metodo pipe de los observables, dentro del pipe ya pyuedo usar los operadores
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        // en vez de devolver solo la respuesta de firebase, se devuelve el heroe con el id modificado
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    // creamos una variable que almacene el heroe temporal enviado y asi poder enviarle el objeto heroe sin id
    const heroeTemp = {
      ...heroe
    };
    // firebase al actualizar un registro, los datos que no encuentre en la bd, seran agredados (el id), 
    // pero el id ya esta especificado como clave del objeto y por ende se borra de heroe
    delete heroeTemp.id;

    // put para actualizar el heroe
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }
}
