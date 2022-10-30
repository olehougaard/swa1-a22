const express = require('express')
const model = require('./model.js')

const games = []
const ongoing_games = {}

const create_game = (gameNumber, gameName) => {
    games.push(model(gameNumber, gameName))
    return games[games.length - 1]
}

const send_data = (res, data) => {
    if (data) {
        res.send(data)
    } else {
        res.status(404).send()
    }
}

const send_game_data = (res, gameNumber, extractor) => {
    const game = games[gameNumber]
    send_data(res, game && extractor(game))
}

const gameserver = express()

gameserver.use (function(req, _, next) {
    req.setEncoding('utf8')
    req.body = new Promise(resolve => {
        let data=''
        req.on('data', function(chunk) { 
            data += chunk
         })
     
         req.on('end', function() {
             resolve(data)
             next();
         })
    })
})
gameserver.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});

gameserver.post('/games', async (req, res) => {
    const body = await req.body
    const params = JSON.parse(body)
    const gameNumber = games.length
    const gameName = params.gameName ?? 'Game number ' + gameNumber
    res.send(create_game(gameNumber, gameName).json({ongoing: false}))
})

gameserver.get('/games', (_, res) => {
    res.send(games
        .filter(g => !ongoing_games[g.gameNumber])
        .map(g => g.json({ongoing: false})))
})

gameserver.get('/games/:gameNumber', (req, res) => {
    const ongoing = !!ongoing_games[req.params.gameNumber]
    send_game_data(res, req.params.gameNumber, g => g.json({ongoing}))
})

gameserver.patch('/games/:gameNumber', (req, res) => {
    const gameNumber = req.params.gameNumber
    req.body
    .then(JSON.parse)
    .then( game => {
        if (!games[gameNumber])
            res.status(404).send()
        else if (game.hasOwnProperty('ongoing')) {
            const ongoing = game.ongoing
            if (!ongoing || ongoing_games[gameNumber])
                res.status(403).send()
            else {
                ongoing_games[gameNumber] = true
                res.send(games[gameNumber].json({ongoing: true}))
            }
        } else if (game.hasOwnProperty('winState')) {
            if (!ongoing_games[gameNumber])
                res.status(403).send()
            else {
                const {winState: {winner}} = game
                games[gameNumber] = games[gameNumber].conceded(winner)
                res.send(games[gameNumber].json({ongoing: true}))
            }
        }
    })
})

gameserver.post('/games/:gameNumber/moves', (req, res) => {
    const gameNumber = req.params.gameNumber
    req.body
    .then(JSON.parse)
    .then( ({ x, y, player }) => {
        const game = games[gameNumber]
        if (!ongoing_games[gameNumber])
            res.sendStatus(404)
        else if (player === game.inTurn && game.legalMove(x,y)) {
            const afterMove = game.makeMove(x, y)
            games[gameNumber] = afterMove
            res.send(JSON.stringify({ 
                move: {x, y, player: game.inTurn}, 
                inTurn: afterMove.inTurn, 
                winState: afterMove.winState, 
                stalemate: afterMove.stalemate  }))
        } else {
            res.sendStatus(403)
        }
    })
})

gameserver.get('/games/:gameNumber/moves', (req, res) => {
    send_game_data(res, req.params.gameNumber, g => ({ 
        moves: g.moves, 
        inTurn: g.inTurn,
        winState: g.winState,
        stalemate: g.stalemate
    }))
})

gameserver.listen(8080, () => console.log('Gameserver listening on 8080'))
