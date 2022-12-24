import React, {useEffect, useState} from "react";
import "./Item.css";
import deleteImg from "./../../Assets/delete.svg";
import axios from "axios";

function Item({res, setReload}) {
  const [ticked, setTicked] = useState(res.isCompleted);

  const url = "http://192.168.255.180:9000/list";
   
  const clickListener = ()=>{
    if(!res.isCompleted){
      axios.put(`${url}/complete/${res._id}`).then(()=>{
        console.log("Marked as Done");
        console.log(res);
      })
      
      setReload(true);
      setTicked(true);
    }
  } 

  const deleteTask = ()=>{
    axios.delete(`${url}/del/${res._id}`).then(()=>{
      console.log("Deleted SuccessFully!!");
    })
    setReload(true);
  }

  return (
    <div className="Item">
      <div className="item_title">
        <h3>{res.title}</h3>
        <span onClick={deleteTask}>
          <img src={deleteImg} alt="" />
        </span>
      </div>

      <p>
        {res.discription}
      </p>
      <div className="item_check">
        <input type="checkbox" name="Done" id="done" checked={ticked} onChange={clickListener}/>
        <span>Done</span>
      </div>
    </div>
  );
}

export default Item;
