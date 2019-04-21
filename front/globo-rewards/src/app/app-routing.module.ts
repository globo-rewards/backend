import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnuncioComponent } from 'src/pages/anuncio/anuncio.component';
import { AnaliticoComponent } from 'src/pages/analitico/analitico.component';

const routes: Routes = [
  { path: 'anuncio', component: AnuncioComponent },
  { path: 'analitico', component: AnaliticoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
