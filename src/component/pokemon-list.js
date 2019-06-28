import React, { Component } from 'react'

const style = {
    'width': '14rem',
    'margin': '10px'
}

export default class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonList: '',
            filteredList: null,
            isReady: false
        }
        // this.url = 'https://github.com/PokeAPI/pokeapi/blob/master/data/v2/sprites/pokemon/'
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent(e) {
        const inputValue = e.target.value
        const tempList = [...this.state.pokemonList]
        debugger
        const filteredList = tempList.filter(list => !list.name.indexOf(inputValue))
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
                            <div className="col-4 mx-auto pokemon">
                                <div className="form-group pokemon__input">
                                <label for="pokemon-name">Pokemon Name</label>
                                    <input onChange={this.handleEvent} type="text" className="form-control" id="pokemon-name"
                                    placeholder="Pokemon name" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" id="pokemon-container">
                        <div className="row d-flex justify-content-center" >
                            {pokemonList.map((pokemon, index) => (
                                <div className="card" style={style} key={index}>
                                    {/* <img src={`${this.url}${index + 1}.png?raw=true`} className="card-img-top" alt={`${pokemon.name}`} /> */}
                                    <div className="card-body text-center">
                                        <span>{pokemon.name}</span>
                                    </div>
                                </div>
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