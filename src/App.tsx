import { useEffect, useMemo, useState } from 'react';

import pokedexLogo from './assets/pokedex_logo.png';

import Drawer from './components/Drawer';
import LoadingSpinner from './components/LoadingSpinner';
import PokemonCard from './components/PokemonCard';

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [showPokemons, setShowPokemons] = useState<Pokemon[] | null>(null);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(20);

    const [searchQuery, setSearchQuery] = useState('');

    const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

    const calculatePokemonPerPage = (start: number) => {
        return start + pokemonsPerPage * currentPage; // Expotionele formule: (0 + 20 * 1 = 20)
    };

    // On page load
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
            .then((res) => res.json())
            .then((data) => {
                setPokemons(data.results);
                setShowPokemons(
                    data.results.slice(calculatePokemonPerPage(0), calculatePokemonPerPage(20))
                );
                setCurrentPage(0);
                setLoading(false);
            })
            .catch((err) => {
                alert('Er is iets fout gegaan met het laden van de pokemons');
                console.error(err);
                setLoading(false);
            });
    }, []);

    // When the page or the amount of pokemons per page changes
    useEffect(() => {
        setShowPokemons(
            pokemons.slice(calculatePokemonPerPage(0), calculatePokemonPerPage(pokemonsPerPage))
        );
    }, [currentPage, pokemonsPerPage]);

    // When the search query changes
    useEffect(() => {
        if (searchQuery.length > 0) {
            setShowPokemons(pokemons.filter((pokemon) => pokemon.name.includes(searchQuery)));
            setCurrentPage(0);
        } else {
            setShowPokemons(
                pokemons.slice(calculatePokemonPerPage(0), calculatePokemonPerPage(pokemonsPerPage))
            );
        }
    }, [searchQuery]);

    return (
        <>
            <div className="px-5 container mx-auto">
                <div className="py-5 lg:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            disabled={currentPage === 0 ? true : false}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="border border-black p-2 disabled:opacity-20">
                            Vorige
                        </button>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Zoeken naar pokemon"
                            className="border border-black p-2 w-[250px]"
                        />
                        <span className="text-gray-500">Pagina: {currentPage + 1}</span>
                    </div>
                    <img src={pokedexLogo} className="w-[100px] m-auto my-5 lg:my-0" alt="" />
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Pokemons per pagina:</span>
                            <input
                                min={0}
                                max={100}
                                type="number"
                                value={pokemonsPerPage}
                                onChange={(e) => setPokemonsPerPage(Number(e.target.value))}
                                className="border border-black p-2 w-[50px] text-center"
                            />
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="border border-black p-2">
                            Volgende
                        </button>
                    </div>
                </div>

                {loading == false && showPokemons !== null && (
                    <>
                        <div className="grid sm:grid-cols-4 lg:grid-cols-7 gap-5">
                            {showPokemons.map((pokemon) => {
                                const id = parseInt(pokemon.url.split('/')[6]);

                                return (
                                    <div onClick={() => setSelectedPokemon(id)}>
                                        <PokemonCard name={pokemon.name} id={id} />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {loading === true && (
                    <>
                        <LoadingSpinner />
                    </>
                )}
            </div>

            <Drawer
                isOpen={selectedPokemon !== null ? true : false}
                pokemonId={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
                onPokemonChange={(id: number) => setSelectedPokemon(id)}
            />
        </>
    );
}

export default App;
