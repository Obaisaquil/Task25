import { useState } from 'react'
import './index.css'

function App() {
    const [cart, setCart] = useState([]);

    const productDetails = [
        {
            productName: "NIKE White sport shoe",
            price: 70,
            picAdd: "product-1.avif",
        },
        {
            productName: "HERO dark gray with mix lightning shoe",
            price: 90,
            picAdd: "product-2.jpg",
        },
        {
            productName: "HERO white shoe with mix lightning effect",
            price: 50,
            picAdd: "product-3.jpg",
        },
        {
            productName: "HERO white and blue mix colored shoe",
            price: 75,
            picAdd: "product-4.jpg",
        },
        {
            productName: "HERO white and yellow shoe",
            price: 99,
            picAdd: "product-5.jpg",
        },
        {
            productName: "HERO white high neck shoe",
            price: 68,
            picAdd: "product-6.jpg",
        },
        {
            productName: "HERO max colored shoe",
            price: 120,
            picAdd: "product-7.jpg",
        },
        {
            productName: "HERO blue and dark pink shoe",
            price: 40,
            picAdd: "product-8.avif",
        },
    ];

    // Add product to cart
    const addProduct = (n) => {
        const product = productDetails[n];

        setCart((prevCart) => {
            const exists = prevCart.find(
                (item) => item.productName === product.productName
            );

            if (exists) {
                return prevCart.map((item) =>
                    item.productName === product.productName
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Increase or decrease product quantity
    const changeQuantity = (productName, amount) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.productName === productName
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Calculate total price
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <main className='min-h-screen w-full'>
                <div className="navbar sticky top-0 z-50 flex h-[8vh] gap-30 pl-[8vw] pr-[8vw] items-center bg-gray-200">
                    <div className="logo">
                        <img className="h-12.5 rounded-[50%] object-cover" src="logo.avif" alt="LOGO IMAGE" />
                    </div>

                    <div className="nav-links">
                        <ul className='flex gap-25'>
                            <li>Home</li>
                            <li>Categories</li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>

                <section className='pl-[8vw] pr-[8vw] pt-5 flex justify-between gap-25'>
                    
                    <div className="left grid grid-cols-2 gap-25">

                        {productDetails.map((product, index) => (
                            <div key={product.productName} className='text-white'>
                                <img
                                    className='h-40 w-45 object-cover rounded-xl'
                                    src={product.picAdd}
                                    alt={product.productName}
                                />

                                <div className='h-40 w-45 bg-gray-400 rounded-xl p-2 flex flex-col items-center gap-3'>
                                    <h2 className='text-sm font-medium'>
                                        {product.productName}
                                    </h2>

                                    <p>${product.price.toFixed(2)}</p>

                                    <button
                                        onClick={() => addProduct(index)}
                                        className='text-xs p-2 hover:bg-amber-800 border border-black rounded-xl'
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                   
                    <div className="right p-3 flex flex-col gap-2 bg-gray-100 w-120 h-auto fixed top-20 right-10 z-40">
                        <div>
                            <h1 className='text-lg font-medium'>Cart</h1>
                        </div>

                        <div className='pt-3 pb-3' id='table'>

                            {cart.map((item) => (
                                <div
                                    key={item.productName}
                                    className='flex gap-3 items-center justify-between pb-3'
                                >
                                    <div className='flex gap-3 items-center'>
                                        <div>
                                            <img
                                                className='h-15 w-20 object-cover'
                                                src={item.picAdd}
                                                alt={item.productName}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-3'>
                                            <h4 className='heading text-sm'>
                                                {item.productName}
                                            </h4>

                                            <p>${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-2 items-center'>
                                        <button
                                            onClick={() => changeQuantity(item.productName, -1)}
                                            className='flex items-center justify-center h-5 w-5 bg-gray-600 text-white pb-1'
                                        >
                                            −
                                        </button>

                                        <p>{item.quantity}</p>

                                        <button
                                            onClick={() => changeQuantity(item.productName, 1)}
                                            className='flex items-center justify-center h-5 w-5 bg-gray-600 text-white pb-1'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {cart.length === 0 && (
                                <p className='text-gray-500 py-3'>
                                    Your cart is empty.
                                </p>
                            )}

                        </div>

                        {/* Total price */}
                        <div className='flex justify-center border-t pt-3'>
                            <h1 className='text-lg font-medium'>
                                Total: ${total.toFixed(2)}
                            </h1>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;
