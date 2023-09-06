# Introdução ao Full stack - prática

## Preparação de Ambiente

1. Inicializaçao do projeto

    ```csharp
        npm init -y
    ```

2. Instalação de Pacotes

    Dependencias de Desenvolvimento
        - typescript ts-node-dev
        - @types/express
        - @types/uuid

    Dependência de Produção
        - express
        - uuid

3. Script de Execução

    ```json
    "script": {
        "dev": "ts-node-dev --quiet --clear ./src/server.ts"
    }
    ```

4. Configuração do TypeScript

    ```csharp
        npx tsc --init
    ```

    ```json
    {
        "compilerOptions": {
            "rootDir": "./src",
            "outDir": "./dist"
        },
    }
    ```

## Criando um Servidor

1. Importe biblioteca Express

    ```typescript
        import express from "express";
    ```

2. Iniciando a instancia

    ```typescript
        const app = express();
    ```

3. Executando o servidor para escutar uma porta especifica

    ```typescript
        app.listen('3333', () => {
            console.log("Backend started");
        });
    ```

## Métodos HTTP e Manipuladores de Rota

### GET

O método GET é usado para recuperar informações de um servidor. Você pode usar o método app.get para definir uma rota GET e um manipulador de rota. Exemplo:

```typescript
app.get('/users', (request, response) => {

    // Exemplo de uso de Query Params
    const { perPage, page } = request.query;
    console.log(`Query Params: perPage=${perPage}, page=${page}`);

    return response.json({ 
        message: "Listando usuários",
    });

});
```

`Query Params`: Os Query Params são parâmetros adicionados à URL para filtrar as informações durante a requisição. Eles são acessados usando request.query.

### PUT

O método `PUT` é usado para atualizar informações no servidor. Você pode usar o método `app.put` para definir uma rota `PUT` e um manipulador de rota. Exemplo:

```typescript
app.put('/users/:id', (request, response) => {
    
    // Exemplo de uso de Route Params
    const { id } = request.params;
    console.log(`Route Params: id=${id}`);

    return response.json({ 
        message: "Atualizando usuário",
    });

});
```

`Route Params`: Os Route Params são usados para identificar um recurso específico em uma rota. Eles são acessados usando request.params.

### POST

O método `POST` é usado para criar novos recursos no servidor. Certifique-se de habilitar o uso de `JSON` no corpo da solicitação usando `app.use(express.json())`. Exemplo:

```typescript
app.use(express.json());
app.post('/users', (request, response) => {
    // Exemplo de uso de Request Body
    const user = request.body;
    console.log(`Request Body: ${JSON.stringify(user)}`);
    return response.json(user);
});

```

`Request Body`: O Request Body é usado para enviar dados dentro do corpo da requisição. Certifique-se de habilitar o uso de JSON no corpo da solicitação usando app.use(express.json()).

## Pratica CRUD

### Preparação da prática

Antes de começarmos a criar as rotas CRUD, precisamos configurar nossa estrutura de dados e preparar o ambiente.

1. Definição da Interface de Usuário

    ```typescript
    interface User {
        id: string;
        name: string;
        email: string;
    };
    ```

    Aqui, definimos uma interface User que representa a estrutura dos dados de um usuário. Ela inclui três campos: id, name e email.

2. Criação do Array de Usuários

    ```typescript
    const users: User[] = [];
    ```

    Criamos um array users para simular nossa base de dados temporária. Ele armazenará os objetos de usuário.

3. Manipulação de Rotas para o CRUD

    Agora, vamos criar rotas HTTP para realizar operações CRUD em nossa base de dados simulada.

    1. Rota de Criação (CREATE)

        ```typescript
        app.post('/users', (request, response) => {
            // Receber os dados para fazer a inserção
            const { name, email } = request.body;

            // Criar um novo registro de usuário com um ID único
            const user = { id: uuid(), name, email };

            // Registrar esse usuário na base de dados
            users.push(user);

            // Retornar os dados do usuário criado como resposta
            return response.json(user);
        });
        ```

        Nesta rota, criamos um novo usuário com dados recebidos no corpo da requisição e um ID único. Em seguida, registramos esse usuário na base de dados simulada e retornamos os dados do usuário criado como resposta.

    2. Rota de Leitura (READ)

        ```typescript
        app.get('/users', (request, response) => {
            // Retorna todos os registros na base de dados simulada
            return response.json(users);
        });
        ```

        Nesta rota, simplesmente retornamos todos os registros da base de dados simulada como uma resposta JSON.

    3. Rota de Atualização (UPDATE)

        ```typescript
        app.put('/users/:id', (request, response) => {
            // Receber os dados a serem atualizados
            const { id } = request.params;
            const { name, email } = request.body;

            // Localizar o registro na base de dados pelo ID
            const userIndex = users.findIndex((user) => user.id === id);

            // Tratamento se o registro não for encontrado
            if (userIndex < 0) {
                return response.status(404).json({ error: "User not found." });
            }

            // Atualizar o registro na base de dados
            const user = { id, name, email };
            users[userIndex] = user;

            // Retornar os dados do registro atualizado como resposta
            return response.json(user);
        });
        ```

        Nesta rota, recebemos um ID de usuário e os novos dados a serem atualizados no corpo da requisição. Localizamos o registro na base de dados simulada pelo ID, atualizamos os dados e retornamos os dados atualizados como resposta.

    4. Rota de Exclusão (DELETE)

        ```typescript
        app.delete('/users/:id', (request, response) => {
            // Receber o ID do registro a ser excluído
            const { id } = request.params;

            // Localizar o registro na base de dados simulada
            const userIndex = users.findIndex((user) => user.id === id);

            // Tratamento se o registro não for encontrado
            if (userIndex < 0) {
                return response.status(404).json({ error: "User not found." });
            }

            // Excluir o registro da base de dados simulada
            users.splice(userIndex, 1);

            // Retornar um status 204 (No Content) para indicar que a exclusão foi bem-sucedida
            return response.status(204).send();
        });
        ```

        Nesta rota, recebemos o ID do usuário a ser excluído. Localizamos o registro na base de dados simulada, excluímos o registro e retornamos um status HTTP 204 para indicar que a exclusão foi bem-sucedida.
