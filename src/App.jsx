import './App.css'
import MainResults from './components/MainResults'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='md:flex'>
     <Sidebar/>
     <MainResults/>
    </div>
  )
}

export default App
