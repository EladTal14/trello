import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

const gBoard = {
    "board": {
        "_id": "b101",
        "title": "Robot dev proj",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {},
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Todos",
                "cards": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "In Progress",
                "cards": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c1089sdasd",
                        "title": "Go to sleep"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "a comment",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "title": "To Do 1",
                                        "isDone": false,
                                        "id": "212jX"
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labels": [
                            {
                                "id": "101",
                                "title": "done",
                                "color": "#61bd4f"
                            }
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g103",
                "title": "Done",
                "cards": [
                    {
                        "id": "c1089",
                        "title": "eat cupcake"
                    },
                    {
                        "id": "c10894",
                        "title": "eat soup",
                        "description": "3 cups of oil",
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "title": "To Do 1",
                                        "isDone": false,
                                        "id": "212jX"
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labels": [
                            {
                                "id": "101",
                                "title": "done",
                                "color": "#61bd4f"
                            }
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "card": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    },
    "user": [
        {
            "_id": "u101",
            "fullname": "Adir Hagag",
            "username": "abasdasdi@ababmi.com",
            "password": "123",
            "imgUrl": "http://some-img.jpg"
        },
        {
            "_id": "u102",
            "fullname": "Elad Tal",
            "username": "abasdi@ababmi.com",
            "password": "123",
            "imgUrl": "http://some-img.jpg"
        },
        {
            "_id": "u103",
            "fullname": "Basya Kritchker",
            "username": "abasdasdi@ababmi.com",
            "password": "123",
            "imgUrl": "http://some-img.jpg"
        }
    ]
}

export const boardService = {
    query,
    remove,
    save,
    getBoardById

}


const baseUrl = 'http://localhost:3030/api/board';

async function query(boardId) {
    // const res = await axios.get(`${baseUrl}/${boardId}`);
    // return res.data;
    return gBoard.board
}

function remove(boardId) {
    return axios.delete(`${baseUrl}/${boardId}`)
}


async function save(board) {
    if (board._id) {
        return axios.put(`${baseUrl}/${board._id}`, board)
    }
    else {
        const res = await axios.post(`${baseUrl}`, board);
        const savedBoard = res.data;
        return savedBoard;
    }
}

async function getBoardById(boardId) {
    const res = await axios.get(`${baseUrl}/${boardId}`);
    return res.data;
}


