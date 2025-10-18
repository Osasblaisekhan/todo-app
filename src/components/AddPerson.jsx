import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASEURL from './baseURL';
import axios from 'axios';
import DisplayPerson from './DisplayPerson';
import './AddPerson.css';

const AddPerson = () => {
    const [formItems, setFormItems]=useState({name:'', age:''});
    const [isEdit, setIsEdit]= useState(null);
    const [isLoading, setIsLoading]=useState(true)
  const [listPersons, setListPersons] = useState([]);
  console.log(listPersons)
  console.log(isEdit);

  // const apiURL = `${BASEURL}/person`

    const fetchPerson = async()=>{
      try{
        // setIsLoading(true);
        const fetchData = await axios.get(BASEURL);
        setListPersons(fetchData.data);
        toast.success('Task Loaded successfull',{
          position:'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
    
        });
      }catch(err){
        console.log('there is an error while fetching data', err)
        setIsLoading(false);
         toast.error('Uable to load task',{
          position:'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
    
        });
      }finally{
        setIsLoading(false)
      }
    }

    // populate form when editing an existing person
    useEffect(()=>{
      if(isEdit){
        const person = listPersons.find(p => p._id === isEdit);
        if(person){
          setFormItems({ name: person.name || '', age: person.age || '' });
        }
      } else {
        setFormItems({ name: '', age: '' });
      }
    }, [isEdit, listPersons]);

    const HandleAddPerson = async (e)=>{
      e.preventDefault();
      // basic validation
      if(!formItems.name.trim() || formItems.age === ''){
        toast.error('Please provide name and age', { position: 'top-right' });
        return;
      }

      if(formItems.age < 1){
        toast.error('Age must be greater than 0', { position: 'top-right' });
        return;
      }

      try{
        if(isEdit){
          await axios.put(`${BASEURL}/${isEdit}`, formItems);
          toast.success('Person updated successfully', { position: 'top-right' });
        } else {
          await axios.post(`${BASEURL}`, formItems);
          toast.success('Person added successfully', { position: 'top-right' });
        }
        await fetchPerson();
        setFormItems({ name: '', age: '' });
        setIsEdit(null);
      }catch(err){
        console.error('add/edit error', err);
        toast.error('Unable to complete request', { position: 'top-right' });
      }finally{
        setIsLoading(false);
      }
    }

    useEffect(()=>{
     
      fetchPerson();
      
    },[])

  return (
    <div className='container'>
      <form action="#" onSubmit={HandleAddPerson}>
  <input type="text" value={formItems.name} placeholder='Name' onChange={(e)=> setFormItems({...formItems, name:e.target.value})} />
  <input type="number" value={formItems.age} placeholder='Age' onChange={(e)=> setFormItems({...formItems, age:e.target.value})} />
        <button type='submit'>{isEdit ? 'UPDATE' : 'ADD'}</button>
      </form>
      <DisplayPerson listPersons={listPersons} isEdit={isEdit} setIsEdit={setIsEdit} isLoading={isLoading} setIsLoading={setIsLoading} fetchPerson={fetchPerson}/>
    </div>
  )
}

export default AddPerson;
