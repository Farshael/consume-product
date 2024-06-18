import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Category({titleModal}) {
    const [Categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
    }, []);

    function getCategories() {
        axios.get(`http://127.0.0.1:8000/category/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setCategories(res.data.data);
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
        "Name"
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
    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
    };

   
    const title = 'Category';
    return (
        <Case>
            <Table headers={headers} data={Categories} endpoint={endpointModal} inputData={inputData} identitasColumn={columnIdentitasDelete} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}