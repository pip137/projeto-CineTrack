"use client"

import { AnimatePresence } from "motion/react"

import CardFilme from "./CardFilmes.jsx";

export default function ListaFilmes({ filmes, aoEditar, aoRemover }) {
    if (filmes.length === 0) {
        return <p>Nenhum filme encontrado.</p>;
    }

    return (
        <AnimatePresence id="lista" aria-live="polite">
            {filmes.map((f) => (
                <CardFilme 
                    key={f.id} 
                    filme={f} 
                    aoEditar={aoEditar} 
                    aoRemover={aoRemover} 
                />
            ))}
        </AnimatePresence>
    );
}