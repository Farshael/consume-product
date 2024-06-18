import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";
import { Navigate, useNavigate } from "react-router-dom";

export default function User() {
    //set = menampung value, tanpa set = menampilkan
    const [Users, setUsers] = useState([]);
    //navigate = yang ada didalam route
    const navigate = useNavigate();

    //useEffect = mejalankan suatu aksi
    useEffect(() => {
        getUsers()
    }, []);
    //kondisi [] = render diawal

    function getUsers() {
        axios.get(`http://127.0.0.1:8000/user/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    const headers = [
        "#",
        "UserName",
        "Email",
        "Role",
    ]

    const endpointModal = {
        "data_detail": "http://localhost:8000/user/{id}",
        "delete": "http://localhost:8000/user/{id}",
        "update": "http://localhost:8000/user/{id}",
        "store": "http://localhost:8000/user",
    }

    const inputData = {
        "username": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "email": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "password": {
            "tag": "input",
            "type": "password",
            "option": null
        },
        "role": {
            "tag": "select",
            "type": "select",
            "option": ["staff", "admin"]
        }
    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
    };

    const columnIdentitasDelete = 'name';
    const title = 'User';

    return (
        <Case>
            <Table headers={headers} data={Users} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}