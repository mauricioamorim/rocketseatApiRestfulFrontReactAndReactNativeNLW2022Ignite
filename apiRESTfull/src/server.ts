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
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());// serve para configurar quais dominios podem acessar seu backend

const prisma = new PrismaClient({
    log: ['query']
});


// HTTP methods / API RESTful
// GET, POST, PUT(edição de varios campos ao mesmo tempo), PATCH(opção especifica), DELETE

/**
 * HTTP Codes 
 * 
 * 2** = sucesso
 * 3** = redirecionamento
 * 4** = erros de código bugado
 * 5** = erros inesperados
 */

/**
 * 
 * localhost:3333/ads?page=2
 * 
 * Query Params: page=2
 * Route Params: /ads
 * Body Params: conteúdo enviado no corpo da requisição
 */

// Casos de uso: Listagem de games com contagem de anúncios
app.get('/games', async (request, response)=>{
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    adsenses: true,
                }
            }
        }
    });

    return response.json(games);
})

// Casos de uso: Criação de novo anúncio
app.post('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;
    const body = request.body;

    const adsense = await prisma.adsense.create({
        data: {
            gameId, 
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discordId: body.discordId,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart), 
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(adsense);
});

//  Casos de uso: Listagem de anúncios por game
app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;
    console.log(gameId);

    const adsenses = await prisma.adsense.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    console.log(adsenses);

    return response.status(200).json(adsenses.map(adsense => {
        console.log(adsense.hourStart);
        console.log(convertMinutesToHourString(adsense.hourStart));

        return {
            ...adsense,
            weekDays: adsense.weekDays.split(','),
            hourStart: convertMinutesToHourString(adsense.hourStart),
            hourEnd: convertMinutesToHourString(adsense.hourEnd)
        }
    }));
})

//  Casos de uso: Buscar discord pelo ID do anúncio
app.get('/ads/:id/discord', async (request, response)=>{
    const adsenseId = request.params.id;

    const adsense = await prisma.adsense.findUniqueOrThrow({
        select: {
            discordId: true,
        },
        where: {
            id: adsenseId
        }
    })
    return response.status(200).json(adsense);
})

// Home
app.get('', (request, response)=>{
    return response.status(200).json([
        {mensagem:'Bem vindo ao app!'},
    ])
})

app.listen(3333)



