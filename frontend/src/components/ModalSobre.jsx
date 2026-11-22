import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import "../styles/ModalSobre.css";

const RECURSOS = [
    { icone: "add_circle",  texto: "Cadastrar e editar filmes" },
    { icone: "filter_alt",  texto: "Filtrar por status" },
    { icone: "search",      texto: "Buscar pelo título" },
    { icone: "star",        texto: "Dar notas de 1 a 5 estrelas" },
    { icone: "save",        texto: "Dados salvos no seu navegador" },
];

const EQUIPE = [
    { nome: "Henrique M. Neves da Silva",   ra: "ra134557" },
    { nome: "Hiago A. Dantas Teixeira",     ra: "ra139001" },
];

export default function ModalSobre({ aberto, aoFechar, hrefCompleto = "/sobre" }) {
    const painelRef = useRef(null);
    const reduzir = useReducedMotion();

    useEffect(() => {
        if (!aberto) return;
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = overflowAnterior;
        };
    }, [aberto, aoFechar]);

    const mola = reduzir
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 24 };

    return createPortal(
    <AnimatePresence>
        {aberto && (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduzir ? 0 : 0.2 }}
            onClick={aoFechar}
        >
            <motion.div
            ref={painelRef}
            className="modal-sobre"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-sobre-titulo"
            initial={reduzir ? false : { opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.95 }}
            transition={mola}
            onClick={(e) => e.stopPropagation()}
            >
            <div className="modal-topo">
                <span className="selo">
                <span className="material-symbols-outlined">school</span>
                Projeto da UEM
                </span>
                <button
                type="button"
                className="modal-fechar"
                onClick={aoFechar}
                aria-label="Fechar"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <h2 id="modal-sobre-titulo">Sobre o CineTrack</h2>
            <p className="modal-intro">
                Gerenciador pessoal de filmes criado na disciplina de Programação de
                Sistemas Web da Universidade Estadual de Maringá.
            </p>

            <ul className="modal-lista">
                {RECURSOS.map((r, i) => (
                <motion.li
                    key={r.icone}
                    initial={reduzir ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={reduzir ? { duration: 0 } : { ...mola, delay: 0.08 + i * 0.05 }}
                >
                    <span className="material-symbols-outlined">{r.icone}</span>
                    {r.texto}
                </motion.li>
                ))}
            </ul>

            <div className="modal-equipe">
                <p>Equipe</p>
                {EQUIPE.map((a) => (
                <span key={a.ra}>
                    {a.nome} <small>{a.ra}</small>
                </span>
                ))}
            </div>
            </motion.div>
        </motion.div>
        )}
    </AnimatePresence>,
    document.body
    );
}