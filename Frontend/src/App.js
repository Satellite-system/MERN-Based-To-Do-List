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
    minWidth: "20%",
  },
};

function App() {
  const [data, setData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [unCompData, setUnCompData] = useState([]);
  const [toShow, setToShow] = useState('data');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [reload, setReload] = useState(false);

  const url = "http://192.168.255.180:9000/list";

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
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
    setReload(false);
    setToShow('data');
  }, [reload]);

  const onSubmit = () => {
    if (title == "") {
      console.log("Title Cannot be Null");
      return;
    }

    const data = {
      title: title,
      discription: desc,
    };
    axios.post(`${url}/add`, data).then(() => {
      console.log("Task Added Successfully");
      getData();
      setVisible(false);
    });


    setTitle("");
    setDesc("");
    setReload(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDesChange = (e) => {
    setDesc(e.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      onSubmit();
    }
  };

  const viewCompleted = () => {
    setIsLoaded(false);
    const list = [];

    data.forEach((res) => {
      if (res.isCompleted) {
        console.log(res);
        list.push(res);
      }
    });

    setCompData(list);
    setToShow("Completed");
    setIsLoaded(true);
  };
  const viewUncompleted = () => {
    setIsLoaded(false);
    const list = [];

    data.forEach((res) => {
      if (!res.isCompleted) {
        console.log(res);
        list.push(res);
      }
    });

    setUnCompData(list);
    setToShow("UnCompleted");
    setIsLoaded(true);
  };
  const clrComp = () => {
    setIsLoaded(false);

    data.forEach((res) => {
      if (res.isCompleted) {
        axios.delete(`${url}/del/${res._id}`).then(()=>{
          console.log("Deleted SuccessFully!!");
        })
      }
    });
    
    setIsLoaded(true);
    setReload(true);
  };

  return (
    <div className="App">
      <Header setVisible={setVisible} setReload={setReload} />
      <div className="App_container">
        <div className="left_container">
          <span onClick={viewCompleted}>View Completed</span>
          <span onClick={viewUncompleted}>View Uncompleted</span>
          <span onClick={clrComp}>Clear Completed</span>
        </div>

        <div className="right_container">

          {isLoaded ? (
            toShow=='data' ? (
              data.length==0?(<>No Task Added to the List.</>):(
              data.map((res) => (
                <span>
                  <Item res={res} key={res._id} setReload={setReload} />
                </span>
              ))
              )
            ) :(toShow=="Completed"?(
                compData.length==0?(<>No Completed Task Available.</>):
              (compData.map((res) => (
                <span>
                  <Item res={res} key={res._id} setReload={setReload} />
                </span>
              )))
            ):(
              unCompData.length==0 ?(<>No UnCompleted Task Available.</>):(
              unCompData.map((res) => (
                <span>
                  <Item res={res} key={res._id} setReload={setReload} />
                </span>
              )))
            ))
          ): (<>Loading...</>)}
        </div>
      </div>

      <Modal
        isOpen={isVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="appModal">
          <div className="appTopContainer">
            <span onClick={closeModal}>Cancel</span>
            <span className="appAddBtn" onClick={onSubmit}>
              Add
            </span>
          </div>
          <form className="appForm">
            <span>Title</span>
            <input
              placeholder="add a title..."
              className="appTitleInput"
              required
              value={title}
              onChange={handleTitleChange}
              onKeyDown={onKeyPress}
            />
            <span>Description</span>
            <input
              placeholder="add a description..."
              className="appDescInput"
              value={desc}
              onChange={handleDesChange}
              onKeyDown={onKeyPress}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
