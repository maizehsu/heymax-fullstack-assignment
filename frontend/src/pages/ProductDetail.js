import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`/catalog/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Inventory: {product.inventory_count}</p>
            <p>Category: {product.category}</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default ProductDetail;
