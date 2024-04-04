import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FortniteService } from 'src/app/services/fortnite.service';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.scss']
})
export class UpdateCharacterComponent implements OnInit {

  character: any = {}
  
  constructor(
    private fortniteService: FortniteService,
    private _router: Router, 
    private _activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id !== null){
      this.fortniteService.getCharacter(id).subscribe((response) => {

        const {status, data} = response

        this.character = {
          _id: data._id,
          name: data.name,
          season: data.season,
          location: data.location,
          gun: data.gun
        };
      });
    }
  }

  updateCharacter(){
    this.fortniteService.updateCharacter(this.character).subscribe(
      (respuesta) => {
        console.log('Personaje actualizado correctamente', respuesta);
        this._router.navigateByUrl('/characters')
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error en la solicitud HTTP:', error.message);
        } else {
          console.error('Error inesperado:', error);
        }
      }
    )
  }
}
