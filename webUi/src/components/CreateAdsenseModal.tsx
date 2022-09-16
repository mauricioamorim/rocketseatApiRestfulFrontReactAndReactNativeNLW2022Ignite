//importando e colocando os prefixos dentro de Dialog
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

//importando icone
import {Check, GameController} from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import {useState, useEffect, FormEvent} from 'react';// hook de efeitos 
import {Input} from './Form/Input'

// essa interface é criada para tipar o useState com array de objetos Game
interface Game {
    id: string,
    title: string,
}

export function CreateAdsenseModal() {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    //aqui atribuimos a useEffect e o array interface Games
    const [games, setGames] = useState<Game[]>([]);
    //executa toda vez q ouver uma ação em qualquer parte do app
    useEffect(()=>{
        axios("http://localhost:3333/games").then(response => {
            setGames(response.data);
        })
    }, []);

    async function handleCreateAdsense(event: FormEvent){
        console.log('Enviou o formulário')
        //impede de redirecionar o formulario
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);


        // validação
        if(!data.name){
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discordId: data.discordId,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart, 
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            });

            alert('Anúncio criado com sucesso!')
        } catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio!')
        }

    }
    
    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
            <Dialog.Content className='bg-[#2A2634] fixed py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
              <Dialog.Title className='text-3x font-black'>Publique um Anúncio</Dialog.Title>
                <form onSubmit={handleCreateAdsense} className='mt-8 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                    <select 
                        id="game" 
                        name="game"
                        className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                        <option disabled defaultValue="">Selecione o game que deseja jogar</option>
                        { games.map(game=>{
                            return <option key={game.id} value={game.id}>{game.title}</option>
                        }) }
                    </select>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='font-semibold'>Seu nome ou nickgame</label>
                    <Input type="text" name='name' id='name' placeholder='Como te chamam dentro do game?' />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
                      <Input type="number" name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="discordId" className='font-semibold'>Qual seu discord</label>
                      <Input type="text" name='discordId' id='discordId' placeholder='Usuário#00000' />
                    </div>
                  </div>

                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar?</label>
                        <ToggleGroup.Root 
                            type='multiple' 
                            className='grid grid-cols-4 gap-2'
                            value={weekDays}
                            onValueChange={setWeekDays}>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500':'bg-zinc-900'}`} title="Domingo" value="0">D</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500':'bg-zinc-900'}`} title="Segunda" value="1">S</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500':'bg-zinc-900'}`} title='Terça' value='2'>T</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500':'bg-zinc-900'}`} title='Quarta' value='3'>Q</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500':'bg-zinc-900'}`} title='Quinta' value='4'>Q</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500':'bg-zinc-900'}`} title='Sexta'  value='5'>S</ ToggleGroup.Item>
                            <ToggleGroup.Item className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500':'bg-zinc-900'}`} title='Sábado' value='6'>S</ ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor="hourStart" className='font-semibold'>Qual horário do dia?</label>
                      <div className='grid grid-cols-2 gap-2'>
                        <Input type="time" name='hourStart' id='hourStart' placeholder='De' />
                        <Input type="time" name='hourEnd' id='hourEnd' placeholder='Até' />
                      </div>
                    </div>
                  </div>

                  <label className='mt-2 flex gap-2 text-sm items-center'>
                    <Checkbox.Root
                        checked={useVoiceChannel}
                        onCheckedChange={(checked)=>{
                            if(checked==true){
                                setUseVoiceChannel(true)
                            } else {
                                setUseVoiceChannel(false)
                            }
                        }}
                        className='w-6 h-6 p-1 rounded bg-zinc-900'>
                        <Checkbox.Indicator>
                            <Check className='w-4 h-4 text-emerald-400'/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    Cusumo me conectar ao chat de voz
                  </label>

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
    )
}