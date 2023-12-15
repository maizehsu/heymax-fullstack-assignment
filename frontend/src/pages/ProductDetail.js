import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`/catalog/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.inventory_count}</p>
            <p>{product.category}</p>
        </div>
    );
}

export default ProductDetail;
