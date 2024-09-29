import SideNavBar from './SideNavBar.jsx'
import './styles/Dashboard.modules.css'

function Dashboard(){
    return (
        <div className="homepage-container">
          <div className='left-container'>
          <SideNavBar />
          </div>
          <div className="main-content">
            <h1>Dashboard Page</h1>
          </div>
        </div>
      );
}

export default Dashboard