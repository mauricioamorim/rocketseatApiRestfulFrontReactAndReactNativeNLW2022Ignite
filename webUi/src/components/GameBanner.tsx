/*
   Componentes e Propriedades

   igual a tag e atributos
   <img src="">
*/
// exemplo de um componente
interface GamesProps {
    title: string;
    bannerUrl: string;
    adsCount: number;
}

export function GameBanner(props: GamesProps) {
    return (
      <a href="{props.title}" className='relative rounded-lg overflow-hidden'>
        <img src={props.bannerUrl} alt={props.title} />
  
        <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>{props.title}</strong>
          <span className='text-zinc-300 text-sm'>{props.adsCount} anúncio(s)</span>
        </div>
      </a>
    )
  }