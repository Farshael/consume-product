import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Product({titleModal}) {
    const [Products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
    }, []);

    function getProducts() {
        axios.get(`http://127.0.0.1:8000/product/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setProducts(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    };

    const headers = [
        "#",
        "Name",
        "Category",
        "Stock",
        "Price"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/product/{id}",
        "delete": "http://localhost:8000/product/{id}",
        "update": "http://localhost:8000/product/{id}",
        "store": "http://localhost:8000/product",
    };

    const columnIdentitasDelete = 'name';

    const inputData ={
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["PC", "PHONE"]
        },
        "stock" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "price" : {
            "tag": "input",
            "type": "numeric",
            "option": null
        },

    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stock": null,
        "price": null
    };

   
    const title = 'Product';
    return (
        <Case>
            <Table headers={headers} data={Products} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}