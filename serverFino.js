const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const winston = require('winston')
const pdfGerador = require('html-pdf')
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')
const { url } = require('inspector')

/* CONFIGURAÇÕES DOS PACOTES */

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.json())
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/logo-adm', express.static('logo-adm'))

/* REGISTRO de erros da aplicação */
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(), // Adiciona um timestamp com a hora atual
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log.json' })
    ]
});

var dadosOperadora = []
var dadosVigencias = [];
var dadosPlanos = [];
var dadosContatos = [];
var dadosEntidades = [];
var dadosGerais = [];
var dadosComerciais = [];
var dadosProcedimentos = [];


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/src/index.html');
})

app.post('/add-registro', (request, response) => {

    const dadosGETComerciaisJsonString = request.body.comerciais;
    const dadosGETOperadoraJsonString = request.body.operadora;
    const dadosGETPlanosJsonString = request.body.planos;
    const dadosGETEntidadesJsonString = request.body.entidades;
    const dadosGETVigenciasJsonString = request.body.vigencias;
    const dadosGETContatosJsonString = request.body.contatos;
    const dadosGETGeraisJsonString = request.body.gerais;
    const dadosGETProcedimentosJsonString = request.body.procedimentos
    try {
        const dadosGETPlanos = JSON.parse(dadosGETPlanosJsonString);
        dadosPlanos = dadosGETPlanos
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Planos', error);
    }
    try {
        const dadosGETEntidades = JSON.parse(dadosGETEntidadesJsonString);
        dadosEntidades = dadosGETEntidades
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Entidades', error);
    }
    try {
        const dadosGETVigencias = JSON.parse(dadosGETVigenciasJsonString)
        dadosVigencias = dadosGETVigencias
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Vigências', error);
    }
    try {
        const dadosGETContato = JSON.parse(dadosGETContatosJsonString)
        dadosContatos = dadosGETContato
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Contato', error);
    }
    try {
        const dadosGETOperadora = JSON.parse(dadosGETOperadoraJsonString)
        dadosOperadora = dadosGETOperadora
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Operadora', error)
    }
    try {
        const dadosGETGerais = JSON.parse(dadosGETGeraisJsonString)
        dadosGerais = dadosGETGerais
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Gerais', error)
    }
    try {
        const dadosGETComerciais = JSON.parse(dadosGETComerciaisJsonString)
        dadosComerciais = dadosGETComerciais
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Comerciais', error)
    }
    try {
        const dadosGETProcedimentos = JSON.parse(dadosGETProcedimentosJsonString)
        dadosProcedimentos = dadosGETProcedimentos
    } catch (error) {
        logger.error('Foi mas deu Erro ao fazer o parsing do JSON: Procedimentos', error)
    }
    return response.redirect('/renderizar')
})

app.get('/renderizar', (request, response) => {
    const filePath = path.join(__dirname, '/src/verificacao.ejs')
    ejs.renderFile(filePath, { dadosOperadora, dadosPlanos, dadosEntidades, dadosContatos, dadosVigencias, dadosGerais, dadosComerciais, dadosProcedimentos }, (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }
        return response.send(data)
    })
})

app.get('/criarpdf', async (request, response) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    /* var dominio = window.location.host;
    var protocolo = window.location.protocol; */
    var link = 'http://localhost:3050/renderizar';

    await page.goto(link, {
        waitUntil: "networkidle0"
    })

    // Extrair o conteúdo da tag <main>
    const mainContent = await page.evaluate(() => {
        const mainElement = document.querySelector('main');
        return mainElement.innerHTML;
    });

    // Extrair o link CSS
    const cssLink = await page.evaluate(() => {
        const cssElement = document.querySelector('link[rel="stylesheet"]');
        return cssElement.href;
    });

    // Carregar o arquivo CSS na página do Puppeteer
    await page.goto(cssLink, {
        waitUntil: "networkidle0"
    });

    // Inserir o conteúdo da tag <main> na página
    await page.setContent(`<html><head><link rel="stylesheet" href="${cssLink}"></head><body>${mainContent}</body></html>`);

    const pdf = await page.pdf({
        printBackground: true,
        format: "A4",
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

app.listen(3050)
