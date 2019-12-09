import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from "../../services/heroes.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  // variable para manejar el formulario
  formulario: FormGroup;
  heroe = new HeroeModel();

  // se inyecta servicio de router link para obtener la info de la url
  constructor(private heroesService: HeroesService, public route: ActivatedRoute) {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }
    // console.log(form);
    console.log(this.heroe);

    // para cuando se guarde dispare el alert
    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      icon: "info",
      allowOutsideClick: false
    });

    Swal.showLoading();

    // variable observable para obtener los resultados de los dos observables del servicio
    let peticion: Observable<any>;

    // si existe id, lo actualiza, sino lo crea
    peticion = this.heroe.id
      ? this.heroesService.actualizarHeroe(this.heroe)
      : this.heroesService.crearHeroe(this.heroe);

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: "Se actualizó correctamente",
        icon: "success",
      });
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }
}
