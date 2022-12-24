import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Item from "./Components/Item/Item";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    minWidth: "20%"
  },
};

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setVisible(false);
  }

  const getData = () => {
    try {
      axios.get("http://192.168.255.180:9000/list/").then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsLoaded(true);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(isLoaded, "data: ", data);
  }, [data]);

  const onSubmit = ()=>{
    if(title==""){
      console.log("Title Cannot be Null");
      return;
    }

    
  }

  const handleTitleChange = () =>{ 
    setTitle(e.target.value);
  }

  const handleDesChange = (e) =>{
    setDesc(e.target.value);
  }

  const onKeyPress = (event)=>{
    if(event.key=="Enter"){
      onSubmit();
    }
  }

  return (
    <div className="App">
      <Header setVisible={setVisible} />
      <div className="App_container">
        <div className="left_container">
          <span>View Completed</span>
          <span>View Uncompleted</span>
          <span>Clear Completed</span>
        </div>

        <div className="right_container">
          {isLoaded ? (
            data.map((res) => (
              <span>
                <Item res={res} key={res._id} />
              </span>
            ))
          ) : (
            <>Loading......</>
          )}
        </div>
      </div>

      <Modal
        isOpen={isVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="appModal">
          <div className="appTopContainer">
            <span onClick={closeModal}>Cancel</span>
            <span className="appAddBtn" onClick={onSubmit}>Add</span>
          </div>
          <form className="appForm">
            <span>Title</span>
            <input
              placeholder="add a title..."
              className="appTitleInput"
              required
              value={title}
              onChange= { handleTitleChange}
              onKeyDown = {onKeyPress}
            />
            <span>Description</span>
            <input
              placeholder="add a description..."
              className="appDescInput"
              value={desc}
              onChange = {handleDesChange}
              onKeyDown = {onKeyPress}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
