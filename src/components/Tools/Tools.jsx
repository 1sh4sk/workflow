import './tools.css'
import Hexagon from '../../assets/images/hexagon.png'

import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from 'react';


const toolsData = [
    {
        name: "cewl",
        category: "utilities",
        icon: Hexagon,
    },
    {
        name: "httprobe",
        category: "network",
        icon: Hexagon,
    },
    {
        name: "gowitness",
        category: "discovery",
        icon: Hexagon,
    },
];

const Tools = () => {
    const [tools, setTools] = useState(toolsData);
    const [dragItemIndex, setDragItemIndex] = useState();
    const [dragOverItemIndex, setDragOverItemIndex] = useState();

    const handleDragStart = (e, i) => {
        setDragItemIndex(i);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (i) => {
        // console.log(`position ${dragItemIndex} to ${i}`);
        const _tools = [...tools];
        const [dragItem] = _tools.splice(dragItemIndex, 1);
        // console.log(dragItemIndex, dragOverItemIndex);
        _tools.splice(i, 0, dragItem);
        setTools(_tools);
    }

    const handleDragEnter = (i) => {
        setDragOverItemIndex(i);
        // console.log(dragOverItemIndex);
    }

    const handleDragLeave = (e) => {
        setDragOverItemIndex(undefined);
    }

    const handleDragEnd = (e) => {
        setDragItemIndex(undefined);
        setDragOverItemIndex(undefined);
    }

    return (
        <div className='tools-section'>
            <div className='header'>
                <h1 className='heading'>Tools</h1>
                <div className='circle'></div>
            </div>

            {
                tools.map((tool, index) => {
                    return (

                        <div
                            key={index}
                            className={`tool-container ${dragOverItemIndex === index ? 'next-position' : ''}`}
                            draggable
                            onDragStart={(event) => handleDragStart(event, index)}
                            onDragOver={handleDragOver}
                            onDragEnter={() => { handleDragEnter(index) }}
                            onDragLeave={handleDragLeave}
                            onDrop={() => { handleDrop(index) }}
                            onDragEnd={handleDragEnd}
                        >
                            <RxDragHandleDots2 className='dots-icon drag-icon' />
                            <img src={tool.icon} alt="" className='tool-img' />
                            <div className='tool-content'>
                                <p className='tool-name'>{tool.name}</p>
                                <p className='tool-category'>{tool.category}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}
export default Tools