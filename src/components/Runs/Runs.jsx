import { useState } from 'react';
import './runs.css'

import { HiDotsHorizontal } from "react-icons/hi";


const runs = [
    {
        name: "Run 1",
        time: 2,
        status: "completed"
    },
    {
        name: "Run 2",
        time: 2,
        status: "failed"
    },
    {
        name: "Run 3",
        time: 2,
        status: "pending"
    },
];

const Runs = () => {

    const [clicked, setClicked] = useState(null);

    const handleClick = (index) => {
        setClicked(index);
    }

    return (
        <div className='runs-section'>
            <div className='header'>
                <h1 className='heading'>Runs</h1>
            </div>

            {
                runs.map((run, index) => {
                    return (
                        <div key={index} className={`run-container ${clicked === index ? ' clicked' : ''}`} onClick={() => { handleClick(index) }}>

                            <div className='run-body'>
                                <div className='run-name-status'>
                                    <p className='run-name'>{run.name}</p>
                                    <p className={
                                        run.status === "completed" ? 'run-status completed' :
                                            run.status === "failed" ? 'run-status failed' :
                                                run.status === "pending" ? 'run-status pending' :
                                                    'run-status'
                                    }>{run.status}</p>
                                </div>
                                <p className='run-content'>
                                    started {run.time} hours ago
                                </p>
                            </div>

                            <HiDotsHorizontal className='dots-icon' />

                        </div>
                    )
                })
            }
        </div>
    )
}
export default Runs