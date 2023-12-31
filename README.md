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

## Introdução ao Vue.js

Vue.js é um framework progressivo focado na construção de interfaces de usuário interativas. Ele é amplamente utilizado para criar interfaces web dinâmicas e reativas. O Vue.js combina HTML5, CSS3 e JavaScript para manipular a interface do usuário de forma eficaz.

- O que é um Framework Progressivo?
Um framework progressivo, como o Vue.js, é uma ferramenta que pode ser usada de várias maneiras, seja como uma biblioteca ou como um framework completo.

a. Uso como utilitário ou biblioteca: Nesse cenário, você já tem um projeto em andamento e deseja adicionar recursos interativos ou pequenas partes de funcionalidade. O Vue.js é usado como uma biblioteca para essas adições específicas.

b. Uso como Framework: Quando você está começando um projeto do zero e deseja aproveitar todo o ecossistema do Vue.js para criar o aplicativo completo.

### Componentes Vue

Os componentes Vue são blocos de construção fundamentais para criar interfaces de usuário reutilizáveis e organizadas. Eles são compostos por três partes principais em um arquivo .vue:

`<template>`: Esta seção define a estrutura da interface usando HTML.

`<script>`: Aqui você define o comportamento do componente, incluindo lógica, manipulação de dados e qualquer código JavaScript necessário.

`<style>`: Define os estilos CSS específicos para o componente.

Usar componentes Vue oferece vantagens notáveis, como organização, legibilidade e facilidade de manutenção do código.

### Vantagens do Vue.js

Simplicidade: O Vue.js é conhecido por sua curva de aprendizado suave, o que o torna acessível para desenvolvedores iniciantes.

Documentação detalhada: A documentação oficial do Vue.js é abrangente e bem elaborada, facilitando a compreensão e o uso da estrutura.

Flexibilidade e adaptabilidade: Vue.js oferece opções de template (como Angular) e render functions (como React), permitindo que você escolha a abordagem que melhor se adapta ao seu projeto.

Multiplataforma: Além de desenvolvimento web, Vue.js é adequado para desenvolvimento móvel (com opções como Vue Native e Nuxt.js) e até mesmo para criação de aplicativos desktop (usando o Electron).

### Vue.js na Prática

```javascript
var app = Vue.createApp({
    data() {
        return {
            name: 'Edson'
        }
    }
});,

app.mount('#app');
```

`Vue.createApp()`: Este método é usado para criar uma instância da aplicação Vue, que encapsula os dados, a lógica e a interface do usuário.

`data()`: Nesta seção, você especifica o estado da aplicação, como os dados que deseja rastrear. No exemplo, temos um objeto com a propriedade name.

`app.mount('#app')`: Isso monta a instância Vue em um elemento HTML com o id #app, criando assim a associação entre os dados e a interface do usuário.

### Estado e Reatividade

No contexto do Vue.js, o estado refere-se aos dados que a aplicação Vue rastreia e manipula. O Vue.js é altamente reativo, o que significa que ele atualiza automaticamente a interface do usuário sempre que o estado muda. Isso é alcançado por meio do sistema de reatividade do Vue.

### Interporlação

Ela permite que você insira dinamicamente dados em elementos HTML, tornando a interface do usuário mais interativa e dinâmica. No contexto do Vue.js, a interpolação é realizada usando a sintaxe de chaves duplas `{{ }}`.

```html
<body>
    <div id="app">
         <!-- A interpolação {{ name }} será substituída pelo valor da variável 'name' -->
        <h1>Hello {{ name }}</h1>
    </div>
    <script>
        var app = Vue.createApp({
            data: function() {
                return {
                    name: "Edson",
                };
            },
        });

        app.mount('#app');
    </script>
</body>
```

## Métodos e Diretivas

### Métodos

Métodos no Vue.js são funções que podem ser chamadas dentro da aplicação Vue para realizar ações específicas. Eles são definidos dentro de um objeto methods ao criar uma instância Vue. Aqui está um exemplo:

```html
<body>
    <div id="app">
        <h1>Hello {{ name }}</h1>

        <button v-on:click="showName">Ação</button>
    </div>
    <script>
        var app = Vue.createApp({
            data: function() {
                return {
                    name: "Edson",
                };
            },

            methods: {
                showName() {
                    alert('Edson');
                },
            },
        });

        app.mount('#app');
    </script>
</body>
```

Neste exemplo, definimos um método chamado showName que é executado quando o botão é clicado. Ele exibe um alerta com o nome "Edson". Você também pode usar a sintaxe @click como um atalho para v-on:click.

### Diretivas

As diretivas no Vue.js são atributos especiais que podem ser adicionados a elementos HTML para aplicar comportamentos específicos ao elemento. As diretivas são prefixadas com o prefixo v-. Aqui estão alguns exemplos:

Diretiva v-for para Looping
A diretiva v-for é usada para percorrer listas, como arrays e objetos, e renderizar elementos repetidamente. Por exemplo:

