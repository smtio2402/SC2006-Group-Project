import SideNavBar from './SideNavBar.jsx'
import './styles/Feedback.modules.css'

function FeedBack(){
    return (
        <div className="homepage-container">
          <div className='left-container'>
          <SideNavBar />
          </div>
          <div className="main-content">
            <h1>Feedback</h1>
            <form>
              <input type='text' placeholder='Type something here'>
              </input>
              <button>Submit</button>
            </form>
          </div>
        </div>
      );
}

export default FeedBack