import React from 'react'
import interact from 'interactjs'

function Pages({ arr }) {

    const position = { x: 0, y: 0 }

    interact('.show-data').draggable({
        listeners: {
            start(event) {
                console.log(event.type, event.target)
            },
            move(event) {
                position.x += event.dx
                position.y += event.dy

                event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`
            },
        }
    })

    return (
        <div>
            {
                arr.length !== 0 ?
                    arr.map((notes) =>
                        <div className='show-data'>
                            {notes.map((obj, index) =>
                                <div key={index}>
                                    {obj.link === null ?
                                        <button name={obj.to} href={obj.link} key={obj.name} target='_blank' >{obj.name}</button>
                                        : <div className='a-div'><a name={obj.to}  key={obj.name} target='_blank' >{obj.name}</a></div>}
                                    <br />

                                </div>)}
                        </div>) : <p>Click on Save Page for showing your page</p>}
        </div>
    );

}

export default Pages

// href={obj.link}