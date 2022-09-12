/*
    A extensao desse arquivo está como ".ts" por causa do Typescrip,
    mas os comentarios abaixo sao validos caso o app nao seja desenvolvido com typescript
*/

/*
    Maneira antiga de chamar o express:
    const express = require('express')

    Maneira atual
    e mudar a extensao desse arquivo de ".js" para ".mjs" 
*/
import express from 'express';

const app = express();

app.get('/ads', (request, response)=>{
    return response.json([
        {id:1, name:'Anúncio 1'},
        {id:2, name:'Anúncio 2'},
        {id:3, name:'Anúncio 3'},
        {id:4, name:'Anúncio 4'},
        {id:5, name:'Anúncio 5'},
    ])
})

app.get('', (request, response)=>{
    return response.json([
        {mensagem:'Bem vindo ao app!'},
    ])
})

app.listen(3333)

