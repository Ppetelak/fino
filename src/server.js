
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const pdfGerador = require('html-pdf')
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')

/* CONFIGURAÇÕES DOS PACOTES */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var dadosRecebidos = [
    {
        nome: "",
        email: ""
    }
]

//console.log(path.join(__dirname, "print.ejs"))

/* const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    }
] */


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.post('/teste-post', (request, response) =>{
    const dados = [
        {
            nome: request.body.nome,
            email: request.body.email
        }
    ]
    console.log("Dados recebidos do form: " +dados)
    dadosRecebidos = dados
    return response.redirect('/renderizar')
})

app.get('/renderizar', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, {dados: dadosRecebidos} , (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }
        console.log(dadosRecebidos)
        return response.send(data)
        })
})


app.get('/pdf', async(request, response) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("http://localhost:3030", {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: "20px",
            bottom: "20px",
            left: "20px",
            right: "20px"
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})

/* app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, {passengers} , (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }
        return response.send(data)

        })
}) */
app.listen(3030)