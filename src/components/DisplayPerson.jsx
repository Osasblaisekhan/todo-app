import React from 'react'
import './Display.css'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import BASEURL from './baseURL';
import axios from 'axios'
const DisplayPerson = ({listPersons, isEdit, setIsEdit,  isLoading, setIsLoading, fetchPerson}) => {


const HandleEdit = (id)=>{
    setIsEdit(id)
}
const HandleDelete = async (id) => {
    confirmAlert({
        title: 'Delete',
        message: 'Are you sure you want to delete this person?',
        buttons: [
            {
                label: 'Delete',
                onClick: async () => {
                    try {
                        await axios.delete(`${BASEURL}/${id}`);
                        toast.success('Task deleted successfully', {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
        
                        await fetchPerson();
                        
                    } catch (err) {
                        console.error('Delete error:', err.response ? err.response.data : err.message);
                        toast.error('Unable to delete task', {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } finally {
                        setIsLoading(false);
                    }
                }
            },
            {
                label: 'Cancel',
                onClick: () => {}, // No action on cancel
            }
        ]
    });
};
  return (
    <div className='container'>
     {
        isLoading ? (
            <h4>Loading Task please Be Patient...</h4>
        ): (
            <div className='person-container'>
                 {
        listPersons.map((p)=>
            <div key={p._id} className='person'>
                <h3>My name is {p.name} and I am {p.age} years old</h3>

                <div className='button-container'>
                    <FaEdit  onClick={()=>HandleEdit(p._id)} disabled={isLoading} size={20} color='green'/>
                    <FaTrash onClick={()=>HandleDelete(p._id)} disabled={isLoading} size={20} color='red'/>
                </div>
            </div>
        )
      }
            </div>
        )
     }
    </div>
  )
}

export default DisplayPerson
