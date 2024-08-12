# Use uma imagem base do Node.js
FROM node:18

# Crie um diretório para a aplicação
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Instale as dependências
RUN yarn

# Compile o TypeScript para JavaScript
RUN yarn build

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["yarn", "start:prod"]
