
import React from 'react'
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import backarrow from './img/backarrow.png'

function App() {

  const [data, setData] = useState([]);
  let [direc, setDirec] = useState(['0']);
  let [page, setPage] = useState(0);
  const [pageData, setPageData] = useState(null);
  const [refresh, setRefresh] = useState(0);


  function newData(too) {

    setData(pageData.notes[too]);
    setPage(page+1);

    console.log(data)
  }

  function getData() {

    axios.get('http://localhost:9000/get').then(function (response) {
      console.log('Response Data is: ',response.data[0]);

      setData(response.data[0].notes[0]);
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

    let too = e.currentTarget.getAttribute("name");
    console.log('to' ,too);

    if(too!=null){
      setPage(page);

      if (pageData !== null){ 
        const arr = direc;
        arr.push(too);
        setDirec(arr);
        newData(too);
        console.log('test');
        
        console.log('next',direc)
        console.log(arr);
      }
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
    setData(pageData.notes[last]);
    }
    
  }


  useEffect(() => {
    getData();

  }, [])

  useEffect(()=>{
    setRefresh(Math.floor(Math.random() * 1000) + 1)

  },[data])

  return (
    <div className="App">

      <header>
        <h1>Welcome to EzNotes</h1>
      </header>

      <div className = 'whole-div'>
         <p>Page No.{page+1}</p>



         <img class = 'img-back' width = '45px' height='45px' id = 'img-back' src = {backarrow} type='button' onClick={back} />

         <div className='pages'>



        {Array.isArray(data) || null || undefined ?
          data.map((names, index) => (
          
          
            <div key={index}>
              {names.link === null ? 
              <button name = {names.to} href = {names.link} key={index} target='_blank' onClick={next}>{names.name}</button> 
              :<div className = 'a-div'><a name = {names.to} href = {names.link} key={index} target='_blank' onClick={next}>{names.name}</a></div> }
              
              <br />
              
            </div>)):<p>The Folder is Empty</p>
        }

</div>
      </div>


    </div>
  );
}

export default App;
