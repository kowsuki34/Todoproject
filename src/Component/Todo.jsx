import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Todo() {

  const [data , setData] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [edit,setEdit] = useState(false)
  const [editId, setEditId] = useState("")

  
  const addData = () => {
      axios.post('https://todoprojectback.onrender.com/Users/post', 
        {title,description}
      )
      .then((res) => {
        setData([...data, res.data])
      })
      alert("data Added Successfully")
  }

  useEffect(()=>{
axios.get('https://todoprojectback.onrender.com/Users/get')
.then((res)=>{
  setData(res.data)
})
  },[])

const deldata = (id) => {
  axios.delete(`https://todoprojectback.onrender.com/Users/delete/${id}`)
  .then((res) => {
    setData(data.filter((i) => i._id !== id ))
  })
  alert("Deleted")

}

const update = (e) =>{
  e.preventDefault();
  axios.put(`https://todoprojectback.onrender.com/Users/put/${editId}`, 
    {title,description}
  )
  .then((res) => {
    setData(data.map((i) => i._id === editId ? res.data : i))
    alert("updated")
  })

  setTitle ("")
  setDescription ("")
  setEditId("")

}

const editData = (id) => {
  const storeData = data.find((i) => i._id === id)
  
  setTitle(storeData.Title)
  setDescription(storeData.Description)
  setEditId(id)
  setEdit(true)
  console.log(storeData,title, description,edit)
}

  return (
    <div>
      <div className='row'>

      <h1>Todo</h1>
      <div className="row cols-12">        
        <h3>Add Item</h3>
        <div className="form-group d-flex gap-2">
      <input  type="text" placeholder='Title' value={title} onChange={(e) =>  setTitle (e.target.value)}  id="" className='form-control'  />
      <input type="text" placeholder='Description'  value={description} onChange={(e) => setDescription (e.target.value)} id='' className='form-control'/>
      <button onClick={
        edit ?
        update :
        addData
      } className='btn btn-danger'>{edit ? "Update": "Send Data"}</button>
      </div>
      </div>
      </div>
      <div>
        <table >
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          <tbody>
            {
              data.map((i)=>
                <tr>
                  <td>{i.Title}</td>
                  <td>{i.Description}</td>
                  <td><button onClick={() => deldata(i._id)} className='btn btn-primary'>Delete</button></td>
                  <td><button onClick={() => editData(i._id)} className='btn btn-primary'>EDIT</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      
    </div>
  )
}














// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import {toast} from 'toast'



// export default function Todo() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [data, setData] = useState([]);
//   const [editId, setEditId] = useState(null);



//   const handleSubmit = () => {

//     const Datas = new FormData()

//     Datas.append("title", title)
//     Datas.append("description", description)

//     if (editId) {
//       axios.put(`http://localhost:3600/Users/put/${editId}`, Datas)
//         .then((res) => {
//           setData(data.map((i) => i._id === editId ? res.data : i))
//         })
//       alert("data posted")

//       setTitle("")
//       setDescription("")


//       toast("item Updated Successfully")
//     }
//     else {
//       axios.post("http://localhost:3600/Users/post", Datas)
//       .then((res) => {
//         setData([...data, res.data]);
//         toast.success("Item added successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("An error occurred while adding the item.");
//       });
    
//     }

//   }

//   if (!title || !description) {
//     toast.error("Title and Description are required!");
//     return;
//   }
  
  
//  useEffect(()=>{
//   axios.get("http://localhost:4001/Users/get")
//   .then((res) => {
//     setData(res.data);
//   })
//  } ,[]) 
  


//   const deldata = (id) => {
//     axios.delete(`http://localhost:3600/Users/delete/${id}`)
//       .then((res) => {
//         setData(data.filter((i) => i._id !== id))

//       })
//     alert("Deleted")

//   }

//   const editData = (id) => {
//     const storeData = data.find((i) => i._id === id);
//       setTitle(storeData.title);  
//       setDescription(storeData.description);  

//     setEditId(id)

//   }


//   return (
//     <div>
//       <div className="row p-3 bg-success text-light">
//         <h1>ToDo Project With MERN Stack</h1>
//       </div>
//       <div className="row">
//         <h3>Add Item</h3>
//         <div className="form-group d-flex gap-2">
//           <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  className="form-control" type="text" />
//           <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}  className="form-control" type="text" />
//           <button className="btn btn-dark" onClick={handleSubmit}>{editId ? "update" : "Send Data"}</button>
//         </div>

//         <table className='table table-hover table-bordered'>
//           <th>Title</th>
//           <th>Description</th>
//           <th>Delete</th>
//           <th>Edit</th>
//           <tbody>
//             {
//               data.map((i) =>
//                 <tr key={i._id}>
//                   <td>{i.Title}</td>
//                   <td>{i.Description}</td>
//                   <td><button className='btn btn-danger' onClick={() => deldata(i._id)}>Delete</button></td>
//                   <td><button className='btn btn-primary' onClick={() => editData(i._id)}>EDIT</button></td>
//                 </tr>
//               )
//             }
//           </tbody>
//         </table>

//       </div>
//     </div>
//   )
// }



// // import axios from 'axios';
// // import { useState, useEffect } from 'react';

// // export default function Todo() {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [data, setData] = useState([]);
// //   const [editId, setEditId] = useState(null);

// //   const handleSubmit =()=> {
// //     const Datas = new FormData();
// //     Datas.append("title", title);
// //     Datas.append("description", description);

// //     if (editId) {
// //       // PUT request to update the item
// //       axios.put(`http://localhost:3600/Users/put/${editId}`, Datas)
// //         .then((res) => {
// //           setData(data.map((i) => (i._id === editId ? res.data : i)));  // update the list with the updated data
// //           alert("Updated"); // Alert after successful update
// //         })
// //         .catch((error) => {
// //           console.error("Error updating data:", error);
// //           alert("Error updating data");
// //         });
// //     } else {
// //       // POST request to add a new item
// //       axios.post("http://localhost:3600/Users/post", Datas)
// //         .then((res) => {
// //           setData([...data, res.data]);  // Add the new item to the list
// //           alert("Item added successfully"); // Alert after successful addition
// //         })
// //         .catch((error) => {
// //           console.error("Error adding data:", error);
// //           alert("Error adding data");
// //         });
// //     }

// //     // Clear input fields after submission
// //     setTitle("");
// //     setDescription("");
// //     setEditId(null); // Reset editId to null
// //   };

// //   useEffect(() => {
// //     // Fetch the data from the API
// //     axios.get("http://localhost:3600/Users/get")
// //       .then((res) => {
// //         setData(res.data);
// //         console.log(res.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   const deldata = (id) => {
// //     // DELETE request to remove an item
// //     axios.delete(`http://localhost:3600/Users/delete/${id}`)
// //       .then((res) => {
// //         setData(data.filter((i) => i._id !== id));  // Filter out the deleted item
// //         alert("Deleted");  // Alert after successful deletion
// //       })
// //       .catch((error) => {
// //         console.error("Error deleting data:", error);
// //         alert("Error deleting data");
// //       });
// //   };

// //   const editData = (id) => {
// //     const storeData = data.find((i) => i._id === id);
// //     if (storeData) {
// //       setTitle(storeData.Title);
// //       setDescription(storeData.Description);
// //       setEditId(id);  // Set the ID for editing
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="row p-3 bg-success text-light">
// //         <h1>ToDo Project With MERN Stack</h1>
// //       </div>
// //       <div className="row">
// //         <h3>Add Item</h3>
// //         <div className="form-group d-flex gap-2">
// //           <input
// //             placeholder="Title"
// //             onChange={(e) => setTitle(e.target.value)}
// //             value={title}
// //             className="form-control"
// //             type="text"
// //           />
// //           <input
// //             placeholder="Description"
// //             onChange={(e) => setDescription(e.target.value)}
// //             value={description}
// //             className="form-control"
// //             type="text"
// //           />
// //           <button className="btn btn-dark" onClick={handleSubmit}>
// //             {editId ? "Update" : "Send Data"}
// //           </button>
// //         </div>

// //         <table className="table table-hover table-bordered">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Description</th>
// //               <th>Delete</th>
// //               <th>Edit</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {
// //               data.map((i) => (
// //                 <tr key={i._id}>
// //                   <td>{i.Title}</td>
// //                   <td>{i.Description}</td>
// //                   <td>
// //                     <button className="btn btn-danger" onClick={() => deldata(i._id)}>
// //                       Delete
// //                     </button>
// //                   </td>
// //                   <td>
// //                     <button className="btn btn-primary" onClick={() => editData(i._id)}>
// //                       Edit
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             }
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }




