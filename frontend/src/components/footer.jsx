import {
    TbMovie,
    TbUsers,
    TbCode,
    TbBrandReact,
    TbBrandCss3,
    TbBrandFramerMotion,
    TbBrandNodejs,
    TbArrowRight,
} from "react-icons/tb";
import { SiExpress } from "react-icons/si";

import logoUem from "../assets/logo-uem.svg";
import ModalSobre from "./ModalSobre";
import { useState } from "react";


const AUTORES = [
    { nome: "Henrique M. Neves da Silva", ra: "ra134557", iniciais: "HN" },
    { nome: "Hiago A. Dantas Teixeira", ra: "ra139001", iniciais: "HT" },
];

const TECNOLOGIAS = [
    { nome: "React", Icone: TbBrandReact, classe: "chip-react" },
    { nome: "CSS", Icone: TbBrandCss3, classe: "chip-css" },
    { nome: "Motion.dev", Icone: TbBrandFramerMotion, classe: "chip-motion" },
    { nome: "Node.js", Icone: TbBrandNodejs, classe: "chip-node" },
    { nome: "Express", Icone: SiExpress, classe: "chip-express" }
];

export default function Footer({ hrefSobre = "/sobre" }) {
    const [sobreAberto, setSobreAberto] = useState(false);

    return (
        <footer className="footer">
        <div className="footer-topo">
            <div className="footer-marca">
            <div className="footer-logo" aria-hidden="true">
                <TbMovie size={24} />
            </div>
            <div>
                <p className="footer-nome">CineTrack</p>
                <p className="footer-slogan">Seus filmes, do seu jeito</p>
            </div>
            </div>

            <div className="footer-uem">
            <address className="footer-endereco">
                <span>Av. Colombo, 5790 - Jd. Universitário</span>
                <span>CEP 87020-900 - Maringá - PR</span>
            </address>
            {/* Troque pelo logo real: <img src="/uem-logo.png" alt="UEM" /> */}
            <span className="footer-selo" src="">
                <img src={logoUem} alt="logo-uem" />
            </span>
            </div>
        </div>

        <div className="footer-cartoes">
            <section className="footer-cartao" aria-labelledby="titulo-autores">
            <h2 className="footer-cartao-titulo" id="titulo-autores">
                <TbUsers size={16} aria-hidden="true" />
                Autores
            </h2>
            <ul className="footer-autores">
                {AUTORES.map((autor, i) => (
                <li className="footer-autor" key={autor.ra}>
                    <span
                    className={`footer-avatar ${i % 2 === 1 ? "alt" : ""}`}
                    aria-hidden="true"
                    >
                    {autor.iniciais}
                    </span>
                    <span>
                    <span className="footer-autor-nome">{autor.nome}</span>
                    <span className="footer-autor-ra">{autor.ra}</span>
                    </span>
                </li>
                ))}
            </ul>
            </section>

            <section className="footer-cartao" aria-labelledby="titulo-tecnologias">
            <h2 className="footer-cartao-titulo" id="titulo-tecnologias">
                <TbCode size={16} aria-hidden="true" />
                Tecnologias
            </h2>
            <ul className="footer-chips">
                {TECNOLOGIAS.map(({ nome, Icone, classe }) => (
                <li className={`footer-chip ${classe}`} key={nome}>
                    <Icone size={16} aria-hidden="true" />
                    {nome}
                </li>
                ))}
            </ul>
            <p className="footer-nota">
                Páginas, layout responsivo e filtros interativos.
            </p>
            </section>
        </div>

        <div className="footer-base">
            <span>CineTrack - UEM | Direitos © 2026</span>
            <a className="footer-link" 
            href={hrefSobre}
            onClick={(e) => {
            e.preventDefault();
            setSobreAberto(true);
            }}>
            Sobre o CineTrack
            <TbArrowRight size={14} aria-hidden="true" />
            </a>
            <ModalSobre aberto={sobreAberto}
            aoFechar={() => setSobreAberto(false)} 
            hrefCompleto={hrefSobre}/>
        </div>
        </footer>
    );
}
