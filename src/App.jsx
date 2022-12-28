/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs), [OKAY]
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos. [OKAY]
- Crie também validações para cada campo conforme instruções abaixo. [OKAY] 

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar [OKAY]

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes, [OKAY]
input - email - válido se digitar um e-mail, [OKAY]
select - estado civil, [OKAY]
radio - gênero [OKAY]

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;[OKAY]

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante... [OKAY]

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então. [OKAY]

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente. [OKAY]

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos. [OKAY]

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente. [OKAY]
*/

import { useState } from "react";

function App() {

  const [data, setData] = useState({
    fullName: "",
    mail: "",
    maritalStatus: "",
    genre: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setData((prev) => {
      const newObj = { ...prev, [name]: value }

      return newObj
    })
  }

  const handleClick = (event) => {
    alert('Usuário cadastrado com sucesso')
    setData({
      fullName: "",
      mail: "",
      maritalStatus: "",
      genre: ""
    })
  }

  const progressBar = () => {
    let value = 0
    let percent = 25

    if (data.fullName) {
      const nameSplit = data.fullName.split(' ')

      if (nameSplit[1]) {
        value += percent
      } else {
        value += percent / 2
      }
    }
    if (data.mail) {
      const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEx.test(data.mail)) {
        value += percent
      } else {
        value += percent / 2
      }
    }
    if (data.maritalStatus) {
      value += percent
    }
    if (data.genre) {
      value += percent
    }

    return value;
  }

  progressBar()

  return (
    <div className='App'>
      <h1>Progresso do Formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progressBar()}%` }}></div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input name="fullName" onChange={handleChange} value={data.fullName} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input name="mail" onChange={handleChange} value={data.mail} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select name="maritalStatus" onChange={handleChange} value={data.maritalStatus}>
            <option value=''>- Selecione -</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name="genre" onChange={handleChange} value="man" checked={data.genre === 'man'} /> Masculino
            </span>
            <span>
              <input type='radio' name="genre" onChange={handleChange} value="woman" checked={data.genre === 'woman'} /> Feminino
            </span>
          </div>
        </div>
        <button onClick={handleClick} disabled={progressBar() !== 100}>Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
