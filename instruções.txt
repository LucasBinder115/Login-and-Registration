Galera, aqui está um resumo organizado e direto para todo mundo entender o que precisa fazer e como instalar tudo direitinho.

📌 Estrutura do Projeto
O projeto tem três partes principais:

Frontend (cd frontend) para entrar na pasta do frontend

Foco: Só na autenticação do usuário por agoracd.
Tarefas:
✅ Criar tela de login e registro.
✅ Validar dados do usuário.
✅ Conectar com o backend para autenticação.
Ferramentas usadas: React, Axios, React Router DOM, Bootstrap.
Instalação:

cd frontend
npm install axios react-router-dom bootstrap
Music Player (cd music-player)

Foco: Melhorar o reprodutor de música.
Tarefas:
✅ Fazer o player rodar música direito.
✅ Implementar controles (play, pause, próxima, anterior).
✅ Arrumar a bagunça do código.
Ferramentas usadas: A definir.
Backend (cd backend)

Foco: Criar e conectar autenticação do usuário.
Tarefas:
✅ Criar rotas para login e registro.
✅ Salvar usuários no banco de dados.
✅ Gerar tokens JWT para autenticação.
✅ Garantir que só usuários autenticados usem o Music Player.
Ferramentas usadas: Express, MongoDB (Mongoose), Dotenv, Cors, Bcryptjs, JSON Web Token.
Instalação:

cd backend
npm install express mongoose dotenv cors http-errors bcryptjs jsonwebtoken
npm install nodemon --save-dev
📌 Como Instalar Tudo
Clone o repositório e vá para a pasta correta.

No Backend (cd backend)

Instale as dependências:

npm install
Crie o arquivo .env e configure as variáveis.
Inicie o servidor:

npm start
No Frontend (cd frontend)

Instale as dependências:

npm install
Crie o arquivo .env e configure a URL do backend.
Inicie o frontend:

npm start
📌 Testando o Projeto
Frontend: Acesse http://localhost:3001 no navegador.
Backend: Acesse http://localhost:3000 no navegador.
Se der erro, tentem corrigir com ChatGPT, DeepSeek, ou qualquer IA que resolva problema de código.
📌 Outras Instalações Importantes
✅ Ferramentas para Testar API

Postman ou Insomnia
✅ MongoDB (Banco de Dados)

Baixem MongoDB versão 7.0.17: Download
✅ Extensões do VSCode (Recomendadas)

ES7 React Redux
ESLint
Dotenv
GitHub Pull Requests
GitLens
IntelliCode
Jest
Live Server
MongoDB for VSCode
Node Essentials
Node Snippets
React Native Tools
React Code Snippets
REST Client (IMPORTANTE – sem ele, o backend não roda no Pull Request!)
TypeScript React Code Snippets
✅ Instalem o Yarn para o frontend

npm install -g yarn
yarn -v
✅ Frameworks para o Frontend

React Native
Expo
TypeScript
Zustand

📌 IMPORTANTE
Backend só instala dependências dentro de cd backend
Frontend só instala dependências dentro de cd frontend
Sempre registrem alterações no arquivo de instruções para evitar bagunça.
Se tiver dúvida, falem antes de mexer em algo crítico. Bora fazer esse projeto funcionar! 

