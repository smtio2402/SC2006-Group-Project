import SideNavBar from './SideNavBar.jsx'

function Favourites(){
    return (
        <div className="homepage-container">
          <div className='left-container'>
          <SideNavBar />
          </div>
          <div className="main-content">
            <h1>Favourites Page</h1>
          </div>
        </div>
      );
}

export default Favourites