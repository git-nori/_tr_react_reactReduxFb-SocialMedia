import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Box, Menu, MenuItem, makeStyles, Badge, Tooltip, IconButton, Typography } from '@material-ui/core'
import { Notifications as NotificationIcon, Favorite, Chat } from '@material-ui/icons'

const Notifications = ({ notifications, markNotifications }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpend = () => {
    let unreadNotificationsIds = notifications.filter(not => !not.read)
    .map(not => not.notificationId)
    markNotifications(unreadNotificationsIds)
  }

  const renderNotificationsIcon = () => {
    if (notifications && notifications.length > 0) {
      const unReadNotCnt = notifications.filter(not => !not.read).length
      // 未読のお知らせが存在するか判定
      return unReadNotCnt > 0
        ? (
          <Badge badgeContent={unReadNotCnt} color="secondary">
            <NotificationIcon />
          </Badge>
        ) : (
          <NotificationIcon />
        )
    } else {
      return <NotificationIcon />
    }
  }

  const renderMenuItm = () => {
    return notifications && notifications.length > 0
      ? (
        notifications.map(not => {
          const verb = not.type === 'like' ? 'liked' : 'commented on'
          const time = moment(not.createdAt).fromNow()
          const iconColor = not.read ? 'primary' : 'secondary'
          const icon = not.type === 'like'
            ? (
              <Favorite color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 10 }} />
            )

          return (
            <MenuItem key={not.createdAt} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                variant="body1"
                to={`users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} yourscream {time}
              </Typography>
            </MenuItem>
          )
        })
      ) : (
        <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
      )
  }

  return (
    <>
      <Tooltip title="Notifications" placement="top">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {renderNotificationsIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpend}
      >
        {renderMenuItm()}
      </Menu>
    </>
  )
}

export default Notifications