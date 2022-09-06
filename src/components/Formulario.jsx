import styled from '@emotion/styled'
import {useEffect, useState} from 'react'
import { monedas } from '../data/monedas'
import useSelectMonedas from '../hooks/useSelectMonedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 25px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Alerta = styled.div`
    padding: 2rem 2rem;
    max-width: 80%;
    margin: 0 auto;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.8rem;
    text-align: center;
    background-color: #b91c1c;
    color: #fff;
    font-family: 'Lato', sans-serif;
`

const Formulario = ({setMonedas}) => {

    /*Datos de la API*/ 
    const [criptos, setCriptos] = useState([])
    
    //Elementos de los hooks de seleccion
    const [moneda , SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [cripto, SelectCripto] = useSelectMonedas('Elige tu criptomoneda',criptos)

    //Error
    const [error , setError] = useState(false)

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const datos = await fetch(url)
            const resultado = await datos.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto
            })
            setCriptos(arrayCriptos)
        }
        consultarApi()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([moneda, cripto].includes('')) {
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 1000)
            return
        }

        setMonedas({
            moneda,
            cripto
        })
    }

    console.log(moneda)
    return (
        <form
            onSubmit={handleSubmit}
        >   
            {
                error &&
                <Alerta>Todos los campos son obligatorios</Alerta>
            }

            <SelectMonedas />

            <SelectCripto/>

            <InputSubmit
                type="submit"
                value="Cotizar"
            />
        </form>
    )
}

export default Formulario