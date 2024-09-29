import SideNavBar from "./SideNavBar.jsx"
import './styles/sideNavBar.modules.css'

function History(){
    return (
        <div className="homepage-container">
          <div className='left-container'>
          <SideNavBar />
          </div>
          <div className="main-content">
            <h1>History Page</h1>
          </div>
        </div>
      );
}

export default History