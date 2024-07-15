import React, { useEffect, useRef, useState } from 'react'
// import { getAllData, saveItem } from './Function';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './config';
import Swal from 'sweetalert2';

const Form = () => {

    let name = useRef();
    let email = useRef();
    const [documents, setDocuments] = useState([]);
    const [update, setupdate] = useState({})

    let handleAdd = () => {
        let data = {
            name: name.current.value,
            email: email.current.value
        }
        if (name.current.value == "" || email.current.value == "") {
            alert("Please fill the form");
        }
        else {
            setDoc(doc(firestore, "product", `${Date.now()}`), data, { merge: true })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "user created successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
        name.current.value = ''
        email.current.value = ''
    }

    // fetch Data
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(firestore, 'product'));
            setDocuments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, [documents]);

    // remove Data
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "product", id));
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            })
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    // update Data
    const view = (id) => {
        const user = documents.find((user) => user.id === id);
        setupdate(user)
    };

    const handleUpdate = (e) => {
        setupdate({ ...update, [e.target.name]: e.target.value })
    };

    const saveFinalData = async () => {
        try {
            await updateDoc(doc(firestore, "product", update.id), update);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "data Updated successfully"
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }
    return (
        <>

            <div className="w-25 m-auto   " style={{marginTop:"20px"}}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input style={{marginLeft:"20px", marginBottom:"10px"}} type="text" class="form-control" ref={name} />

                </div>
                <div class="mb-3">
                    <label class="form-label">email</label>
                    <input style={{marginLeft:"20px"}} type="text" class="form-control" ref={email} />
                </div>
                <button style={{marginLeft:"20px", marginTop:"10px"}} type="submit" class="btn btn-primary" onClick={handleAdd}>Submit</button>
            </div>
            <table class="table caption-top text-center  border"style={{width:"100%", textAlign:'center', border:"2px solid black"}}>
                <caption>List of users</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">delete</th>
                        <th scope="col">update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        documents?.map((val, ind) => {
                            return (
                                <React.Fragment key={ind}>
                                    <tr style={{border:"2px solid black"}}>
                                        <th scope="row">{val.id}</th>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td><button onClick={() => handleDelete(val.id)}>delete</button></td>
                                        <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => view(val.id)}>update</button></td>
                                    </tr>
                                    
                                </React.Fragment>
                                
                            )
                        })
                    }

                </tbody>
            </table>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="w-100 m-auto">
                                                        <div class="mb-3">
                                                            <label class="form-label">Name</label>
                                                            <input style={{marginLeft:"20px", marginBottom:"10px"}} type="text" class="form-control" value={update.name} name="name" onChange={handleUpdate} />

                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">email</label>
                                                            <input style={{marginLeft:"20px", marginBottom:"10px"}} type="text" value={update.email} class="form-control" name="email" onChange={handleUpdate} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={saveFinalData}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        </>
    )
}

export default Form