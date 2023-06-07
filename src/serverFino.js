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
    response.sendFile(__dirname + '/index.html');
})

app.post('/teste', (req, response) => {
    const dadosGETPlanos = req.body.json;
    console.log('JSON RECEBIDO:', json)
    dadosPlanos = dadosGETPlanos;
    return response.redirect('/add-registro')
});

app.get('/verificacao', (request, response) => {
    response.sendFile(__dirname + '/verificacao.ejs');
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
    const filePath = path.join(__dirname, 'verificacao.ejs')
    ejs.renderFile(filePath, { dadosOperadora, dadosPlanos, dadosEntidades, dadosContatos, dadosVigencias, dadosGerais, dadosComerciais, dadosProcedimentos }, (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }
        return response.send(data)
    })
})

app.get('/criarpdf', async (request, response) => {
    console.log("entrou no criar")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3050/renderizar', {
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

app.get('/printejs', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs')
    ejs.renderFile(filePath, { passengers }, (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }

        const options = {
            height: "11.25in",
            widht: "8.5in",
            margin: "12px",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        }
        pdfGerador.create(data, options).toFile("report.pdf", (err, data) => {
            if (err) {
                return response.send('Erro na criação do arquivo')
            }
            return response.send(data)

        })
    })
})

/* Testes de nova forma de requisição */

var dadosPlanosTeste = []

app.post('/teste-add-registro', (request, response) => {
    const dadosGETPlanosJsonString = request.body.planos;
    const dadosGETPlanos = JSON.parse(dadosGETPlanosJsonString);
    dadosPlanosTeste = dadosGETPlanos;
    return response.redirect('/teste-renderizar')
})

app.get('/teste-renderizar', (request, response) => {
    console.log(dadosProcedimentos)
    const filePath = path.join(__dirname, 'verificacao2.ejs')
    ejs.renderFile(filePath, { dadosPlanos: dadosPlanos, dadosProcedimentos: dadosProcedimentos }, (err, data) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }
        console.log(dadosPlanosTeste)
        return response.send(data)
    })
})

app.get('/teste-criarpdf', async (request, response) => {
    console.log("entrou no criar")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3050/teste-renderizar', {
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
