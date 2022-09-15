/* JSK = JavaScript + XML(HTML) */
import {useState, useEffect} from 'react';// hook de efeitos 

//importando e colocando os prefixos dentro de Dialog
import * as Dialog from '@radix-ui/react-dialog';

import {GameBanner} from './components/GameBanner'
import {CreateAdsenseBunner} from './components/CreateAdsenseBunner'
import {Input} from './components/Form/Input'

/* importando css */
import './styles/main.css';
//importando icone
import {GameController} from 'phosphor-react'
/* importando a imagem para variavel logo */
import logoImg from './assets/logo-nlw-esports.svg';

// essa interface é criada para tipar o useState com array de objetos Game
interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    adsenses: number
  }
}

// excutando a aplicação
function App() {
  //aqui atribuimos a useEffect e o array interface Games
  const [games, setGames] = useState<Game[]>([]);
  //executa toda vez q ouver uma ação em qualquer parte do app
  useEffect(()=>{
    fetch("http://localhost:3333/games")
    .then(response=>response.json())
    .then(data => {
      console.log(data)
      setGames(data);
    })
  }, []);

  // é obrigatório ter os elementos encapsulados pela div
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game=>{
          return (
            <GameBanner 
              key={game.id}//tem q colocar por causa do .map()
              title={game.title} 
              bannerUrl={game.bannerUrl} 
              adsCount={game._count.adsenses} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdsenseBunner 
          title="Não encontrou seu duo?" 
          subTitle="Publique um anúncio para encontrar novos players!"
          buttonTitle="Publicar anúncio"
        />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
            <Dialog.Content className='bg-[#2A2634] fixed py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
              <Dialog.Title className='text-3x font-black'>Publique um Anúncio</Dialog.Title>
                <form className='mt-8 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                    <Input type="text" id="game" placeholder="Selecione o game que deseja jogar" />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='font-semibold'>Seu nome ou nickgame</label>
                    <Input type="text" id='name' placeholder='Como te chamam dentro do game?' />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
                      <Input type="number" id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="discordId" className='font-semibold'>Qual seu discord</label>
                      <Input type="text" id='discordId' placeholder='Usuário#00000' />
                    </div>
                  </div>

                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar?</label>
                      <div className='grid grid-cols-4 gap-2'>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Domingo'>S</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Segunda'>D</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Terça'>T</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Quarta'>Q</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Quinta'>Q</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Sexta'>S</button>
                        <button className='w-8 h-8 rounded bg-zinc-900 gap' title='Sábado'>S</button>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor="hourStart" className='font-semibold'>Qual horário do dia?</label>
                      <div className='grid grid-cols-2 gap-2'>
                        <Input type="time" id='hourStart' placeholder='De' />
                        <Input type="time" id='hourEnd' placeholder='Até' />
                      </div>
                    </div>
                  </div>

                  <div className='mt-2 flex gap-2 text-sm'>
                    <Input type="checkbox" />
                    Cusumo me conectar ao chat de voz
                  </div>

                  <footer className='mt-4 flex justify-end gap-4'>
                    <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600' type='button'>Cancelar</Dialog.Close>
                    <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                      <GameController className='w-6 h-6' />
                      Encontrar Duo
                    </button>
                  </footer>
                </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
