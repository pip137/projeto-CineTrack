export const filmesIniciais = [
    { id: 1, titulo: "A Origem",              ano: 2010, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",  nota: 5, status: "assistido",  comentario: "Revejo sempre." },
    { id: 2, titulo: "Parasita",              ano: 2019, genero: "suspense", poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/bNGW8zYA91VqTZfV3jnKHPEKKvB.jpg",  nota: 4, status: "assistido",  comentario: "" },
    { id: 3, titulo: "O Auto da Compadecida", ano: 2000, genero: "comedia",  poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/y3IhuITELtprMhUd7bccu629rba.jpg",  nota: 5, status: "assistido",  comentario: "Clássico nacional." },
    { id: 4, titulo: "Duna: Parte Dois",      ano: 2024, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/VMy4UGsI2u3f4fALGeCqCdsQBb.jpg",   nota: 4, status: "assistindo", comentario: "" },
    { id: 5, titulo: "Interestelar",          ano: 2014, genero: "ficcao",   poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/tR1XVa5bxgdh2bRw2u0DzrgkO2l.jpg",  nota: 5, status: "quero",      comentario: "" },
    { id: 6, titulo: "Cidade de Deus",        ano: 2002, genero: "drama",    poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",  nota: 4, status: "quero",      comentario: "" },
];

export function gerarId(lista) {
    return Math.max(0, ...lista.map((f) => f.id)) + 1;
}