// // import axios from 'axios';
// // import { useState, useEffect } from 'react';
// // import { toast } from 'react-toastify'; // Import react-toastify for notifications
// // import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

// // // Initialize Toast configuration
// // toast.configure();

// // export default function Todo() {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [data, setData] = useState([]);
// //   const [editId, setEditId] = useState(null);

// //   // Handle form submit (either POST or PUT)
// //   const handleSubmit = () => {
// //     if (!title || !description) {
// //       toast.error("Title and Description are required!");
// //       return;
// //     }

// //     const Datas = new FormData();
// //     Datas.append('title', title);
// //     Datas.append('description', description);

// //     const request = editId
// //       ? axios.put(`http://localhost:3600/Users/put/${editId}`, Datas)
// //       : axios.post('http://localhost:3600/Users/post', Datas);

// //     request
// //       .then((res) => {
// //         if (editId) {
// //           setData(data.map((item) => item._id === editId ? res.data : item));
// //           toast.success('Item updated successfully!');
// //         } else {
// //           setData([...data, res.data]);
// //           toast.success('Item added successfully!');
// //         }
// //         setTitle('');
// //         setDescription('');
// //         setEditId(null); // Reset edit state
// //       })
// //       .catch((error) => {
// //         toast.error("An error occurred while processing your request.");
// //         console.error(error);
// //       });
// //   };

