import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroeComponent } from "./components/heroe/heroe.component";

const routes: Routes = [
  { path: "heroes", component: HeroesComponent },
  { path: "heroe/:id", component: HeroeComponent },
  { path: "**",  pathMatch: 'full',  redirectTo: 'heroes' }
];

@NgModule({
  // importamos en el modulo la variable de rutas configuradas previamente
  imports: [RouterModule.forRoot(routes)],
  // debemos exportar el modulo para que pueda ser usado de manera global
  exports: [RouterModule]
})
export class AppRoutingModule {}
// !!se debe declarar en los imports del app.module.ts
