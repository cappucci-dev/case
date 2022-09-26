import { BehaviorSubject } from 'rxjs';
import { ConsultaService } from './../../shared/consulta.service';
import { Component, OnInit } from '@angular/core';
import { storage } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private consulta:ConsultaService, private db:storage) { }

  dolar: number = 0;
  real: number = 0;

  valorDolar:number = 0;
  cepDigitado:any;
  cepEncontado:any;
  rua:string = '';
  cidade: string = '';
  bairro: string = '';
  nome: string = '';
  numero: any;
  frete: any;
  compras: any;

  origem:any = '01228200';
  distancia:any;

  transformaDolar() {
    this.dolar = this.real / this.valorDolar;
    this.dolar = parseFloat(this.dolar.toFixed(2))
  }

  transformaReal() {
    this.real = this.dolar * this.valorDolar;
    this.real = parseFloat(this.real.toFixed(2))
  }

  buscaCep() {
    this.consulta.consultaCep(this.cepDigitado)
    this.pegaCep().subscribe((resp) => {
      if (resp != null || resp != undefined) {
        this.cepEncontado = resp;
        this.rua = resp.logradouro;
        this.bairro = resp.bairro;
        this.cidade = resp.cidade;
      }
    })
  }

  buscaDistancia() {
    this.consulta.consultaDistancia(this.origem,this.cepDigitado)
    this.pegaDistancia().subscribe((resp:any) => {
      if(resp != null || resp != undefined)
      resp.rows.forEach((linha:any) => {
        linha.elements.forEach((dist:any) => {
          this.distancia = dist
          this.frete = dist.distance.value / 1000 * 1;
          console.log(dist)
        })
      })
    })
  }

  pegaCep(): BehaviorSubject <any> {
    return this.consulta.cep$
  }

  pegaCotacao(): BehaviorSubject <any> {
    return this.consulta.cotacao$
  }

  pegaDistancia(): BehaviorSubject <any> {
    return this.consulta.distancia$
  }

  soma(frete: any, contratado: any) {
    parseFloat(frete?.toFixed(2))
    parseFloat(contratado?.toFixed(2))
    return frete + contratado
  }

  add() {
    var compra =
      {
        nome: this.nome,
        cep: this.cepDigitado,
        valor: this.dolar,
        distancia: this.frete
      }

    this.db.add(compra).then((res:any) => {
      if (res) {
        alert("Compora Efetuada Com Sucesso")
      }
    })
  }


  ngOnInit() {
    this.consulta.consultaCotacao();
    this.pegaCotacao().subscribe((resp) => {
      if(resp != null || resp != undefined)
      resp.forEach((dol: any) => {
        this.valorDolar = dol.bid
      })
    })
  }

}
