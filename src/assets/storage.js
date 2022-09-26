window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  alert("Seu browser não suporta indexedDB")
}

var db;
var request = window.indexedDB.open("pedidos",3);

request.onerror = function(event) {
  console.log("error" + event.target.result)
}

request.onsuccess = function(event) {
  db = request.result;
  console.log("success"+db)
}

request.onupgradeneeded = function (event) {
  var db = event.currentTarget.result.createObjectStore("pedidos", {autoIncrement:true});
}
