import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  cep$ = new BehaviorSubject(null);
  cotacao$ = new BehaviorSubject(null);
  distancia$ = new BehaviorSubject(null);

  consultaCep(cep: any) {
    try {
      var url = `https://api.postmon.com.br/v1/cep/${cep}`;
      this.http.get(url).subscribe({
        next: (data: any) => this.cep$.next(data),
        error: (error: HttpErrorResponse) => {
          this.cep$.next(null);
        }
      }).add(() => {
        this.cep$.unsubscribe(),
          this.cep$ = new BehaviorSubject(null)
      })
    } catch (e) {
      throw e
    }
  }

  consultaCotacao() {
    try {
      var url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/1`;
      this.http.get(url).subscribe({
        next: (data: any) => this.cotacao$.next(data),
        error: (error: HttpErrorResponse) => {
          this.cotacao$.next(null);
        }
      }).add(() => {
        this.cotacao$.unsubscribe(),
          this.cotacao$ = new BehaviorSubject(null)
      })
    } catch (e) {
      throw e
    }
  }

  consultaDistancia(origem: any, destino: any) {
    try {
      var apikey = 'AIzaSyB9TlnqqD66EeXfaW7-In1QeXvDk7HyqaI'
      var url = `maps/api/distancematrix/json?destinations=${destino}&origins=04372140&key=AIzaSyB9TlnqqD66EeXfaW7-In1QeXvDk7HyqaI`;
      this.http.get(url).subscribe({
        next: (data: any) => this.distancia$.next(data),
        error: (error: HttpErrorResponse) => {
          this.distancia$.next(null);
        }
      }).add(() => {

        this.distancia$.unsubscribe(),
          this.distancia$ = new BehaviorSubject(null)
      })
    } catch (e) {
      throw e
    }
  }




}
