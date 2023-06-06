import React, {useState} from "react";

interface IProduct {
    code: string
    description: string
    price?: number
    key: string
}
export const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([
        {
            code: "10",
            description: "keyboard",
            price: 100,
            key: "1"
        },
    ])

    const add = () => {
        setProducts((prevState) => [
            ...prevState, {
            code: "",
            description: "",
            price: undefined,
            key: (Date.now()).toString()
        },
        ])
    }

    const remove = (key: string) => {
        setProducts(prevState => prevState.filter(product => product.key !== key))
    }

    const handleInputChange = (key: string, event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        setProducts(prevState => {
            const newState = prevState.map((product) => {
                if(product.key === key && event) {
                    return {
                        ...product,
                        [event.target.name]: event.target.value
                    }
                }
                return product
            })
            return newState
        })
    }

    return (
        <div>
            <h2>Products</h2>
            {products.map((product, index) => (
                <div key={product.key} className="row">
                    {index + 1}
                    <input
                        type="text"
                        placeholder="Code"
                        name="code"
                        value={product.code}
                        onChange={(event) => handleInputChange(product.key, event)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={product.description}
                        onChange={(event) => handleInputChange(product.key, event)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={product.price}
                        onChange={(event) => handleInputChange(product.key, event)}
                    />
                    <button
                        onClick={() => remove(product.key)}
                        className="delete"
                    >
                        Delete
                    </button>
                </div>
            ))}

            <button onClick={add} className="add">Add</button>

            <pre>
                <code>{JSON.stringify(products, null, 2)}</code>
            </pre>
        </div>
    )
}