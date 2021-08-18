import React from 'react'


function Edit({ arr }) {

    return (
        <div>
            {
                arr.length !==0 ?
                arr.map((obj, index) =>
                    <div key={index}>
                        {obj.link === null ?
                            <div><button id = 'btn' name={obj.to} href={obj.link} key={index} target='_blank' >{obj.name}</button><label htmlFor='btn'>Navigates to {obj.to}</label></div>
                            : <div className='a-div'><a name={obj.to} href={obj.link} key={index} target='_blank' >{obj.name}</a></div> }
                    </div>
                ) : <p>Add new Elements to your page</p> }
        </div>

    );

}

export default Edit