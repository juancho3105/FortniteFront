import { Component, Input, OnInit } from '@angular/core';
import { FortniteService } from 'src/app/services/fortnite.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {
  @Input() characters: Array<string> = []

  images: Array<String> = []

  constructor(
    private service: FortniteService
  ){}

  ngOnInit(): void {
    this.getCharacters()
  }

  getCharacters(){
    this.characters.forEach(url => {
      this.service.getUrlCharacter(url)
      .subscribe(res => {
        this.images.push(res.img)
      })
    })
  }
}
