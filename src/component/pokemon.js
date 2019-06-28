import React, { Component } from 'react'

const style = {
    'width': '14rem'
}

export default class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonList: '',
            isReady: false
        }
        this.url = 'https://github.com/pokeAPI/sprits/blob/master/sprites/pokemon/1.png'
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
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
            return (
                <React.Fragment>
                    {this.state.pokemonList.map(pokemon => (
                        <div className="card" style={style}>
                            <img src="" className="card-img-top" alt={`${pokemon.name}`} />
                            <div className="card-body">
                                <span>{pokemon.name}</span>
                            </div>
                        </div>
                    ))}

                </React.Fragment>
            )
    }
}