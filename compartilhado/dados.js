import imagemMassagem from './imagens/massagem.webp';
import imagemPedras from './imagens/pedras.webp';
import imagemRitual from './imagens/ritual.webp';

export { default as imagemEspaco } from './imagens/recepcao.webp';

export const categorias = ['Todas as massagens', 'Relaxamento', 'Alívio de tensões', 'Rituais'];
export const itensPorPagina = 3;
export const horarios = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

export const massagens = [
  {
    id: 'relaxante', nome: 'Massagem relaxante', categoria: 'Relaxamento',
    duracao: 50, preco: 120, imagem: imagemMassagem,
    descricao: 'Movimentos lentos e pressão leve para soltar o corpo depois de um dia cheio.',
  },
  {
    id: 'pedras-quentes', nome: 'Pedras quentes', categoria: 'Alívio de tensões',
    duracao: 60, preco: 150, imagem: imagemPedras,
    descricao: 'O calor das pedras acompanha a massagem nas costas e nos ombros.',
  },
  {
    id: 'escalda-pes', nome: 'Escalda-pés aromático', categoria: 'Rituais',
    duracao: 30, preco: 75, imagem: imagemRitual,
    descricao: 'Água morna, ervas e uma massagem nos pés para terminar o dia com calma.',
  },
  {
    id: 'costas', nome: 'Costas e ombros', categoria: 'Alívio de tensões',
    duracao: 40, preco: 100, imagem: imagemMassagem,
    descricao: 'Uma sessão concentrada nas costas e nos ombros, com pressão ajustada ao seu conforto.',
  },
  {
    id: 'aromaterapia', nome: 'Massagem aromática', categoria: 'Relaxamento',
    duracao: 50, preco: 135, imagem: imagemRitual,
    descricao: 'Toques suaves com óleo aromático escolhido no início da sessão.',
  },
  {
    id: 'pausa', nome: 'Ritual Pausa Completa', categoria: 'Rituais',
    duracao: 80, preco: 185, imagem: imagemPedras,
    descricao: 'Escalda-pés, massagem relaxante e alguns minutos para um chá ao final.',
  },
  {
    id: 'pescoco', nome: 'Pescoço e trapézio', categoria: 'Alívio de tensões',
    duracao: 30, preco: 85, imagem: imagemMassagem,
    descricao: 'Uma pausa curta com movimentos direcionados ao pescoço e à parte alta das costas.',
  },
  {
    id: 'pes', nome: 'Massagem nos pés', categoria: 'Alívio de tensões',
    duracao: 35, preco: 90, imagem: imagemRitual,
    descricao: 'Massagem dos calcanhares aos dedos, com atenção especial à sola dos pés.',
  },
  {
    id: 'chinelinho', nome: 'Ritual De Chinelinho', categoria: 'Rituais',
    duracao: 90, preco: 210, imagem: imagemPedras,
    descricao: 'Banho morno para os pés, pedras quentes nas costas e chá na sala de descanso.',
  },
];

export const abas = [
  { titulo: 'O ambiente', conteudo: 'A sala recebe uma pessoa por vez. Toalhas limpas, iluminação baixa e música tranquila acompanham cada sessão.' },
  { titulo: 'Primeira visita', conteudo: 'Chegue com dez minutos de antecedência. A equipe conversa com você sobre o atendimento e ajusta a pressão ao seu conforto.' },
  { titulo: 'Depois da sessão', conteudo: 'Você pode tomar água ou chá na recepção e esperar alguns minutos antes de retomar o dia.' },
];

export const perguntas = [
  { titulo: 'Posso chegar de chinelinho?', conteudo: 'Pode sim. Roupas confortáveis e calçados fáceis de tirar ajudam você a aproveitar o momento.' },
  { titulo: 'Preciso levar alguma coisa?', conteudo: 'A casa oferece toalhas e os materiais da sessão. Venha com uma roupa confortável.' },
  { titulo: 'Como escolho a massagem?', conteudo: 'Use o filtro do catálogo para comparar categorias, duração e preço. Selecione uma massagem para preencher o formulário.' },
  { titulo: 'O formulário marca uma sessão de verdade?', conteudo: 'A reserva é uma simulação da atividade acadêmica. Os dados do formulário são descartados ao recarregar a página.' },
];

const real = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatarPreco = (valor) => real.format(valor);

export function formularioInicial() {
  return { nome: '', massagem: '', data: '', horario: '' };
}

export function progressoReserva({ nome, massagem, data, horario }) {
  return [nome?.trim().length >= 2, massagem, data, horario].filter(Boolean).length * 25;
}

export function dataMinima() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}
