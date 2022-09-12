/*
   JSK = JavaScript + XML(HTML)
*/

/*
   Componentes e Propriedades

   igual a tag e atributos
   <img src="">
*/
// exemplo de um componente
interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

// excutando a aplicação
function App() {
  // é obrigatório ter os elementos encapsulados pela div
  return (
    <div>
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />

      <h1>Hello NLW!!!</h1>
    </div>
  )
}

export default App
