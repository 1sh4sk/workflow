import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import './customNodes.css'

import Hexagon from '../../assets/images/hexagon.png'

const handleStyle = { left: 10 };

const CustomNodes = ({ data, isConnectable }) => {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);


    return (
        <div className='custom-node '>

            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ right: 30, top: "43%" }}
                isConnectable={isConnectable}
            />
            <div className='node-content'>
                <img src={Hexagon} alt="" />
                <div>
                    {/* <label htmlFor="text">Text:</label> */}
                    <input id="text" name="text" onChange={onChange} className="nodrag" placeholder="enter name" defaultValue={data.label} />
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{ left: 30, top: "43%" }}
            />
        </div>
    )
}
export default CustomNodes