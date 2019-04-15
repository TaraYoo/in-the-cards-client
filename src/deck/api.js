import apiUrl from '../apiConfig'
import axios from 'axios'

export const drawCards = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/draw'
  })
}

export const createDeck = user => {
  return axios({
    url: apiUrl + '/decks',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      deck: {
        question: 'placeholder question'
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
