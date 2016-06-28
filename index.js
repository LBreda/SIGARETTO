#!/usr/bin/env node
var wrap = require('word-wrap');
var request = require("then-request");
var Entities = require('html-entities').XmlEntities;
var uniqueRandomArray = require('unique-random-array');
var url = 'https://spreadsheets.google.com/feeds/list/18AvCFeugCVyMr6ZovIOn9McFEmbVBapB1jBuUYwDbcM/1/public/basic?alt=json';

entities = new Entities();

request('GET',
    url,
    {
        maxRetries: 1,
        timeout: 1500
    }
).done(
    function (res) {
        if (res.statusCode === 200) {
            var rand_pick = uniqueRandomArray(JSON.parse(res.getBody('utf8')).feed.entry);
            var siga = rand_pick();
            console.log(wrap(entities.decode(siga.content.$t.substring(siga.content.$t.indexOf('name: ') + 6)), {
                width: 80,
                indent: ''
            }));
        } else {
            console.log('Errore di connessione')
        }
    }
);

process.on('uncaughtException', function () {
    process.exit(1)
});