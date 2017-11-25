import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';

@Component({
    moduleId: module.id,
    selector: 'pk-list',
    templateUrl: 'list-pokemons.template.html'
})

export class ListPokemonsComponent implements OnInit {
    pokemon: Pokemon[];
    errorMessage: string;

    constructor(private _pokemonService: PokemonService) {}

    ngOnInit() {
        // get all Pokemon
        this.getPokemons();
    }

    getPokemons() {
        this._pokemonService.getPokemons().subscribe(
            (pokemon: Pokemon[]) => {
                this.pokemon = pokemon;
            },
            error => this.errorMessage = <any> error
        );
    }
}
