import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from '../models/Character';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FortniteService {

  constructor(private _httpClient: HttpClient) { }

  getCharacters(){
    return this._httpClient.get(`${environment.baseUrl}/personajes`);
  }

  getCharacter(id: string): Observable<any>{
    return this._httpClient.get<any>(`${environment.baseUrl}/personajes/${id}`);
  }

  getUrlCharacter(url: string){
    return this._httpClient.get<Character>(url)
  }

  addCharacter(character: Character, selectedFile: File): Observable<Character>{
    try{

      const formData = new FormData()
      formData.append('name', character.name)
      formData.append('img', selectedFile)
      formData.append('season', character.season)
      formData.append('location', character.location)
      formData.append('gun', character.gun)

      console.log(formData)
      return this._httpClient.post<any>(`${environment.baseUrl}/personajes`, formData);
    }catch(error) {
      console.log(error);
      return new Observable<Character>
    }
  }

  updateCharacter(character: Character, selectedFile: File): Observable<Character>{
    try{

      const formData = new FormData()
      formData.append('name', character.name)
      formData.append('img', selectedFile)
      formData.append('season', character.season)
      formData.append('location', character.location)
      formData.append('gun', character.gun)

      console.log(formData)
      return this._httpClient.put<any>(`${environment.baseUrl}/personajes/${character._id}`, formData);
    }catch(error) {
      console.log(error);
      return new Observable<Character>
    }
  }

  deleteCharacter(id: string): Observable<any> {
    return this._httpClient.delete<any>(`${environment.baseUrl}/personajes/${id}`);
  }
}
