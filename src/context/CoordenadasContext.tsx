import React, { createContext, useState } from 'react';




export const CoordenadasContext = createContext({} as any);


export const CoordenadasProvider = ({children}: any) => {

    const [emitirCoordenada, setEmitirCoordenada] = useState(true)
    const [idIntervalo, setIdIntervalo] = useState(0)

    const compartirCoordenadas = () => {
        setEmitirCoordenada(false)
      }

    const noCompartirCoodrenadas = () => {
        setEmitirCoordenada(true)
    }
    const saveIntervalo = (id: number) => {
        setIdIntervalo(id)
    }


    return (
        <CoordenadasContext.Provider value={{
            emitirCoordenada,
            idIntervalo,
            compartirCoordenadas,
            noCompartirCoodrenadas,
            saveIntervalo,
        }}>
            { children }
        </CoordenadasContext.Provider>
    )
 }

