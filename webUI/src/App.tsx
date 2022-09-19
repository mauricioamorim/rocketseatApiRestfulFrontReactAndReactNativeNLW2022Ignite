/* JSK = JavaScript + XML(HTML) */
import {useState, useEffect} from 'react';// hook de efeitos 
import axios from 'axios';

//importando e colocando os prefixos dentro de Dialog
import * as Dialog from '@radix-ui/react-dialog';

import {GameBanner} from './components/GameBanner'
import {CreateAdsenseBunner} from './components/CreateAdsenseBunner'

/* importando css */
import './styles/main.css';

/* importando a imagem para variavel logo */
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdsenseModal } from './components/CreateAdsenseModal';

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
    axios("http://localhost:3333/games").then(response => { 
      setGames(response.data)
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

        <CreateAdsenseModal />
      </Dialog.Root>
    </div>
  )
}

export default App
