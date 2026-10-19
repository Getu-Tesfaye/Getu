

export default async function orderPage({params}) {

    const {id} = await params

    const response = await fetch(`http://localhost:3000/api/orders/${id}`)

    const order = await response.json()

    return (

        <main>

            <h1>order {order.id}</h1>
            
            <orderStatus id={id} 
            initialOrder={order}/>
            
        </main>
    )
}