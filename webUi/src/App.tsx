/*
   JSK = JavaScript + XML(HTML)
*/

import {MagnifyingGlassPlus} from 'phosphor-react'


/* importando css */
import './styles/main.css';

/* importando a imagem para variavel logo */
import logoImg from './assets/logo-nlw-esports.svg';

/*
   Componentes e Propriedades

   igual a tag e atributos
   <img src="">
*/
// exemplo de um componente
interface GamesProps {
  title: string;
  link: string;
  imgSrc: string;
  quantaty: string;
}
function Games(props: GamesProps) {
  return (
    <a href="{props.title}" className='relative rounded-lg overflow-hidden'>
      <img src={props.imgSrc} alt={props.title} />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{props.title}</strong>
        <span className='text-zinc-300 text-sm'>{props.quantaty} anúncios</span>
      </div>
    </a>
  )
}

// excutando a aplicação
function App() {
  // é obrigatório ter os elementos encapsulados pela div
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        <Games title="game 1" imgSrc='./game-1.png' quantaty="4" link="#" />
        <Games title="game 2" imgSrc='./game-2.png' quantaty="0" link="#" />
        <Games title="game 3" imgSrc='./game-3.png' quantaty="0" link="#" />
        <Games title="game 4" imgSrc='./game-4.png' quantaty="0" link="#" />
        <Games title="game 5" imgSrc='./game-5.png' quantaty="0" link="#" />
        <Games title="game 6" imgSrc='./game-6.png' quantaty="0" link="#" />
      </div>

      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gab-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
