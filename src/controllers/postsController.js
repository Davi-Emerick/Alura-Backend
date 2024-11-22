import {getTodosPosts, createPost, atualizarPost} from "../models/postModels.js";
import fs from 'fs'
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
  };

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
      const postCriado = await createPost(novoPost);
      res.status(200).json(postCriado);
    } catch(error) {
      console.error(error.message);
      res.status(500).json({'Erro':'Falha na requisição'});
    }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: '',
    imgUrl: req.file.originalname,
    alt: ''
  };

  try {
    const postCriado = await createPost(novoPost);
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`
    fs.renameSync(req.file.path, imgAtualizada)
    res.status(200).json(postCriado);
  } catch(error) {
    console.error(error.message);
    res.status(500).json({'Erro':'Falha na requisição'});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const alt = await gerarDescricaoComGemini(imgBuffer)
    const post = {
      imgUrl: urlImagem,
      descricao: req.body.descricao,
      alt: alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch(error) {
    console.error(error.message);
    res.status(500).json({'Erro':'Falha na requisição'});
  }
}
