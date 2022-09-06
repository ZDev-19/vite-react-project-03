import styled from "@emotion/styled"

const Cotizado = styled.div`
    color: #FFF;
    font-family: 'Lato' , sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Texto = styled.p`
     font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`
const Imagen = styled.img`
    display: block;
    width: 150px;
`


const Cotizacion = ({ cotizacion }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion
    
    return (
        <Cotizado>
            <Imagen src={`https://cryptocompare.com${IMAGEURL}`} />
            <div>
                <Precio>El Precio es de: <span>{PRICE}</span></Precio>
                <Texto>El Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>El Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima Actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
            
        </Cotizado>
    )
}

export default Cotizacion