import { Injectable } from "@angular/core";
declare var db:any
@Injectable({
  providedIn: 'root'
})

export class storage {
  public storagename  = 'pedidos'

  constructor() {}

add(valor:any) {
  return new Promise(async(resolve:any, reject:any) => {

      const request = await db.transaction([this.storagename], "readwrite").objectStore(this.storagename).put(valor)
      request.onsuccess = await function(event:any) {
        if (event.target.result) {
          console.log("success");
          resolve("success")
        } else {
          console.log("error");
          resolve(false);
        }

    }
  })
}

get(nome:any) {
  var compras:any = []
  return new Promise(async(resolve:any, reject:any) => {
    if (db != undefined) {
      const request = await db.transaction([this.storagename]).objectStore(this.storagename).openCursor();
      request.onsuccess = await function(event:any) {
        var cursor = event.target.result
        if (cursor) {
          compras.push(cursor.value)
          cursor.continue()
          resolve(compras)
        } else {
          console.log("error");
          resolve(false);
        }
      }
    }
  })
}

delete(nome:any) {
  return new Promise(async(resolve:any, reject:any) => {
    if (db != undefined) {
      const request = await db.transaction([this.storagename], "readwrite").objectStore(this.storagename).delete(nome)
      request.onsuccess = await function(event:any) {
        if (event.target.result) {
          console.log("success");
          resolve("success")
        } else {
          console.log("error");
          resolve(false);
        }
      }
    }
  })
}




}
