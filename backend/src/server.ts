import express, { response } from "express";
import { request } from "http";
import { v4 as uuid } from "uuid";

const app = express();

/* CRUD */
app.use(express.json());

// Exemplo acadêmico: como não tem banco de dados, os dados não terá persistência só ficará disponivel em momento de execução.

interface User {
    id: string;
    name: string;
    email: string;
};

const users: User [] = [];

app.get('/users', (request, response) => {
    // Buscar no banco de dados os registro
            // SEM BANCO

    // Retornar os registro
    return response.json(users);
});

app.post('/users', (request, response) => {
    // Receber os dados para fazer inserção
    const { name, email } = request.body;

    // Criar um novo registro
    const user = { id: uuid(), name, email };
    // Registrar esse usuário na base de dados
        // SEM BANCO
        users.push(user);

    // Retornar os dados do usuário criado
    return response.json(user);


});

app.put('/users/:id', (request, response) => {
    //Receber os dados
    const { id } = request.params;
    const { name, email } = request.body;

    // Localizar o registro na base de dados
    const userIndex = users.findIndex( (user) => user.id === id );

    // tratamento se não houver registro
    if(userIndex < 0) {
        return response.status(404).json({ error: "User not found."});
    }

    // atualizar o registro na base de dados
    const user = { id, name, email };
    users[userIndex] = user;

    // retornar os dados do registro atualizado
    return response.json(user);
});

app.delete('/users/:id', (request, response) => {
    //Receber o id do registro
    const { id } = request.params;
    // Localizar o registro na base de dados 
    const userIndex = users.findIndex( user => user.id === id );

    // tratamento se não houver registro
    if(userIndex < 0) {
        return response.status(404).json({ error: "User not found."});
    };

    // Excluir o registro na base de dados
    users.splice(userIndex, 1);

    // retornar o status da requisição
    return response.status(204).send();

});

app.listen('3333', () => {
    console.log('Backend Started');
});