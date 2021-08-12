import React from 'react'
import ReactDOM from 'react-dom';
import Edit from './Edit'
import Pages from './Pages'
import { useForm } from './useForm'
import axios from 'axios';
import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



function Upload() {

    const [jsondat, setjson] = useState([]);
    const [arr, setArr] = useState([]);
    const [values, handleChange] = useForm({ name: '', type: 'folder', to: 0, link: '' });
    let [pgno, setPgno] = useState(0);
    const [refresh, setRefresh] = useState(0)



    function newItem() {
        console.log('name:', values.name);
        console.log('type:', values.type)
        console.log('to:', values.to)
        console.log('url:', values.url)
        console.log('json Data:', jsondat)
        setPgno(pgno)



    }

    function create() {
        if (values.type === 'folder') {

            const name = values.name
            const link = null
            const to = values.to

            let items = {}
            items['name'] = name;
            items['link'] = link
            items['to'] = to

            jsondat.push(items)
            setjson(jsondat)
            setRefresh(Math.floor(Math.random() * 1000) + 1)
            console.log(jsondat)


        } else {
            const name = values.name
            const link = values.link

            let i = 0;
            let items = {}
            items['name'] = name
            items['link'] = link

            jsondat.push(items)
            setjson(jsondat)
            setRefresh(Math.floor(Math.random() * 1000) + 1)

            console.log(jsondat)
        }
    }

    function save() {
        arr[pgno] = jsondat
        setPgno(pgno + 1);

        setArr(arr)
        console.log(arr);
        setjson([]);

    }

    function upload() {
        axios.post('http://localhost:9000/add', { arr })
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {

        console.log('dsaa')
    }, [jsondat])


    return (
        <div>

            <p>This is Upload</p>

            <button type='button' onClick={newItem}>Tests</button>

            <input name='type' id='folder' type='radio' value='folder' onClick={handleChange} defaultChecked />
            <label htmlFor='folder'>Folder</label>

            <input name='type' id='file' type='radio' value='file' onClick={handleChange} />
            <label htmlFor='file'>File</label>
            <br />
            <label htmlFor='name'>Folder Name:</label>

            <input id='name' name='name' value={values.name} onChange={handleChange} type='text' placeholder='Folder Name' />
            <div id='input'>

                {values.type === 'folder' ?
                    <div>
                        <label htmlFor='to'>On Click Navigate to:</label>
                        <input id='to' type='number' onChange={handleChange} value={values.to} name='to' />
                    </div> :
                    <div>
                        <label htmlFor='link'>Link of URL</label>
                        <input id='link' type='text' onChange={handleChange} value={values.link} name='link' />
                    </div>
                }

            </div>

            <button type='button' onClick={create}>Create {values.type}</button>
            <button type='button' onClick={save}>Save page</button>
            <button type='button' onClick={upload}>Upload to MongoDB</button>



            <Router>
           
                <Link to='/edit'>Edit page</Link>
                <Link to='/pages'>Display all Pages</Link>

                <Switch>
                    <Route path='/edit' >
                        <Edit arr = {jsondat}/>
                    </Route>
                    <Route path='/pages'>
                        <Pages arr = {arr} />
                    </Route>
                    <Route path='/'>
                        <Edit arr = {jsondat} />
                    </Route>
                </Switch>
            </Router>


           
            






        </div>
    );


}

export default Upload;
