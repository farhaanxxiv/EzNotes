
import React from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import backarrow from './img/backarrow.png'
import { useForm } from './useForm'


function App() {



  const [data, setData] = useState([]);
  let [direc, setDirec] = useState([{ name: '', pg: 0 }]);
  let [page, setPage] = useState(0);
  const [pageData, setPageData] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [currentFolder, setFolder] = useState('')
  const [loading, setLoading] = useState(true)
  const [values, handleChange] = useForm({ search: '' })
  const [searched, setSearched] = useState([])

  const id = process.env.REACT_APP_FIREBASE
  const app = initializeApp(JSON.parse(id));
  getAnalytics(app);

  function newData(too) {

    setData(pageData.notes[too]);
    setPage(page + 1);
  }

  function search() {
    let arr = []

    if (loading === false) {
      let note = pageData.notes

      note.forEach((names, index) => {
        if (pageData.notes[index] !== null) {
          pageData.notes[index].forEach((element, index, array) => {
            arr.push(element)
          })
        }
      })
    }
    let s = []
    arr.forEach((element, index) => {
      let bool = element.name.toUpperCase().search(values.search.toUpperCase())
      if (bool !== -1) {
        s.push(arr[index])
      }
    })
    setSearched(s)
  }

  useEffect(() => {
    search()
  }, [values.search])

  function next(e) {

    let too = e.currentTarget.getAttribute("name");
    const name = e.target.getAttribute('title')
    setFolder(name)

    if (too != null) {
      setPage(page);

      if (pageData !== null) {

        const arr = direc;

        let obj = {}

        obj['name'] = name
        obj['pg'] = too

        arr.push(obj);

        setDirec(arr);
        newData(too);
      }
    }
  }

  function back() {

    if (page === 1) {
      setFolder('')
    }
    if (page >= 1) {
      setPage(page - 1);
      direc.pop();
      const last = direc[direc.length - 1].pg;
      setFolder(direc[direc.length - 1].name)
      setData(pageData.notes[last]);
    }

  }
  useEffect(() => {

    const reactApi = process.env.REACT_APP_API;

    axios.request({
      method: "get",
      url: reactApi,
      crossDomain: true
    }).then(function (response) {

      setData(response.data[0].notes[0]);
      setPageData(response.data[0]);
      setLoading(false)
      //setRefresh(Math.floor(Math.random() * 1000) + 1)

    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }, [])

  useEffect(() => {
    setRefresh(Math.floor(Math.random() * 1000) + 1)

  }, [data])

  return (
    <div className="App">

      <header>
        <h1>EzNotes</h1>
      </header>

      <input className='search' name='search' value={values.search} onChange={handleChange} type='text' placeholder='Search' />

      { loading ? <div className='spinner'>
        <div className="loadingio-spinner-ellipsis-js28swoqlzo">
          <div className="load-spinner">
            <div></div><div></div><div></div><div></div><div></div>
          </div></div>
      </div>
        :
        (values.search !== '' ?
          <div className='search-div'>
            <h2>Searched Items</h2>

            {searched.map((name, index) => (
              <div className='search-div'>
                <div key={index}>
                  {name.link === null ?
                    <button name={name.to} href={name.link} key={index} title={name.name} rel="noreferrer" target='_blank' onClick={next}>{name.name}</button>
                    : <div className='a-div'><a name={name.to} href={name.link} key={index} rel="noreferrer" target='_blank' onClick={next}>{name.name}</a></div>}

                  <br />

                </div>
              </div>
            ))

            }

          </div> :
          <div className='whole-div'>
            <p>Page No.{page + 1}</p>

            {currentFolder !== '' ? <p>Current Folder:{currentFolder}</p> : <p></p>}

            <img alt='back-icon' className='img-back' width='45px' height='45px' id='img-back' src={backarrow} type='button' onClick={back} />

            <div className='pages'>

              {Array.isArray(data) || null || undefined ?
                data.map((names, index) => (


                  <div key={index}>
                    {names.link === null ?
                      <button name={names.to} href={names.link} key={index} title={names.name} rel="noreferrer" target='_blank' onClick={next}>{names.name}</button>
                      : <div className='a-div'><a name={names.to} href={names.link} key={index} rel="noreferrer" target='_blank' onClick={next}>{names.name}</a></div>}

                    <br />

                  </div>)) : <p>The Folder is Empty</p>
              }

            </div>
          </div>
        )
      }

    </div>
  );
}

export default App;
