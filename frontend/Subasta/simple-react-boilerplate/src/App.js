import React from 'react';
import Web3 from 'web3';
import Subasta from './static/Subasta.json'
import Bulbasaur from './static/Bulbasaur.png'
import './appStyles.css'
var miContrato;

const { ethereum } = window

class App extends React.Component {

    constructor(){
      super()
      this.state={
        montoApuesta: 0
      }
    }

    async componentDidMount() {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
        console.log(await web3.eth.getAccounts());

        miContrato = await new web3.eth.Contract(Subasta.abi, Subasta.networks[5777].address)
        console.log(await miContrato.methods);

        console.log(await miContrato.methods.ApuestaMayor().call());
        console.log(await miContrato.methods.MayorPostorAddr().call());
    }

    async agregarApuesta(e) {
        e.preventDefault();
        await window.ethereum.enable();
        if (window.ethereum !== 'undefined') {
            if (ethereum.request({method: 'eth_requestAccounts'})) {
                const cuentas = await ethereum.request({method: 'eth_requestAccounts'})
                const cuenta = cuentas[0];
                console.log(Web3.utils.toWei(this.state.montoApuesta, 'ether'));
                console.log(await miContrato.methods.agregarApuesta().send({from: cuenta, 
                                                                            value: Web3.utils.toWei(this.state.montoApuesta, 'ether')}));
            } else {
                console.log(await ethereum.request({method: 'eth_requestAccounts'}));
            }
        } else {
            console.log("Metamask no esta instalado");
        }
    }

    changeBidAmount(e){
      e.preventDefault()
      console.log(e);
      this.setState({montoApuesta: e.target.value})
    }

    render() {
        return (
            <main className="appView">
                <header className="appView_header">
                    <h1>
                        Concurrente 2022-01 Trabajo Final
                    </h1>
                </header>
                <section className="appView_body">
                    <aside className="asideContent">
                        <figure className="asideContent_figure">
                            <img src={Bulbasaur} alt='Bulbasaur'/>
                        </figure>
                    </aside>
                    <section className="mainContent">
                        <h2 className="mainContent_name">Nombre de la imagen</h2>
                        <p className="mainContent_description">Descripción ....</p>
                        <p className="mainContent_data">
                            <label className="dataLabel">Monto:</label>
                            <span className="dataValue">10.00</span>
                        </p>
                        <div className="mainContent_options">
                            <h3 className="optionsTitle">Opciones:</h3>
                            <div className="optionsField">
                                <input
                                    className="optionsField_input"
                                    type='number'
                                    placeholder='Eth'
                                    value={this.state.montoApuesta}
                                    onChange={(e)=> this.changeBidAmount(e)}/>
                                <button
                                    className="optionsField_button"
                                    type="button"
                                    onClick={(e) => this.agregarApuesta(e)}>Apostar</button>
                            </div>
                            <div className="optionsField">
                                <input
                                    className="optionsField_input"
                                    type='number'
                                    placeholder='Placeholder...'/>
                                <button
                                    className="optionsField_button"
                                    type="button">Retirar apuesta</button>
                            </div>
                            <div className="optionsField">
                                <input
                                    className="optionsField_input"
                                    type='number'
                                    placeholder='Placeholder...'/>
                                <button
                                    className="optionsField_button"
                                    type="button">Crear tiempo fin</button>
                            </div>
                            <div className="line"/>
                            <div className="optionsField">
                                <input
                                    className="optionsField_input"
                                    type='number'
                                    placeholder='Placeholder...'/>
                                <button
                                    className="optionsField_button"
                                    type="button">Obtener contra..</button>
                            </div>
                            <div className="optionsField">
                                <button
                                    className="optionsField_button"
                                    type="button">Apuesta mayor</button>
                                <label className="optionsField_label">Texto a reemplazar ...</label>
                            </div>
                            <div className="optionsField">
                                <button
                                    className="optionsField_button"
                                    type="button">Mayor postor</button>
                                <label className="optionsField_label">Texto a reemplazar ...</label>
                            </div>
                            
                        </div>
                    </section>
                </section>
                
            </main>
        );
    }
}

export default App;
