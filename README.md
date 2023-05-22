# NLW #12 - Space Time

Aplicação desenvolvida no evento Next Level Week da Rocketseat.

Aplicativo de recordações onde você pode cadastrar memórias, adicionar uma foto, vídeo e descrição para completar, e se quiser, compartilhar. 

Desenvolvimento completo com Front-end, Back-end e app mobile com as tecnologias mais atuais, incluindo OAuth com a conta do Github.


## Tecnologias utilizadas

**Linguagem principal:** Typescript

**Front-end:** React, Next.js, TailwindCSS

**Back-end:** Node, Fastify, Prisma, JWT

**Mobile:** ReactNative, Expo, NativeWind


## Screenshots

![Screenshot 1](https://i.imgur.com/kFfjvTg.png)

![Screenshot 2](https://i.imgur.com/VofmvIn.png)

![Screenshot 3](https://i.imgur.com/otd6LWx.png)

![Screenshot 4](https://i.imgur.com/uDnYq08.png)

![Screenshot 5](https://i.imgur.com/bbm9qhP.png)

![Screenshot 6](https://i.imgur.com/1zZLZeI.png)


## Rodando localmente

Para rodar o projeto na sua máquina é necessário ter o Node.js instalado e atualizado. Em cada um dos diretórios individuais(web, mobile e server) instale as dependências usando: 

```bash
  npm install
```

Com as dependências instaladas, no diretório do servidor rode:

```bash
  npx prisma migrate dev
```

Depois disso o server ja pode ser executado, lembrando que é importante inserir as variáveis de ambiente no arquivo .env e comentar as variáveis que não serão usadas. Para rodar o servidor:

```bash
  npm run dev
```

Esse mesmo comando serve para rodar a instância da web.

Para iniciar a versão mobile:
```bash
  npm run start
```
Não esqueça de comentar as variáveis web e descomentar as variáveis mobile do arquivo .env do servidor.
