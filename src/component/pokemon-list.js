import React, { Component } from 'react'

export default class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonList: '',
            filteredList: null,
            isReady: false
        }
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent(e) {
        const inputValue = e.target.value
        const tempList = [...this.state.pokemonList]
        const filteredList = tempList.filter(list => !list.name.indexOf(inputValue.toLowerCase()))
        this.setState({
            filteredList
        })
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964')
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                let pokemonList = myJson.results
                this.setState({
                    pokemonList,
                    isReady: true
                })
            }) 
    }

    render() {
        let pokemonList
        if(this.state.filteredList !== null) {
         pokemonList = this.state.filteredList
        } else {
         pokemonList = this.state.pokemonList
        }
        if (this.state.isReady) {
            return (
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="mx-auto pokemon">
                                <div className="form-group pokemon__input">
                                    <div className='text-center mt-4'>
                                        <img src='/ball.png' height='80' className='mb-4 ball-anim' alt='poke-ball'/>
                                        <img src='/poke.png' height='80' className='mb-4' alt='poke api logo'/>
                                    </div>
                                    <input onChange={this.handleEvent} type="text" className="form-control mt-4" id="pokemon-name"
                                    placeholder="Search Pokemon" />
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="pokemon-container">
                        <div className="row d-flex justify-content-center" >
                            {pokemonList.map((pokemon, index) => (
                                        <button className='btn'> <img src='/ball.png' height='40' alt='poke-ball'/> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</button>
                            ))}
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <div> Loading ...</div>
                    )
                }
            }
}
