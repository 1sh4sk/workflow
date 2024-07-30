import { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    // MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    // Handle,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './workFlow.css';

import CustomNodes from './CustomNodes';


const initialNodes = [
    {
        id: '0',
        type: 'customNodes',
        sourcePosition: 'right',
        data: { label: 'Enter Name' },
        position: { x: 0, y: 0 },
    },
];

const nodeTypes = { customNodes: CustomNodes };

let id = 1;
const getId = () => `${id++}`;


// const initialNodes = [
//     {
//         id: '1',
//         sourcePosition: 'right',
//         type: 'input',
//         data: { label: 'Input' },
//         position: { x: 0, y: 80 },
//     },
//     {
//         id: '2',
//         sourcePosition: 'right',
//         targetPosition: 'left',
//         data: { label: 'A Node' },
//         position: { x: 250, y: 0 },
//     },
//     {
//         id: '3',
//         sourcePosition: 'right',
//         targetPosition: 'left',
//         data: { label: 'Node 3' },
//         position: { x: 250, y: 160 },
//     },
//     {
//         id: '4',
//         sourcePosition: 'right',
//         targetPosition: 'left',
//         data: { label: 'Node 4' },
//         position: { x: 500, y: 0 },
//     },
//     {
//         id: '5',
//         sourcePosition: 'top',
//         targetPosition: 'bottom',
//         data: { label: 'Node 5' },
//         position: { x: 500, y: 100 },
//     },
//     {
//         id: '6',
//         sourcePosition: 'bottom',
//         targetPosition: 'top',
//         data: { label: 'Node 6' },
//         position: { x: 500, y: 230 },
//     },
//     {
//         id: '7',
//         sourcePosition: 'right',
//         targetPosition: 'left',
//         data: { label: 'Node 7' },
//         position: { x: 750, y: 50 },
//     },
//     {
//         id: '8',
//         sourcePosition: 'right',
//         targetPosition: 'left',
//         data: { label: 'Node 8' },
//         position: { x: 750, y: 300 },
//     },
// ];

// const initialEdges = [
//     {
//         id: 'e1-2',
//         source: '1',
//         type: 'smoothstep',
//         target: '2',
//         // animated: true,
//     },
//     {
//         id: 'e1-3',
//         source: '1',
//         type: 'smoothstep',
//         target: '3',
//         // animated: true,
//     },
//     {
//         id: 'e1-4',
//         source: '2',
//         type: 'smoothstep',
//         target: '4',
//         label: 'edge label',
//     },
//     {
//         id: 'e3-5',
//         source: '3',
//         type: 'smoothstep',
//         target: '5',
//         // animated: true,
//     },
//     {
//         id: 'e3-6',
//         source: '3',
//         type: 'smoothstep',
//         target: '6',
//         // animated: true,
//     },
//     {
//         id: 'e5-7',
//         source: '5',
//         type: 'smoothstep',
//         target: '7',
//         // animated: true,
//     },
//     {
//         id: 'e6-8',
//         source: '6',
//         type: 'smoothstep',
//         target: '8',
//         // animated: true,
//     },
// ];


const WorkFlow = () => {

    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    // const prevNodePosition = useRef({ x: 0, y: 0 });

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);



    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback((params) => {
        // reset the start node on connections
        connectingNodeId.current = null;
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return;

            const targetIsPane = event.target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId();

                //getting the new position
                // const newPosition = screenToFlowPosition({
                //     x: event.clientX,
                //     y: event.clientY,
                // });

                const newNode = {
                    id,
                    type: 'customNodes',
                    sourcePosition: 'right',
                    targetPosition: 'left',
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    // data: { label: `Node ${id}` },
                    data: { label: "enter name" },
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectingNodeId.current, target: id }),
                );

                // updating the current position
                // prevNodePosition.current = newPosition;
            }
        },
        [screenToFlowPosition],
    );

    const [visibility, setVisibility] = useState(false);
    const [newNodeName, setNewNodeName] = useState("");

    const handleAddButtonClick = () => {
        setVisibility(!visibility);
    }

    const handleInputChange = (e) => {
        setNewNodeName(e.target.value);
    }

    const handleNodeAdd = (e) => {
        e.preventDefault();

        const id = getId();
        const newNode = {
            id,
            type: 'customNodes',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 50, y: 50 },
            data: { label: newNodeName },
        }
        // prevNodePosition.current = newNode.position;
        setNodes((prevNodes) => [...prevNodes, newNode]);
        setVisibility(false);
        setNewNodeName('');
    }





    return (
        <div className='workflow-section'>

            <div className='header'>
                <div>
                    <h1 className='heading'>My Workflow</h1>
                    <p className='paragraph'>last edited 2 hours ago</p>
                </div>

                <div className='add-div'>
                    <button className='add-btn' onClick={handleAddButtonClick}>Add</button>

                    <div className={visibility ? 'node-adding-div' : 'node-adding-div hidden'}>
                        <form onSubmit={handleNodeAdd}>
                            <div className='form-input'>
                                <label htmlFor="node-name">
                                    Node Name:
                                </label>
                                <input id="node-name" type="text" value={newNodeName} onChange={handleInputChange} />
                            </div>
                        </form>
                    </div>
                </div>



            </div>

            <div className="wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}

                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}

                    nodeTypes={nodeTypes}

                    fitView
                    fitViewOptions={{ padding: 2 }}
                    nodeOrigin={[0.5, 0]}



                >

                    <Controls orientation='horizontal' className='controls' />
                    {/* <MiniMap className='minimap' /> */}
                    {/* <Background variant="dots" gap={5} size={1} /> */}
                </ReactFlow>
            </div>
        </div>
    )
}
export default WorkFlow