import React from 'react';
import Web3 from 'web3';
import Subasta from './static/Subasta.json'
import Bulbasaur from './static/Bulbasaur.png'
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
        if (window.ethereum !== 'undefined') {
            if (Window.ethereum.selectedAddress) {
                console.log(Web3.utils.toWei(this.state.montoApuesta, 'ether'));
                console.log(await miContrato.methods.agregarApuesta().send({from: window.ethereum.selectedAddress(), 
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
            <div style={
                {
                    margin: '0px auto',
                    display: 'flex',
                    justifyContent: "center",
                    flexFlow: "column",
                    alignItems: "center"
                }
            }>
                <h1>
                    Concurrente 2022-01 Trabajo Final
                </h1>
                <img src={Bulbasaur}
                    alt='Bulbasaur'/>
                <input type='number' placeholder='Eth' value={this.state.montoApuesta} onChange={(e)=> this.changeBidAmount(e)}/>
                <button onClick={
                    (e) => this.agregarApuesta(e)
                }>Apostar</button>
            </div>
        );
    }
}

export default App;
