const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let comidas = [
    { id: 1, nome: 'Maça', codigo: 890, preco: 5.00},
    { id: 2, nome: 'Frango', codigo: 1523, preco: 45.00},
    { id: 3, nome: 'Feijão', codigo: 2110, preco: 7.00},
    { id: 4, nome: 'Biscoito', codigo: 1805, preco: 2.00}
];

// Mostrar as comidas

app.get('/comidas', (req, res) => {
    res.json(comidas);
});

//Mostrar comida pelo valor exato

app.get('/comidas/preco/:valor', (req, res) => {
    const valor = parseFloat(req.params.valor);
    const fiscal = comidas.filter(a => a.preco === valor);
    if (fiscal.length > 0) {
        res.json(fiscal);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

//Mostrar comidas que possuem um preço menor que o indicado

app.get('/comidas/preco/menor/:valor', (req, res) => {
    const valor = parseFloat(req.params.valor);
    const menor= comidas.filter(a => a.preco < valor);
    if (menor.length > 0) {
        res.json(menor);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

//Mostrar comidas que possuem um preço maior que o indicado

app.get('/comidas/preco/maior/:valor', (req, res) => {
    const valor = parseFloat(req.params.valor);
    const maior= comidas.filter(a => a.preco > valor);
    if (maior.length > 0) {
        res.json(maior);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

//Mostrar a primeira Comida da Lista

app.get('/comidas/primeira', (req, res) => {
    if (comidas.length > 0) {
        res.json(comidas[0]);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

//Mostrar ultima comida da lista

app.get('/comidas/ultima', (req, res) => {
    if (comidas.length > 0) {
        res.json(comidas[comidas.length -1]);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

//Mostrar comidas que possuem códigos pares 
app.get('/comidas/par', (req, res) => {
    const pares = comidas.filter(m => m.codigo%2 === 0)
    if (pares){
        res.json(pares);
    }else{
        res.status(404).json({ error: 'comida não encontrada'})
    }
    }
);

//Mostrar comidas que possuem códigos ímpares

app.get('/comidas/impar', (req, res) => {
    const impares = comidas.filter(m => m.codigo%2 !== 0)
    if (impares){
        res.json(impares);
    }else{
        res.status(404).json({ error: 'comida não encontrada'})
    }
    }
);

// Pesquisra comida pelo ID

app.get('/comidas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comida = comidas.find(i => i.id === id);
    if (comida) {
        res.json(comida);
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
});

// Adiciona comida pelo 
app.post('/comidas/', (req, res) => {
    const { nome, codigo, preco } = req.body;
    const novaComida = {
        id: comidas.length + 1,
        nome,
        codigo,
        preco
    };
    comidas.push(novaComida);
    res.status(201).json(novaComida);
});


app.put('/comidas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, codigo, preco } = req.body;
    const comida = comidas.find(i => i.id === id);
    if (comida){
        comida.nome = nome;
        comida.codigo = codigo;
        comida.preco = preco
        res.json(comida)
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
})


app.delete('/comidas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comidas.findIndex(i => i.id === id);
    if (index !== -1){
        const comidaDeletada = comidas.splice(index, 1)
        res.json(comidaDeletada[0])
    } else {
        res.status(404).json({ error: 'Comida não encontrada.'});
    }
})

//Adicionar várias comidas de uma vez

app.post('/comidas/adicionarcomidas', (req, res) => {
	let comidasrecebidas;
		if(Array.isArray(req.body)){
		comidasrecebidas = req.body;
	}else{
		comidasrecebidas = [req.body];

	}
	comidasrecebidas.forEach(item =>{

		comidas.push({
			id: comidas.length + 1,
			nome: item.nome,
			codigo: item.codigo,
			preco: item.preco
		});
	});
	 res.json(comidasrecebidas);
})

app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});


