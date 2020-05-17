import React from 'react'
import { Link } from 'react-router-dom'

import TooltipIconbtn from '../../components/TooltipIconbtn'
import { Favorite, FavoriteBorder } from '@material-ui/icons'

const LikeBtn = ({authenticated, screamId, likes, likeScream, unlikeScream}) => {
  // 既にLike済みか判定する
  const islikedScream = screamId => {
    if (likes && likes.find(like => like.screamId === screamId)) {
      return true
    }
    return false
  }

  const renderLikedBtn = screamId => {
    return !authenticated
      ? (
        <TooltipIconbtn tip="Like">
          <Link to="/login">
            <FavoriteBorder color="primary" />
          </Link>
        </TooltipIconbtn>
      ) : (
        islikedScream(screamId)
          ? (
            <TooltipIconbtn tip="Undo like" onClick={() => { unlikeScream(screamId) }}>
              <Favorite color="primary" />
            </TooltipIconbtn>
          ) : (
            <TooltipIconbtn tip="Do like" onClick={() => { likeScream(screamId) }}>
              <FavoriteBorder color="primary" />
            </TooltipIconbtn>
          )
      )
  }
  return renderLikedBtn(screamId)
}

export default LikeBtn