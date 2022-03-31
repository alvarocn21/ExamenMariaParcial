import styled from "@emotion/styled";
import axios from "axios";
import React, {FC, useState} from "react";
import { Book } from "../types";
import CuatriculaDetalles from "./CuatriculaDetalles";

const Contenedor: FC = () => {

    const buscar = async(text: string): Promise<{
        docs: Array<Book> | undefined
    }> => {
        const url: string = "http://openlibrary.org/search.json?q=" + text;
        const result = await axios.get<{docs: Array<Book>}>(url);
        return result.data;
    }

    const [searchText, setSearchText] = useState<string>("");
    const [libros, setLibros] = useState<Array<Book>> ([]);

    return (
        <GeneralDiv> <br/>¡BIENVENIDO A LA BIBLIOTECA MUNICIPAL!
            <br/> <br/>
            <input type="text" 
                value={searchText}
                placeholder="Busca algun libro."
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={async () => {
                const result = await buscar(searchText);
                if(result.docs) setLibros(result.docs);
                else <div>Ningun libro coincide con ese nombre</div>
            }}>Buscar</button> 
            {libros &&
                <CuatriculaDetalles libros={libros}/> 
            }
        </GeneralDiv>
    ) 

}

const GeneralDiv = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #5b5b5b;
`
export default Contenedor;