import React from 'react';

interface Props {
    name: string;
    id: number;
}

export default function PokemonCard({ name, id }: Props) {
    return (
        <>
            <div className="p-2 bg-gray-200 aspect-square rounded-md text-center cursor-pointer">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                    alt={name}
                />
                <p className="mt-2 font-medium">
                    {id}. {name}
                </p>
            </div>
        </>
    );
}
