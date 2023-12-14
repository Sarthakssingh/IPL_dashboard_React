// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import MatchCard from '../MatchCard/index'
import LatestMatch from '../LatestMatch/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    matchData: [],
    isShowing: true,
    idd: '',
  }

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.updateMatchDetails(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachItem =>
        this.updateMatchDetails(eachItem),
      ),
    }
    this.setState({matchData: updatedData, isShowing: false, idd: id})
  }

  updateMatchDetails = each => {
    const updatedData = {
      umpires: each.umpires,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      id: each.id,
      date: each.date,
      venue: each.venue,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }
    return updatedData
  }

  render() {
    const {isShowing, matchData, idd} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchData
    return (
      <div className={`app-team-matches-container ${idd}`}>
        {isShowing ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#FFFFFF" height={70} width={70} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch
              key={latestMatchDetails.id}
              latestMatch={latestMatchDetails}
            />
            <ul className="recent-matches-list">
              {recentMatches.map(eachItem => (
                <MatchCard matchData={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
