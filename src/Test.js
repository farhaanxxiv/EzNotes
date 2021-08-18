import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from './useForm'
import axios from 'axios';


function Test() {


    const [jsondat, setjson] = useState([])
    const [currentPage, setPage] = useState(0)

    const [arr, setArr] = useState([])
    const [pg, setPg] = useState(1)
    const [editing, setEditing] = useState(0)
    let [direc, setDirec] = useState(['0']);
    const [refresh, setRefresh] = useState(0)
    const [values, handleChange] = useForm({ name: '', type: 'folder', to: 0, link: '', id: '' })



    function getData() {

        setPage(0)
        setDirec(['0'])
        axios.get('http://localhost:9000/' + values.id).then(function (response) {
            console.log('Response Data is: ', response.data[0]);

            setjson(response.data[0].notes[0]);
            setArr(response.data[0].notes);
            setPg(response.data[0].pages)

        })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });

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
            setPg(pg + 1)
            console.log('Folder Created')


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


    function save(to, dataType) {

        setEditing(to)
        arr[editing] = jsondat
        setArr(arr)

        console.log('save function to:', to)

        if(arr[to]===null){
            setjson([])

        }
        else{ 

        if (arr[to] === (undefined )) {
            console.log('undefined')
            setjson([])


        } else {
            console.log('filled')
            setjson(arr[to])

        }

       


        if (dataType !== null) {
            setPage(currentPage + 1)
            const direcArr = direc
            direcArr.push(to)
            setDirec(direcArr)


        }
        console.log('to', to)
        console.log(arr)
    }

    }

    useEffect(() => {
        console.log('Editing changed to', editing)

    }, [editing])



    function accessFolder(e) {
        const to = e.currentTarget.getAttribute('name')

        save(to, 'type')
    }


    function back() {

        if (currentPage >= 1) {
            setPage(currentPage - 1);
            direc.pop();
            const last = direc[direc.length - 1];
            setEditing(last)
            console.log('last in array of back:', last)
            save(last, null)
            setjson(arr[last]);
        }
    }

    function tests() {

        console.log('editing', editing)
        console.log('pg', pg)
        console.log(direc)
        console.log(arr)
        console.log('jsondat', jsondat)


    }


    function deleteEl(e) {

        const ind = e.currentTarget.getAttribute('indx')

        if (window.confirm('Are you sure you want to delete this?')) {
            jsondat.splice(ind, 1)
            setjson(jsondat)
            setRefresh(Math.floor(Math.random() * 1000) + 1)
          } 

        


    }


    function changeEl(e) {

        const indx = e.currentTarget.getAttribute('indx')

        const inpt = prompt('Enter the index you want to change with')

        if(inpt!==null){ 

        const temp = jsondat[indx]
        jsondat[indx] = jsondat[inpt]
        jsondat[inpt] = temp

        setjson(jsondat)
        setRefresh(Math.floor(Math.random() * 1000) + 1)

        console.log(jsondat)
        }
    }


    function changeName(e) {

        const indx = e.currentTarget.getAttribute('indx')

        const name = prompt('Enter New Name')
        if(name!==null){ 

        jsondat[indx].name = name

        setjson(jsondat)
        setRefresh(Math.floor(Math.random() * 1000) + 1)
        }


    }


    function changeLink(e) {

        const indx = e.currentTarget.getAttribute('indx')

        const link = prompt('Enter New Link')
        if(link!==null){ 
        jsondat[indx].link = link

        setjson(jsondat)
        setRefresh(Math.floor(Math.random() * 1000) + 1)
        }



    }


    function upload() {



        axios.post('http://localhost:9000/add', { arr, pg })
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
    }

    function update() {

        let id = ''

        if (values.id !== '') {
            id = values.id

            axios.post('http://localhost:9000/update', { arr, pg, id })
                .then(function (response) {
                    alert('Document Uploaded')
                    console.log(response);
                }).catch(function (error) {
                    alert('Upload Error', error)

                    console.log(error);
                })

        } else {
            alert('Id is empty')
        }
    }


    return (
        <div>

            <input name='id' value={values.id} onChange={handleChange} type='text' placeholder='Enter id' />
            <button type='button' onClick={getData}>Call id</button>
            <br />

            <input name='type' id='folder' type='radio' value='folder' onClick={handleChange} defaultChecked />
            <label htmlFor='folder'>Folder</label>

            <input name='type' id='file' type='radio' value='file' onClick={handleChange} />
            <label htmlFor='file'>File</label>
            <br />
            <label htmlFor='name'>Folder Name:</label>

            <input id='name' name='name' value={values.name} onChange={handleChange} type='text' placeholder='Folder Name' />


            {values.type === 'folder' ?
                <div>
                    {/* <label htmlFor='to'>On Click Navigate to:</label>
                        <input id='to' type='number' onChange={handleChange} value={values.to} name='to' /> */}
                </div> :
                <div>
                    <label htmlFor='link'>Link of URL</label>
                    <input id='link' type='text' onChange={handleChange} value={values.link} name='link' />
                </div>
            }

            <button type='button' onClick={create}>Create {values.type}</button>
            <button type='button' onClick={back}>Back</button>
            <button type='button' onClick={tests}>Tests</button>
            <button type='button' onClick={upload}>Upload</button>
            <button type='button' onClick={update}>Update</button>


            <p>{currentPage}</p>

            {
                jsondat.map((obj, index) =>
                    <div key={index}>
                        {obj.link === null ?
                            <div><button id='btn' name={obj.to} href={obj.link} key={index} indx={index} rel="noreferrer" target='_blank' onClick={accessFolder}>{obj.name} </button><label htmlFor='btn'>Navigates to {obj.to}</label><button indx={index} onClick={deleteEl}>X</button><button indx={index} onClick={changeName}>Edit Name</button><button indx={index} onClick={changeEl}>C</button></div>
                            : <div className='a-div'><a name={obj.to} href={obj.link} key={index} indx={index} rel="noreferrer" target='_blank' >{obj.name}</a><button indx={index} onClick={deleteEl}>X</button><button indx={index} onClick={changeLink}>Edit Link</button><button indx={index} onClick={changeName}>Edit Name</button><button indx={index} onClick={changeEl}>C</button></div>}
                    </div>
                )}

        </div>
    );



}


export default Test