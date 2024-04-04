import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { FortniteService } from 'src/app/services/fortnite.service';
import { take, filter, finalize } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = []
  query: string = ""

  constructor(
    private fortniteService: FortniteService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void{
    this.getCharacters();
    // this.onUrlChange();
  }

  onUrlChange(){
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.characters = []
      this.getParams()
    });
  }

  getParams(){
    this._activatedRoute.queryParams.pipe(
      take(1)
    ).subscribe(params => {
      this.query = params['q']
      this.getCharacters()
    })
  }

  getCharacters(){
    this.fortniteService.getCharacters()
    .subscribe((response: any) => {
      if(response?.data?.length){
        const { status, data } = response
        this.characters = [... this.characters, ... data]
      } else {
        this.characters = []
      }
    });
  }
    
  deleteCharacter(id: string) {
    this.fortniteService.deleteCharacter(id)
  }
    
}
