"use client"

import * as motion from "motion/react-client"
import { useEffect, useState } from "react"

export default function Header({ busca, aoBuscar, aoAdicionar }) {
    const [isOn, setIsOn] = useState(false)
    const toggleSwitch = () => setIsOn(!isOn)

    useEffect(() => {
        document.documentElement.dataset.theme = isOn ? "light" : "dark",[isOn]
    })

    return (
        <header>
            <div className="logo">
                <span className="material-symbols-outlined" id="animated_images">animated_images</span>
                <h1>CineTrack</h1>
            </div>
            
            <div className="search">
                <span className="material-symbols-outlined" id="search">search</span>
                <input type="search" aria-label="Buscar filme" placeholder="Busque um filme"
                    value={busca} onChange={(e) => aoBuscar(e.target.value)}/>
            </div>
            
            <button className="btn" onClick={aoAdicionar}>
                + Adicionar
            </button>
            
            <button 
                className="btn" 
                id="btn-tema" 
                type="button"
                style={{
                    justifyContent: "flex-" + (!isOn? "start" : "end"),
                }}
                aria-label="Ativar modo claro"
                onClick={toggleSwitch}>
                    <motion.div 
                        id="bol-tema"
                        style={{ height: "fit-content",}}
                        layout
                        transition={{
                            type: "spring",
                            visualDuration: 0.2,
                            bounce: 0.2,
                        }}>
                        <span 
                            className="material-symbols-outlined" 
                            id="icon-tema"
                        > {!isOn ? "dark_mode" : "light_mode"} </span>
                    </motion.div>
            </button>
        </header>
    );
}