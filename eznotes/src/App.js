import React from 'react'
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  let [direc, setDirec] = useState([]);
  let [page, setPage] = useState(0);
  const [pageData, setPageData] = useState(null);
  let [to , setTo] = useState(0);
  const [loading, setLoading] = useState(true);


  function newData() {

    setData(pageData.notes[to].Names);
    setPage(page+1);

  }

  function getData() {

    axios.get('http://localhost:9000/get').then(function (response) {
      console.log('Response Data is: ',response.data[0]);

      setData(response.data[0].notes[0].Names);
      setPageData(response.data[0]);


    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }


  function next(e) {

    const too = e.currentTarget.getAttribute("name");
    console.log('to' ,too);

    if(too!=null){
      setTo(too);
      setPage(page);
    }
  }

  function back() {
    if (page >= 1){ 
    setPage(page-1);

    const popped = direc.pop();
    console.log('popped',popped);
    console.log('backArray',direc);
    const last = direc[direc.length-1];
    console.log('last',last)
    setData(pageData.notes[last].Names);
    }
    


  }

  useEffect(() => {

  }, [pageData])

  useEffect(() => {
    getData();

  }, [])

  useEffect(() => {
    if (pageData !== null)
      newData();
      const arr = direc;
      arr.push(to);
      setDirec(arr);
      console.log(arr);
  }, [to])


  function isArray(obj) {
    return !!obj && obj.constructor === Array;
  }
  function isObject(item) {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
  }

  return (
    <div className="App">

      <header>
        <h1>Welcome to EzNotes</h1>
      </header>

      <div className='pages'>
        Current Page No. {page+1}<br />


        <button type='button' onClick={back} >Back</button>

        {/* <button type='button' onClick={newData} >New Data</button> */}


        {
          data.map((names, index) => (

            <div key={index}>
              <a name = {names.to} href = {names.link} key={index} target='_blank' onClick={next}>{names.name}</a><br />
              
            </div>))
        }


        {/* {data.map((d, idx)=> ( 
           (<p key={idx}>{d.name}</p>)
        ))} */}

      </div>




    </div>
  );
}

export default App;
