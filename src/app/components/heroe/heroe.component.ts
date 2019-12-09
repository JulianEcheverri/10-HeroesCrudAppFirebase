import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { HeroeModel } from "../../models/heroe.model";
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  // variable para manejar el formulario
  formulario: FormGroup;
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService) {
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }
    // console.log(form);
     console.log(this.heroe);
     this.heroesService.crearHeroe(this.heroe).subscribe(resp=> {
        console.log(resp);
     });
  }

  ngOnInit() {}
}
