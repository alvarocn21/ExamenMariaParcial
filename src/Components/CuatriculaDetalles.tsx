import styled from "@emotion/styled";
import React, {FC, useEffect, useState} from "react";
import { Book } from "../types";

const CuatriculaDetalles: FC<{libros: Array<Book>}> = ({libros}) => {
    const [librosPagina, setLibrosPagina] = useState<Array<Book>> ();

    const [indexInicio, setIndexInicio] = useState <number> (0); 
    const [indexFin, setIndexFin] = useState <number> (16); 

    useEffect(() => {
        setLibrosPagina(libros.slice(indexInicio, indexFin));
    }, [indexInicio,libros])
    
    return (
        <div>
            {indexInicio > 0 &&
                <MiBoton onClick={() => {
                    setIndexInicio(indexInicio - 16);
                    setIndexFin(indexFin - 16);
                }}>Anterior</MiBoton>
            }
            {indexInicio < (libros.length - 16) &&
                <MiBoton onClick={() => {
                    setIndexInicio(indexInicio + 16);
                    setIndexFin(indexFin + 16);
                }}>Siguiente</MiBoton>
            }
            <MiDiv>
                {librosPagina && librosPagina.map(e => {
                    return (
                        <DivDetalles key={e.key}>
                            Titulo: {e.title} <br/> 
                            Autor: {e.author_name[0]} <br/> 
                            Fecha de publicacion: {e.first_publish_year}  <br/> <br/> 
                            {e.id_amazon &&
                                <form action={`https://www.amazon.es/dp/${e.id_amazon[0]}`}>
                                    <button type="submit">Comprar en Amazon</button>
                                </form>
                            } <br/> 
                            <img src={e.isbn && `https://covers.openlibrary.org/b/isbn/${e.isbn[0]}-M.jpg`}></img> <br/>
                        </DivDetalles>
                    )
                })}
            </MiDiv>
        </div>
    )
}

const MiDiv = styled.div`
    height: 1800px;
    width: 1800px;
    background-color: burlywood;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    margin: 20px;
`

const DivDetalles = styled.div`
    height: 400px;
    width: 400px;
    margin: 20px;
    background-color: lightgrey;
`

const MiBoton = styled.button`
    margin: 10px;
    height: 30px;
    width: 100px;
    background-color: greenyellow;
`

export default CuatriculaDetalles;