```html
<body>
    <div id="app">
        <div v-for="user in users">{{ user }}</div>
    </div>
    <script>
        var app = Vue.createApp({
            data: function() {
                return {
                    users: ['Edson', 'Jennifer', 'Flávia'],
                };
            },
        });

        app.mount('#app');
    </script>
</body>
```

Neste exemplo, usamos v-for para percorrer o array users e exibir cada elemento em uma div.

Diretiva v-on para Eventos
A diretiva v-on é usada para ouvir eventos e chamar métodos ou executar código quando esses eventos ocorrem. Por exemplo:

```html
<body>
    <div id="app">
        <button @click="showName">Ação</button>
    </div>
    <script>
        var app = Vue.createApp({
            methods: {
                showName() {
                    alert('Edson');
                },
            },
        });

        app.mount('#app');
    </script>
</body>
```

Neste exemplo, usamos @click como um atalho para v-on:click para chamar o método showName quando o botão é clicado.

### Combinando Diretivas

Você pode combinar diretivas para criar comportamentos complexos. Por exemplo:

```html
<body>
    <div id="app">
        <div v-for="user in users" @click="showNameObject(user.name)">{{ user.name }}</div>
    </div>
    <script>
        var app = Vue.createApp({
            data: function() {
                return {
                    users: [ { name: 'Edson' }, { name: 'Jennifer' }, { name: 'Flávia' }],
                };
            },
            methods: {
                showNameObject(name) {
                    alert(name);
                },
            },
        });

        app.mount('#app');
    </script>
</body>
```

Neste exemplo, usamos v-for para percorrer um array de objetos e @click para chamar o método showNameObject passando o nome do usuário como argumento.

## Tipos de Instalação do Vue.js

Existem várias maneiras de instalar e configurar o Vue.js em seu projeto, dependendo das necessidades e complexidade do mesmo. Aqui estão três métodos comuns de instalação:

### CDN (Content Delivery Network)

O uso de CDN é recomendado quando você deseja adicionar uma parte específica de funcionalidade Vue.js a uma página existente. É a maneira mais simples de começar com o Vue.js.

Pontos Positivos:
Mais fácil e rápido, não requer configuração.
Pontos Negativos:
Limitado em funcionalidades se comparado com outras opções de instalação.

### NPM (Node Package Manager)

Usar o NPM junto com bundlers como o Webpack é uma ótima opção para projetos mais complexos e que exigem uma estrutura de componentização.

Pontos Positivos:
Ganha todos os recursos de componentização do Vue.js.
Pontos Negativos:
Requer configuração mais detalhada e pode ser mais complexo.
Vue CLI (Command Line Interface)
O Vue CLI é uma ferramenta de linha de comando que simplifica a criação, configuração e gerenciamento de projetos Vue.js. Você pode instalá-lo globalmente usando o seguinte comando:

```bash
npm install -g @vue/cli
```

Após a instalação, você pode criar um novo projeto Vue.js usando o comando vue create. Por exemplo:

```lua
vue create frontend
```

Isso cria um novo projeto chamado "frontend" e abre uma interface interativa para escolher as configurações desejadas para o projeto.

#### Configuração do Prettier

O Prettier é uma ferramenta de formatação de código que ajuda a manter um código consistente e legível. Você pode configurar o Prettier em seu projeto Vue.js definindo as opções desejadas em um arquivo de configuração, como .prettierrc. Por exemplo:

```json
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "always"
}
```

Isso define algumas configurações, como remover pontos e vírgulas no final das linhas, usar aspas simples e sempre colocar parênteses em funções de seta.

### Componentização

A componentização é uma abordagem fundamental no Vue.js, permitindo que você divida as responsabilidades em componentes reutilizáveis. Aqui está um exemplo prático:

Crie um componente na pasta components, por exemplo, Header.vue.
Defina a estrutura do componente em Header.vue, incluindo o template, script e estilos.
Em seguida, importe o componente em seu arquivo principal, como App.vue.
Exemplo de importação:

```javascript
import Header from "@/components/Header.vue";
```

Declare o componente na seção components do objeto Vue, associando um nome de tag ao componente.
Exemplo:

```javascript
components: {
  Cabecalho: Header,
}
```

Agora você pode usar a tag `<Cabecalho />` em seu HTML para renderizar o componente Header.vue em seu aplicativo Vue.js.

## Requisições para uma API com Axios

O Axios é uma biblioteca muito popular para fazer requisições HTTP em aplicativos Vue.js. Aqui está um guia passo a passo sobre como usá-lo:

1. Instalar o Pacote Axios:

    Certifique-se de que o pacote Axios está instalado em seu projeto Vue.js. Você pode instalá-lo usando o npm ou o yarn:

    ```bash
    npm install axios
    ```

2. Criar um arquivo para a Configuração do Axios:

3. Crie um arquivo axios.ts (ou outro nome de sua escolha) na pasta utils para configurar uma instância do Axios com a URL base da API:

typescript
import axios from 'utils/axios.ts';

```typescript
const instance = axios.create({
    baseURL: 'https://sua-api.com', // Substitua pela URL base da sua API
});
```

