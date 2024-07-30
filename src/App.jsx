import './App.css'
import Runs from './components/Runs/Runs';
import Tools from './components/Tools/Tools';
import WorkFlow from './components/WorkFlow/WorkFlow'
import {
  ReactFlowProvider,
} from '@xyflow/react';

function App() {


  return (
    <ReactFlowProvider>
      <div className='home-section'>
        <WorkFlow />
        <Tools />
        <Runs />
      </div>
    </ReactFlowProvider>
  )
}

export default App
