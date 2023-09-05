// console.log('Hello');

/**
 *  Preparação de ambiente
 * 
 *  init projeto
 *      npm init -y
 * 
 *  install package
 *      - typescript e ts-node-dev -D
 *      - express
 *          --@types/express
 *  script execute 
 *      -- "dev": "ts-node-dev --quiet --clear ./src/server.ts"
 *  
 *  typescript config
 *      npx tsc --init
 *          -- rootDir = ./src e outDir = ./dist
 * 
 *  
**/


/* Criando Server

    -- import biblioteca express
    -- Create variavel para receber o a biblioteca como método.
    -- variavel.listen('porta do servidor', função de callback())
    
*/
import express  from 'express';

const app = express();

/**
 * 
 * // URL -> http://localhost:3333/users
 * 
 *  Metodos HTTP
 * 
 * GET, POST, PUT, DELETE -> Esses métodos ele espera o nome da rota, e uma função de callback e essa função ela irá conter dois parametros a requisição e a resposta;
 * 
 * Tipos de parâmentros
 * 
 * Query params -> utilizado para fazer filtros de informção durante a requisição.
 *      Exemplo para não trazer todos os dados de uma requisição pode ser usado  conceito de pagição que seria criado paramentros na rota.
 * 
            app.get('/users', (request, response) => {
                // exemplo Query params
                const {perPage, page} = request.query;
                console.log(perPage, page);

                return response.json({ 
                    message: "Listando usuários",
                });
            });

 * 
 *  
 * Route params -> Utilizado para indetificar um recurso de uma rota.
 *  Exemplo.:
 * 
        app.put('/users/:id', (request, response) => {
            
            //exemplo Route Params
            const params = request.params;
            console.log(params);

            return response.json({ 
                message: "Atualizando usuários",
            });

        });
 * 
 * Request Body -> Utilizado para enviar dados dentro do corpo da requisição
 * 
        app.use(express.json())


        app.post('/users', (request, response) => {

            const body = request.body;
            console.log(body);
            return response.json(body);

        });
 * 
 */



app.listen('3333', () => {
    console.log('Backend Started');
});