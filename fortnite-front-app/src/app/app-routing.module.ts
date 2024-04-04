import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CharactersComponent } from './components/characters/characters.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewCharacterComponent } from './components/new-character/new-character.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UpdateCharacterComponent } from './components/update-character/update-character.component';

const routes: Routes = [
  {
    path:"", redirectTo: "/home", pathMatch: 'full'
  },
  {
    path: "home", component: HomePageComponent
  },
  {
    path: "characters", component: CharactersComponent
  },
  {
    path: "newCharacter", component: NewCharacterComponent
  },
  {
    path: "edit/:id", component: UpdateCharacterComponent
  },
  {
    path: "**", component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