Importar o Axios no Componente:

Em seu componente Vue onde você deseja fazer as requisições à API, importe a instância Axios que você configurou:

```javascript
import axios from '@/utils/axios.ts';
```

### Criar Métodos para Requisições

No objeto methods de seu componente, crie métodos para fazer as requisições. Por exemplo, para listar usuários:

```javascript
methods: {
    async listarUsuarios() {
        try {
            const response = await axios.get('/usuarios');
            // Manipule a resposta aqui, como armazenar os dados em data()
            this.usuarios = response.data;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
        }
    },
},
```

### Chamar o Método no Hook created

No ciclo de vida do componente, como o created, chame o método para iniciar a requisição quando o componente for montado:

```javascript
created() {
    this.listarUsuarios();
},
```

### Lidar com o CORS

Se você está enfrentando problemas de segurança relacionados ao CORS ao acessar uma API de outro domínio, você precisa configurar o servidor da API para permitir solicitações da origem do seu aplicativo Vue.js. Isso envolve configurar o cabeçalho Access-Control-Allow-Origin na API.

### Exibir os Dados da API

Use uma diretiva Vue, como v-for, para percorrer os dados obtidos da API e exibi-los no seu template. Por exemplo:

```html
<ul>
    <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nome }}</li>
</ul>
```

## Requisição para Criar um Usuário

Para criar um formulário e fazer uma requisição para criar um novo usuário em seu aplicativo Vue.js, siga estas etapas:

### Criar o Formulário no Template

No template do seu componente Vue, crie um formulário com campos para inserir os dados do novo usuário. Use a diretiva v-model para vincular os campos do formulário a propriedades no objeto data() do componente. Isso permite a associação bidirecional dos dados entre o formulário e o componente.

```html
<form @submit.prevent="criarUsuario">
    <label for="nome">Nome:</label>
    <input type="text" id="nome" v-model="novoUsuario.nome">
    
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="novoUsuario.email">
    
    <button type="submit">Criar Usuário</button>
</form>
```

### Definir Dados para o Novo Usuário em data()

Em data(), crie uma propriedade chamada novoUsuario para rastrear os dados do novo usuário que serão inseridos no formulário.

```javascript
data() {
    return {
        novoUsuario: {
            nome: '',
            email: '',
        },
    };
},
```

### Criar um Método para Enviar a Requisição

No objeto methods, crie um método chamado criarUsuario que será chamado quando o formulário for submetido. Dentro deste método, faça uma requisição HTTP do tipo POST para criar o novo usuário:

```javascript
methods: {
    async criarUsuario() {
        try {
            const response = await axios.post('/usuarios', this.novoUsuario);
            // Manipule a resposta conforme necessário
            this.usuarios.push(response.data); // Adicionar o novo usuário ao array
            this.novoUsuario = { nome: '', email: '' }; // Limpar os campos do formulário
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    },
},
```

### Associar a Submissão do Formulário

Para acionar o método criarUsuario quando o formulário for enviado, use a diretiva v-on:submit.prevent (ou o atalho @submit.prevent) no formulário. Isso evitará que a página seja recarregada durante a submissão.

```html
<form @submit.prevent="criarUsuario">
```

Agora, quando você preencher o formulário e clicar no botão "Criar Usuário", o método criarUsuario será chamado, enviando uma requisição POST para a API com os dados do novo usuário. A resposta da API pode ser manipulada de acordo com as necessidades do seu aplicativo, como adicionar o novo usuário à lista de usuários e limpar os campos do formulário para futuras entradas.

## Excluindo um Usuário

Para excluir um usuário em seu aplicativo Vue.js, siga estas etapas:

### Criar um Método para Excluir Usuário

No objeto methods de seu componente Vue, crie um método chamado excluirUsuario para excluir um usuário específico. Este método deve fazer uma requisição HTTP do tipo DELETE para a API, usando o ID do usuário como parâmetro na URL.

```javascript
methods: {
    async excluirUsuario(id) {
        try {
            await axios.delete(`/usuarios/${id}`);
            // Exclua o usuário também do frontend
            const index = this.usuarios.findIndex(usuario => usuario.id === id);
            if (index !== -1) {
                this.usuarios.splice(index, 1);
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    },
},
```

Chamar o Método ao Clicar no Botão de Exclusão:

No seu template, adicione um botão ou ícone para cada usuário que permita excluí-lo. Use a diretiva @click (ou v-on:click) para chamar o método excluirUsuario ao clicar no botão e passe o ID do usuário como argumento.

```html
<ul>
    <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nome }}
        <button @click="excluirUsuario(usuario.id)">Excluir</button>
    </li>
</ul>
```

Agora, quando você clicar no botão "Excluir" ao lado de um usuário, o método excluirUsuario será chamado, fazendo uma requisição DELETE para a API para excluir o usuário no backend e também o removerá da lista de usuários no frontend. Certifique-se de lidar com erros e tratamentos de erro apropriados para situações de falha na exclusão.
