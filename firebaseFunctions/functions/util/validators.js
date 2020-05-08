// validation method
isEmpty = str => {
  return str.trim() === ''
}

isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx)
}

exports.validateSignupData = data => {
  let errors = {}

  // validation email
  if (isEmpty(data.email)) {
    errors.email = 'Email must not be empty'
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address'
  }
  // validation password
  if (isEmpty(data.password)) errors.password = "Must not be empty"
  if (data.password !== data.confirmPassword) errors.password = "Passwords must match"
  // validation password
  if (isEmpty(data.handle)) errors.handle = "Must not be empty"

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateLoginData = data => {
  let errors = {}
  if (isEmpty(data.emial)) errors = "Must not be empty"
  if (isEmpty(data.password)) errors = "Must not be empty"

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.reduceUserDetails = data => {
  let userDetails = {}

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio
  if (!isEmpty(data.website.trim())) {
    // ex: https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`
    } else {
      userDetails.website = data.website
    }
  }
  if(!isEmpty(data.location.trim())) userDetails.location = data.location

  return userDetails
}