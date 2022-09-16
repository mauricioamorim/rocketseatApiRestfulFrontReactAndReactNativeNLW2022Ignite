"use strict";
/*
    A extensao desse arquivo está como ".ts" por causa do Typescrip,
    mas os comentarios abaixo sao validos caso o app nao seja desenvolvido com typescript
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Maneira antiga de chamar o express:
    const express = require('express')

    Maneira atual
    e mudar a extensao desse arquivo de ".js" para ".mjs"
*/
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const convert_hour_string_to_minutes_1 = require("./utils/convert-hour-string-to-minutes");
const app = (0, express_1.default)();
app.use(express_1.default.json);
const prisma = new client_1.PrismaClient();
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
app.get('/games', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    adsenses: true,
                }
            }
        }
    });
    return response.json(games);
}));
// Casos de uso: Criação de novo anúncio
app.post('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const body = request.body;
    const adsense = yield prisma.adsense.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discordId: body.discordId,
            weekDays: body.weekDays.join(','),
            hourStart: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourStart),
            hourEnd: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    });
    return response.status(201).json(gameId);
}));
//  Casos de uso: Listagem de anúncios por game
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const adsenses = yield prisma.adsense.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            id: gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response.json(adsenses.map(adsenses => {
        return Object.assign(Object.assign({}, adsenses), { weekDays: adsenses.weekDays.split(',') });
    }));
}));
//  Casos de uso: Buscar discord pelo ID do anúncio
app.get('/ads/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adsenseId = request.params.id;
    const adsense = yield prisma.adsense.findUniqueOrThrow({
        select: {
            discordId: true,
        },
        where: {
            id: adsenseId
        }
    });
    return response.status(200).json(adsense);
}));
// Home
app.get('', (request, response) => {
    return response.status(200).json([
        { mensagem: 'Bem vindo ao app!' },
    ]);
});
app.listen(3333);
