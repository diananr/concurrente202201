import React from 'react';
import Web3 from 'web3';
import Subasta from './static/Subasta.json';
import Bulbasaur from './static/Bulbasaur.png';
import './appStyles.css';
var miContrato;

const { ethereum } = window;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      montoApuesta: null,
      direccionRetiro: '',
      apuestaMayorLabel: '',
      mayorPostorLabel: '',
      error1: false,
      error2: false,
      error3: false,
      fechaContract: new Date()
    };
  }

  async componentDidMount() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    );
    console.log(await web3.eth.getAccounts());

    miContrato = await new web3.eth.Contract(
      Subasta.abi,
      Subasta.networks[5777].address
    );
    console.log(await miContrato.methods);

    const a = await miContrato.methods.ApuestaMayor().call();
    console.log({ a });

    this.setState({
      apuestaMayorLabel: a,
    });
    this.setState({
      mayorPostorLabel: await miContrato.methods.MayorPostorAddr().call(),
    });
  }

  async agregarApuesta(e) {
    e.preventDefault();
    await window.ethereum.enable();
    if (window.ethereum !== 'undefined') {
      if (ethereum.request({ method: 'eth_requestAccounts' })) {
        const cuentas = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const cuenta = cuentas[0];
        console.log(Web3.utils.toWei(this.state.montoApuesta, 'ether'));
        console.log(
          await miContrato.methods.agregarApuesta().send({
            from: cuenta,
            value: Web3.utils.toWei(this.state.montoApuesta, 'ether'),
          })
        );
      } else {
        console.log(await ethereum.request({ method: 'eth_requestAccounts' }));
      }
    } else {
      console.log('Metamask no esta instalado');
    }
  }

  async retirarPuja(e) {
    e.preventDefault();
    if (window.ethereum !== 'undefined') {
      if (ethereum.request({ method: 'eth_requestAccounts' })) {
        const cuentas = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const cuenta = cuentas[0];
        console.log(
          await miContrato.methods
            .RetirarApuesta(this.state.direccionRetiro)
            .send({ from: this.state.direccionRetiro })
        );
      }
    }
  }

  async newContractDate(e){
    const fechatemp = new Date(this.state.fechaContract)
    const unixDate = fechatemp.getTime()/1000.0
    const cuentas = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const cuenta = cuentas[0];
    await  await miContrato.methods.crearTiempoFin(unixDate).send({from: cuenta})
  }

  dateContract(e){
    e.preventDefault();
    // const fechatemp = new Date(e.target.value)
    // const unixDate = fechatemp.getTime()/1000.0
    this.setState({fechaContract: e.target.value})
  }

  changeBidAmount(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value <= this.state.apuestaMayorLabel) {
      this.setState({ error1: true });
    } else {
      this.setState({ error1: false });
    }
    this.setState({ montoApuesta: value });
  }

  changePostorAddress(e) {
    e.preventDefault();
    this.setState({ direccionRetiro: e.target.value });
  }

  render() {
    return (
      <main className="appView">
        <header className="appView_header">
          <h1 className="headerTitle">PokeSubasta</h1>
        </header>
        <section className="appView_body">
          <aside className="asideContent">
            <figure className="asideContent_figure">
              <img src={Bulbasaur} alt="Bulbasaur" />
            </figure>
          </aside>
          <section className="mainContent">
            <h2 className="mainContent_name">Bulbasaur</h2>
            <p className="mainContent_description">
              Bulbasaur es un Pokémon de tipo planta/veneno introducido en la
              primera generación. Es uno de los Pokémon iniciales que pueden
              elegir los entrenadores que empiezan su aventura en la región
              Kanto, junto a Squirtle y Charmander (excepto en Pokémon
              Amarillo). Destaca por ser el primer Pokémon de la Pokédex
              Nacional y la en la Pokédex de Kanto.
            </p>
            <p className="mainContent_data">
              <label className="dataLabel">Monto:</label>
              <span className="dataValue">10.00</span>
            </p>
            <p className="mainContent_data">
              <label className="dataLabel">Mayor puja:</label>
              <span className="dataValue">{this.state.apuestaMayorLabel}</span>
            </p>
            <p className="mainContent_data">
              <label className="dataLabel">Dirección de mayor puja:</label>
              <span className="dataValue">{this.state.mayorPostorLabel}</span>
            </p>
            <div className="mainContent_options">
              <h3 className="optionsTitle">Opciones:</h3>
              <div className="optionsField">
                <input
                  className={`optionsField_input ${
                    this.state.error1 ? 'optionsField_inputError' : ''
                  }`}
                  type="number"
                  placeholder="Monto"
                  value={this.state.montoApuesta}
                  onChange={(e) => this.changeBidAmount(e)}
                />
                <button
                  className="optionsField_button"
                  type="button"
                  disabled={
                    this.state.error1 || this.state.montoApuesta === null
                  }
                  onClick={(e) => this.agregarApuesta(e)}
                >
                  Pujar
                </button>
              </div>
              <div className="optionsField">
                <input
                  className={`optionsField_input ${
                    this.state.error2 ? 'optionsField_inputError' : ''
                  }`}
                  type="text"
                  placeholder="Dirección del postor"
                  value={this.state.direccionRetiro}
                  onChange={(e) => this.changePostorAddress(e)}
                />
                <button
                  className="optionsField_button optionsField_buttonSecondary"
                  type="button"
                  disabled={
                    this.state.error2 ||
                    this.state.direccionRetiro === null ||
                    this.state.direccionRetiro.length === 0
                  }
                  onClick={(e) => this.retirarPuja(e)}
                >
                  Retirar Puja
                </button>
              </div>
              <div className="optionsField">
                <input
                  className={`optionsField_input ${
                    this.state.error3 ? 'optionsField_inputError' : ''
                  }`}
                  type="datetime-local"
                  placeholder="Placeholder..."
                  //value={this.state.fechaContract}
                  onChange={(e)=> this.dateContract(e)}
                />
                <button
                  className="optionsField_button optionsField_buttonSecondary2"
                  type="button"
                  onClick={(e)=> this.newContractDate(e)}
                  >
                  Crear tiempo fin
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

export default App;
