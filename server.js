import express from 'express';
import routes from './src/routes/postRoutes.js';

const app = express();
app.use(express.static('uploads'))
routes(app);

const posts = [
    {
      descricao: 'Uma foto teste',
      imagem: 'https://placecats.com/millie/300/150',
      id: 1,
    },
    {
      descricao: 'Gato brincando com um novelo de lã',
      imagem: 'https://placecats.com/millie/300/150',
      id: 2,
    },
    {
      descricao: 'Paisagem montanhosa ao pôr do sol',
      imagem: 'https://placecats.com/millie/300/150',
      id: 3,
    },
    {
      descricao: 'Cachorro correndo na praia',
      imagem: 'https://placecats.com/millie/300/150',
      id: 4,
    },
    {
      descricao: 'Comida deliciosa',
      imagem: 'https://placecats.com/millie/300/150',
      id: 5,
    },
    {
      descricao: 'Cidade noturna',
      imagem: 'https://placecats.com/millie/300/150',
      id: 6,
    },
    {
      descricao: 'Natureza exuberante',
      imagem: 'https://placecats.com/millie/300/150',
      id: 7,
    }
  ];

app.listen(3000, () => {
    console.log('Servidor escutando...');
});
