"use client"
import { startTransition,useState } from "react";
import { AnimatePresence } from "motion/react"

import CardFilme from "./CardFilmes.jsx";
// import { div } from "motion/react-client";

export default function ListaFilmes({ filmes, aoEditar, aoRemover }) {
    const [selectFilm, setIdFilmSelec] = useState(Number | null);
    const open = ( id ) => { startTransition(() => setIdFilmSelec(id)) };
    const close = () => { startTransition(() => setIdFilmSelec(null)) };

    if (filmes.length === 0) {
        return <p>Nenhum filme encontrado.</p>;
    }

    return (
        <div id="lista" aria-live="polite">
            <AnimatePresence mode="wait">
                { selectFilm ? OpenCard(open,close) :
                    (filmes.map((f) => (
                        <CardFilme 
                            key={f.id} 
                            filme={f} 
                            aoEditar={aoEditar} 
                            aoRemover={aoRemover} 
                        />
                )))}
            </AnimatePresence>
        </div>
    );
}

function OpenCard({ id, close }) {
    const item = filmes.find((item) => item.id === id);

    return (
        <div>
            <div className="overlay" onClick={close} />
            <div className={`card-content-container open ${item.theme || ""}`}>
                <CardContent {...item} />
            </div>
        </div>
    )
}

function CardContent({filme}) {
    return (
        <AnimateView
            name={`card-${id}`}
            transition={{
                type: spring,
                visualDuration: 0.4,
                bounce: 0.3,
            }}
        >
            <div className="card-content">
                <div className="card-image-container">
                    <img
                        className="card-image"
                        src={`/photos/app-store/${id}.jpg`}
                        alt=""
                        style={{ top, bottom, width, left }}
                    />
                </div>
                <div className="title-container">
                    <span className="h6">{category}</span>
                    <h2 className="h3">{title}</h2>
                </div>
                <div className="content-container small">{content}</div>
            </div>
        </AnimateView>
    )}
