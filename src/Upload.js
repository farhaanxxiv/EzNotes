import React from 'react'
import { useForm } from './useForm'
import axios from 'axios';
import { useState } from 'react'



function Upload() {

    const [jsondat, setjson] = useState([]);
    const [arr, setArr] = useState([]);
    const [values, handleChange] = useForm({ name: '', type: 'folder', to: 0, link: '' });
    const [pgno, setPgno] = useState(0);
    const [refresh, setRefresh] = useState(0)
    const [pg, setPg] = useState(1)


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

            let items = {}
            items['name'] = name;
            items['link'] = link
            items['to'] = pg

            jsondat.push(items)
            setjson(jsondat)
            setPg(pg+1)
            console.log(jsondat)


        } else {
            const name = values.name
            const link = values.link

            let items = {}
            items['name'] = name
            items['link'] = link

            jsondat.push(items)
            setjson(jsondat)
            setRefresh(Math.floor(Math.random() * 1000) + 1)

            console.log(jsondat)
        }
    }

    function save(pgNo) {
        arr[pgNo] = jsondat
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

    function accessFolder(e){

        const pg = e.currentTarget.getAttribute('name')
        console.log(pg)

        save(pg)

        

        


    }
  

    return (
        <div>


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


            {
                jsondat.map((obj, index) =>
                    <div key={index}>
                        {obj.link === null ?
                            <div><button id = 'btn' name={obj.to} href={obj.link} key={index} rel="noreferrer" target='_blank' onClick ={accessFolder}>{obj.name} </button><label htmlFor='btn'>Navigates to {obj.to}</label></div>
                            : <div className='a-div'><a name={obj.to} href={obj.link} key={index} rel="noreferrer" target='_blank' >{obj.name}</a></div> }
                    </div>
                )  }



            {/* <Router>
           
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
            </Router> */}


           
            






        </div>
    );


}

export default Upload;
