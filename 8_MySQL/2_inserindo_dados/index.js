const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//midiware para pegar o body

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json());


app.get('/', (req, res) => {
    res.render('home'); 
})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pagesqty = req.body.pagesqty;

    const query = `INSERT INTO books (title, pagesqty) VALUES ('${title}', '${pagesqty}')`;

    conn.query(query, (err) => {

        if(err) {
            console.log(err)
        } else {
            console.log('Dados inseridos com sucesso!')
        }

        res.redirect('/');

    });
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teste1'
});

conn.connect((err) => {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao banco de dados!')

    app.listen(3000);
})