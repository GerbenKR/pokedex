import React, { useEffect, useState } from 'react';
import { colors } from '../colors';
import LoadingSpinner from './LoadingSpinner';

interface Props {
    isOpen: boolean;
    pokemonId: number | null;
    onClose: Function;
    onPokemonChange: Function;
}

export default function Drawer({ isOpen, pokemonId, onClose, onPokemonChange }: Props) {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>();

    useEffect(() => {
        if (pokemonId === null) return;

        setLoading(true);

        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then((res) => res.json())
            .then((data: PokemonFull) => {
                setPokemon(data);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                alert('Er is iets fout gegaan met het laden van de pokemon');
                console.error(err);
                setLoading(false);
                onClose();
            });
    }, [isOpen, pokemonId]);

    useEffect(() => {
        if (isOpen === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <>
            <div
                onClick={() => onClose()}
                className={`fixed top-0 left-0 w-full h-full bg-black transition duration-500 ${
                    isOpen ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}></div>

            <div
                className={`absolute top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none`}>
                <div
                    className={`absolute top-0 right-0 bg-white w-[100vw] lg:w-[50vw] h-full transition duration-50000 pointer-events-auto ${
                        isOpen ? 'translate-x-0' : 'translate-x-[100vw] lg:translate-x-[50vw]'
                    }`}>
                    <div className="relative h-full p-5">
                        {loading === false && (
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-medium capitalize">
                                        {pokemon?.name}
                                    </h2>
                                    <span className="cursor-pointer" onClick={() => onClose()}>
                                        Close
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <div className="flex gap-5">
                                        <div className="w-1/2">
                                            <div className="bg-gray-100 rounded-lg p-5">
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`}
                                                    alt={pokemon?.name}
                                                />
                                            </div>

                                            <h2 className="mt-2 text-2xl text-center">
                                                <span className="text-xl text-gray-500">
                                                    {pokemonId}.{' '}
                                                </span>
                                                <span className="font-medium capitalize">
                                                    {pokemon?.name}{' '}
                                                </span>
                                                <span className="text-xl text-gray-500">
                                                    ({pokemon?.types[0].type.name})
                                                </span>
                                            </h2>

                                            <div className="mt-5">
                                                <p>
                                                    <b>Height: </b> {pokemon?.height}
                                                </p>
                                                <p>
                                                    <b>Weight: </b> {pokemon?.weight}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-1/2">
                                            <div>
                                                <h2 className="mb-2 font-medium text-lg">
                                                    Base stats
                                                </h2>

                                                {pokemon?.stats.map((stat, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className=" text-white p-3 rounded-md mb-2 flex items-center justify-between"
                                                            style={{
                                                                background:
                                                                    colors[
                                                                        pokemon.types[0].type.name
                                                                    ],
                                                            }}>
                                                            <p>{stat.stat.name}</p>
                                                            <p>{stat.base_stat}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="mt-5">
                                                <h2 className="mb-2 font-medium text-lg">
                                                    Abilities
                                                </h2>

                                                {pokemon?.abilities.map((ability, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className=" text-white p-3 rounded-md mb-2 flex items-center justify-between"
                                                            style={{
                                                                background:
                                                                    colors[
                                                                        pokemon.types[0].type.name
                                                                    ],
                                                            }}>
                                                            <p>{ability.ability.name}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute left-0 bottom-0 w-full p-5 flex items-center justify-between">
                                    <button
                                        onClick={() => onPokemonChange((pokemonId as number) - 1)}
                                        className="border border-black p-2 bg-white">
                                        Vorige
                                    </button>
                                    <button
                                        onClick={() => onPokemonChange((pokemonId as number) + 1)}
                                        className="border border-black p-2 bg-white">
                                        Volgende
                                    </button>
                                </div>
                            </>
                        )}
                        {loading === true && (
                            <>
                                <LoadingSpinner />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
