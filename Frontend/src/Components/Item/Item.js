import React, {useEffect, useState} from "react";
import "./Item.css";
import deleteImg from "./../../Assets/delete.svg";

function Item({res}) {
  const [ticked, setTicked] = useState(res.isCompleted);
   
   useEffect(() => {
     console.log("Inside: ", res);
   }, [res])
   
  const clickListener = ()=>{
    if(!res.isCompleted){
      setTicked(true);
    }
  } 

  return (
    <div className="Item">
      <div className="item_title">
        <h3>{res.title}</h3>
        <span>
          <img src={deleteImg} alt="" />
        </span>
      </div>

      <p>
        {res.discription}
      </p>
      <div className="item_check" onClick={clickListener}>
        <input type="checkbox" name="Done" id="done" checked={ticked}/>
        <span>Done</span>
      </div>
    </div>
  );
}

export default Item;
