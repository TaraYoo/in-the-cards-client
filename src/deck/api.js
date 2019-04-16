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

export const getDecks = user => {
  return axios({
    url: apiUrl + '/decks',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getDeck = (user, id) => {
  return axios({
    url: apiUrl + '/decks/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const editDeck = (user, id, accuracy) => {
  return axios({
    url: apiUrl + '/decks/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      deck: {
        accuracy
      }
    }
  })
}

export const deleteDeck = (user, id) => {
  return axios({
    url: apiUrl + '/decks/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
