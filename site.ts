import express from 'express';
import * as fs from 'node:fs';
import * as config from './config.json'

const app: express.Application = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('graph', {
        csv_raw: fs.readFileSync('data.csv').toString()
    })
})

app.listen(config['server-port'], config['server-host'], () => {
    console.log(`Server listening on ${config['server-host']}:${config['server-port']}`);
});