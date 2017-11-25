import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { PokemonService } from '../shared/pokemon.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'pk-list',
  templateUrl: 'list-pokemons.template.html',
    styles: [`
          :host >>> .tooltip-inner {
          background-color: #FF7768;
          color: #fff;
          }
          :host >>> .tooltip .tooltip-arrow {
          border-bottom-color: #FF7768;
          }
  `]
})

export class ListPokemonsComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  pokemon: Pokemon[];
  errorMessage: string;

  // Modal Properties
  selectedPokemonLoaded: boolean = false;
  pokeDetails: Pokemon;

  constructor(private _pokemonService: PokemonService) { }

  ngOnInit() {
    // get all Pokemons
    this.getPokemons();
  }

  public hideChildModal() {
    this.childModal.hide();
  }

  getPokemons() {
    this._pokemonService.getPokemons()
          .subscribe(
            (pokemon: Pokemon[]) => {
              console.log(pokemon);
              this.pokemon = pokemon;
            },
            error => this.errorMessage = <any> error
            );
  }

  deletePokemon(pokemon: Pokemon) {
    this._pokemonService.deletePokemon(pokemon)
          .subscribe(
            () => this.deletePokemonFromList(pokemon),
            error => this.errorMessage = <any> error,
            );
  }

  viewSinglePokemon(id: number) {
    this._pokemonService.getPokemonDetails(id)
          .subscribe(
            (pokemon: Pokemon) => {
              this.pokeDetails = pokemon;
              this.selectedPokemonLoaded = true;
              this.childModal.show();
            },
            error => this.errorMessage = <any> error
            )
  }

  private deletePokemonFromList(pokemon: Pokemon) {
    var index = this.pokemon.indexOf(pokemon, 0);
    if(index > -1) {
      this.pokemon.splice(index, 1);
    }
  }

}