// //   // Fetch all items on component mount
// //   useEffect(() => {
// //     axios.get('http://localhost:3600/Users/get')
// //       .then((res) => {
// //         setData(res.data);
// //       })
// //       .catch((error) => {
// //         toast.error("Failed to fetch data.");
// //         console.error(error);
// //       });
// //   }, []);

// //   // Handle item deletion
// //   const deldata = (id) => {
// //     axios.delete(`http://localhost:3600/Users/delete/${id}`)
// //       .then(() => {
// //         setData(data.filter((item) => item._id !== id));
// //         toast.success('Item deleted successfully!');
// //       })
// //       .catch((error) => {
// //         toast.error("Failed to delete item.");
// //         console.error(error);
// //       });
// //   };

// //   // Set up data for editing
// //   const editData = (id) => {
// //     const storeData = data.find((item) => item._id === id);
// //     setTitle(storeData.title);  // Make sure the field names match the API response
// //     setDescription(storeData.description); // Make sure the field names match the API response
// //     setEditId(id);
// //   };

// //   return (
// //     <div>
// //       <div className="row p-3 bg-success text-light">
// //         <h1>ToDo Project With MERN Stack</h1>
// //       </div>

// //       <div className="row">
// //         <h3>{editId ? "Edit Item" : "Add Item"}</h3>
// //         <div className="form-group d-flex gap-2">
// //           <input
// //             placeholder="Title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="form-control"
// //             type="text"
// //           />
// //           <input
// //             placeholder="Description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             className="form-control"
// //             type="text"
// //           />
// //           <button className="btn btn-dark" onClick={handleSubmit}>
// //             {editId ? "Update" : "Add Item"}
// //           </button>
// //         </div>

// //         <table className="table table-hover table-bordered mt-3">
// //           <thead>
// //             <tr>
// //               <th>Title</th>
// //               <th>Description</th>
// //               <th>Delete</th>
// //               <th>Edit</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {
// //               data.map((item) => (
// //                 <tr key={item._id}>
// //                   <td>{item.title}</td>
// //                   <td>{item.description}</td>
// //                   <td>
// //                     <button className="btn btn-danger" onClick={() => deldata(item._id)}>
// //                       Delete
// //                     </button>
// //                   </td>
// //                   <td>
// //                     <button className="btn btn-primary" onClick={() => editData(item._id)}>
// //                       Edit
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             }
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

     
   
      
   

