import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FortniteService } from 'src/app/services/fortnite.service';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {
  
  character: Character = Object.create(null);

  imgSelected: any

  constructor(
    private fortniteService: FortniteService,
    private _router: Router, 
    private _activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
  }

  addCharacter(){
    this.fortniteService.addCharacter(this.character, this.imgSelected).subscribe(
      (respuesta) => {
        console.log('Personaje creado correctamente', respuesta);
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

  handleImgSelect(event: any) {
    const selectedImg = event.target.files[0]
    this.imgSelected = selectedImg
  }


}
