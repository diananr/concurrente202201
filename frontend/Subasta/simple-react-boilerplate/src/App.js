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
      montoApuesta: 0,
      direccionRetiro: '',
      apuestaMayorLabel: '',
      mayorPostorLabel: '',
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

  changeBidAmount(e) {
    e.preventDefault();
    this.setState({ montoApuesta: e.target.value });
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
            <h2 className="mainContent_name">Nombre de la imagen</h2>
            <p className="mainContent_description">Descripción ....</p>
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
                  className="optionsField_input"
                  type="number"
                  placeholder="Eth"
                  value={this.state.montoApuesta}
                  onChange={(e) => this.changeBidAmount(e)}
                />
                <button
                  className="optionsField_button"
                  type="button"
                  onClick={(e) => this.agregarApuesta(e)}
                >
                  Pujar
                </button>
              </div>
              <div className="optionsField">
                <input
                  className="optionsField_input"
                  type="text"
                  placeholder="Postor Address"
                  value={this.state.direccionRetiro}
                  onChange={(e) => this.changePostorAddress(e)}
                />
                <button
                  className="optionsField_button"
                  type="button"
                  onClick={(e) => this.retirarPuja(e)}
                >
                  Retirar Puja
                </button>
              </div>
              <div className="optionsField">
                <input
                  className="optionsField_input"
                  type="datetime-local"
                  placeholder="Placeholder..."
                />
                <button className="optionsField_button" type="button">
                  Crear tiempo fin
                </button>
              </div>
              <div className="line" />
              <div className="optionsField">
                <input
                  className="optionsField_input"
                  type="number"
                  placeholder="Placeholder..."
                />
                <button className="optionsField_button" type="button">
                  Obtener contra..
                </button>
              </div>
              <div className="optionsField">
                <button className="optionsField_button" type="button">
                  Apuesta mayor
                </button>
                <label className="optionsField_label">
                  Texto a reemplazar ...
                </label>
              </div>
              <div className="optionsField">
                <button className="optionsField_button" type="button">
                  Mayor postor
                </button>
                <label className="optionsField_label">
                  Texto a reemplazar ...
                </label>
              </div>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

export default App;
