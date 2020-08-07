import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaLogger from 'koa-logger';
import * as KoaBody from 'koa-body';

import * as mongoose from 'mongoose';

const app = new Koa();
const router = new KoaRouter();

const HTTP_PORT = 8080;

router.get('/', async (ctx, next) => {
    ctx.body = { msg: 'It\'s alive!!' };

    next();
});

app.use(KoaBody());
app.use(KoaLogger());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (error) => {
    console.error(error);
});

console.log('Starting Koa server...');
app.listen(HTTP_PORT, async () => {
    const db = await mongoose.connect('mongodb://db:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'root',
        pass: 'example',
    });

    console.log('Koa started.');
    if (db) {
        console.log('Got DB connection');
        console.log(db.connection);
    }
    else {
        console.log('Hmm, no DB connection');
    }
});