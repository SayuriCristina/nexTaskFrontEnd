# NexTask - Plataforma de Gerenciamento de Tarefas

## Visão Geral

NexTask é uma plataforma moderna e intuitiva para gerenciamento de tarefas, inspirada no modelo Trello. A aplicação permite aos usuários:

- Organizar tarefas em diferentes estágios de progresso
- Aumentar a produtividade através de uma interface drag-and-drop
- Acompanhar e alcançar objetivos com facilidade

## Tecnologias 

### Frontend
- TypeScript como linguagem principal
- React.js para construção da interface de usuário
- Axios para comunicação com o backend

### Backend
- Java como linguagem principal
- Spring Boot como framework de desenvolvimento
- Docker para containerização e padronização do ambiente de desenvolvimento

## Funcionalidades

### Interface do Usuário
- **Visualização em Cards**: Todas as tarefas são exibidas em formato de cards organizados por status
- **Gerenciamento Completo**: 
  - Criação de novas tarefas através de formulário dedicado
  - Edição de tarefas existentes via formulário
  - Atualização do status através de drag-and-drop
  - Exclusão de tarefas indesejadas

### API REST

A API oferece endpoints completos para operações CRUD:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/:id` | Recupera uma tarefa específica |
| GET | `/tarefas/titulo/:titulo` | Busca tarefas por título |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas` | Atualiza uma tarefa existente |
| DELETE | `/tarefas/:id` | Remove uma tarefa |

## Configuração do Ambiente de Desenvolvimento

### Backend

#### Pré-requisitos
- JDK (Java Development Kit)
- Spring Framework
- MySQL

#### Passos de Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/SayuriCristina/nexTask
   ```

2. Configure o Banco de Dados:
   - Localize o arquivo `application.properties` em `src/main/resources`
   - Altere o perfil ativo para desenvolvimento:
     ```properties
     spring.profiles.active=dev
     ```
   - No arquivo `application-dev.properties`, configure as credenciais do MySQL:
     ```properties
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     ```

3. Execute o projeto como uma aplicação Spring Boot

### Frontend

#### Pré-requisitos
- Node.js e npm (ou Yarn)
- Vite

#### Passos de Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/SayuriCristina/nexTaskFrontEnd
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure a URL do backend:
   - Localize o arquivo `service.ts` na pasta `src/services`
   - Atualize a `baseURL` com o endereço do backend hospedado no Render.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## Observações Importantes

O backend está hospedado em um serviço gratuito com as seguintes limitações:
- O serviço entra em modo de espera após 60 segundos sem requisições
- O primeiro acesso após o período de inatividade pode ser mais lento
- Aguarde o carregamento completo antes de utilizar a aplicação
