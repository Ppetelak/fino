/* const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },

]

var dadosinternos = [
    {
        nomelouco: "teste de dados",
        numerodevoolouco: "454878",
        horalouca: ""

    } 
]



passengers.forEach(passenger => { 
        console.log(passenger.name) 
        console.log(passenger.flightNumber) 
        console.log(passenger.time)
        console.log(dadosinternos)
    
}); 

dadosinternos.forEach(dados => {
    console.log(dados.nomelouco);
}) */


const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const express = require('express')
const app = express()

app.get('/', (request, response) => {
  // Lê o conteúdo do arquivo HTML
  const html = fs.readFileSync(path.resolve(__dirname, 'print.html'), 'utf-8');

  // Cria um objeto JSDOM a partir do conteúdo HTML
  const dom = new JSDOM(html);

  // Obtém o botão do documento
  const button = dom.window.document.querySelector('#my-button');

  // Adiciona um EventListener para o evento de clique do botão
  button.addEventListener('click', () => {
    console.log('O botão foi clicado!');
  });

  // Salva o arquivo HTML atualizado
  fs.writeFileSync(path.resolve(__dirname, 'print.html'), dom.serialize());

  response.sendFile(__dirname + '/print.html');
})

app.listen(3030)



//console.log(passengers)