// Write your code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    iplTeams: {},
    isShow: true,
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    // const status = await response.statusCode
    const data = await response.json()

    const updatedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({iplTeams: updatedData, isShow: false})
  }

  render() {
    const {iplTeams, isShow} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>

          {isShow ? (
            <div testid="loader" className="loader-container">
              <Loader type="TailSpin" color="#ffffff" height={60} width={60} />
            </div>
          ) : (
            <ul className="team-list-items">
              {iplTeams.map(eachItem => (
                <TeamCard key={eachItem.id} iplTeam={eachItem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
