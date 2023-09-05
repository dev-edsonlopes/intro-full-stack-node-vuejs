# Introdução ao Full stack - prática

## Preparação de Ambiente

1. Inicializaçao do projeto

    ```csharp
        npm init -y
    ```

2. Instalação de Pacotes

    Dependencias de Desenvolvimento
        - typescript ts-node-dev

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

##  Criando um Servidor

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
