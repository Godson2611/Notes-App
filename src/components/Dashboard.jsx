/** @format */

import React, { useContext, useEffect, useState } from "react";
import Create from "./Create";
import { CardDataContext } from "./context/CardContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  let navigate = useNavigate();
  let { API_URL } = useContext(CardDataContext);
  let [card, setCard] = useState([]);

  const handleDelete = async (index, id) => {
    let updatedCard = [...card];
    updatedCard.splice(index, 1);
    setCard(updatedCard);
    try {
      let res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        toast.success("Data Deleted");
        getData();
      }
    } catch (error) {
      toast.error("Deleted Error Occurred");
    }
  };

  const getData = async () => {
    try {
      let res = await axios.get(API_URL);
      if (res.status === 200) {
        setCard(res.data);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, [API_URL]);

  const handleEdit = (index) => {
    navigate(`/edit/${index}`);
  };

  return (
    <>
      <div className='col-md-9 dashboard'>
        <Create getData={getData} />
        <div className='cards-container'>
          <h2>
            <i className='fa-regular fa-note-sticky'></i>  My Notes
          </h2>
          <h4>Recently viewed</h4>
          <div className='cards gap-3 d-flex flex-row flex-nowrap overflow-x-auto w-100 mb-4'>
            {card.map((e, i) => (
              <div className='col' key={e.id}>
                <div className='card rounded-4'>
                  <div className='card-heading d-flex justify-content-between'>
                    <div className='title'>{e.title}</div>
                    <div className='icon d-flex gap-3 p-2'>
                      <i
                        className='fas fa-pen-to-square'
                        onClick={() => {
                          handleEdit(i);
                        }}
                      ></i>
                      <i
                        className='fas fa-trash-can'
                        onClick={() => {
                          handleDelete(i, e.id);
                        }}
                      ></i>
                    </div>
                  </div>
                  <p className='lorem'>{e.content}</p>
                  <span>5 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
