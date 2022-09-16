import {MagnifyingGlassPlus} from 'phosphor-react'
import {useState, useEffect} from 'react';// hook de efeitos 
import * as Dialog from '@radix-ui/react-dialog';//importando e colocando os prefixos dentro de Dialog

interface CreateAdsenseBunnerProps {
    title: string,
    subTitle: string,
    buttonTitle: string
}

export function CreateAdsenseBunner(props: CreateAdsenseBunnerProps) {
    //exemplo de como trocar o titulo do botão após clicar nele(elementos com valores reativos)
    const [hasUserClickedOnButton, setHasUserClickedOnButton] = useState(false);
    //função que altera o valor do botão
    function handleButtonClick(){
        setHasUserClickedOnButton(!hasUserClickedOnButton);
    }

    useEffect(()=>{
        console.log(hasUserClickedOnButton)
    }, [hasUserClickedOnButton]);

    // Dialog.Trigger faz o modal aparecer
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>{props.title}</strong>
            <span className='text-zinc-400 block'>{props.subTitle}</span>
          </div>

          { hasUserClickedOnButton ? 'Usuário clicou' : null }


          <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gab-3'
            onClick={handleButtonClick}
          >
            <MagnifyingGlassPlus size={24} />
            {props.buttonTitle}
          </Dialog.Trigger>
        </div>
      </div>
    )
}