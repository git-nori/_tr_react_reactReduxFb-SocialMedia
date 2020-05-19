import React from 'react'

import Scream from './Scream'

const ScreamCards = ({ screams, scream, user, errors, loading, getScream, likeScream, unlikeScream, deleteScream, submitComment, clearErrors }) => {
  const renderCard = () => {
    return screams.map(screamsData => {
      return (
        <Scream key={screamsData.screamId}
          {...user}
          scream={screamsData}
          comments={scream.comments}
          likeScream={likeScream}
          unlikeScream={unlikeScream}
          getScream={getScream}
          submitComment={submitComment}
          deleteScream={deleteScream}
          clearErrors={clearErrors}
          errors={errors}
          loading={loading} />
      )
    })
  }
  return (
    <>
      {renderCard()}
    </>
  )
}

export default ScreamCards