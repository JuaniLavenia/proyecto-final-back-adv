import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import { useMemo, useState } from 'react'
import '../App.css'
import crimeandpunishment from "../assets/crimeandpunishment.jpg"
import warandpeace from "../assets/warandpeace.jpg"
import padrericopadrepobre from "../assets/padrericopadrepobre.jpg"
import Card from '../components/Card'

type CartItem = {
  id: number
  price: number
}

initMercadoPago('TEST-8f699b05-260d-462d-a4b3-75eb84da565c');

function Home() {
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  const total = useMemo<number>(() => carrito.reduce<number>((acc, cur) => acc + cur.price, 0),[carrito])

  const addToCart = (item: CartItem) => {
    const exist = carrito.some(({ id }) => id === item.id)

    if (exist) return undefined

    setCarrito([ ...carrito, item ])
  }

  const handleCompra = () => {
    if (total === 0) {
      alert("No se puede comprar $ " + total)
      return undefined
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "price": total
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:7070/create-order", requestOptions)
      .then(response => {
        if (response.status < 300) return response.json()
      })
      .then(result => setPreferenceId(result.data.id))
      .catch(error => console.log('error', error));
  }

  return (
    <main style={{ display: 'grid', gridTemplateColumns: '1fr 300px' }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        <Card imageSrc={warandpeace} price={4500} onClick={() => addToCart({ id: 1, price: 4500 })} />
        <Card imageSrc={crimeandpunishment} price={4500} onClick={() => addToCart({ id: 2, price: 4500 })} />
        <Card imageSrc={padrericopadrepobre} />
      </section>
      <section style={{ padding: 16, borderLeft: "2px dotted white" }}>
        <h2>Carrito</h2>
        {
          carrito.map(
            item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{item.id}</p>
                <p>{item.price}</p>
              </div>
            )
          )
        }
        <hr />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p>{total}</p>
        </div>
        <button onClick={handleCompra}>Ir a pagar</button>
        {
          preferenceId && (
            <Wallet
              initialization={{ preferenceId }}
            />
          )
        }
      </section>
    </main>
  )
}

export default Home