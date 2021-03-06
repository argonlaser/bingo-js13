'use strict';

/* global io */
(function () {
  var socket // Socket.IO client
  var buttons // Button elements
  var message // Message element
  var score // Score element
  var points = { // Game points
    draw: 0,
    win: 0,
    lose: 0
  }

    /**
     * Disable all button
     */
  function disableButtons () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled', 'disabled')
    }
  }

    /**
     * Enable all button
     */
  function enableButtons () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('disabled')
    }
  }

    /**
     * Set message text
     * @param {string} text
     */
  function setMessage (text) {
    message.innerHTML = text
  }

    /**
     * Set score text
     * @param {string} text
     */
  function displayScore (text) {
    score.innerHTML = [
      '<h2>' + text + '</h2>',
      'Won: ' + points.win,
      'Lost: ' + points.lose,
      'Draw: ' + points.draw
    ].join('<br>')
  }

    /**
     * Binde Socket.IO and button events
     */
  function bind () {
    socket.on('start', function () {
      enableButtons()
      setMessage('Round ' + (points.win + points.lose + points.draw + 1))
    })

    socket.on('win', function () {
      points.win++
      displayScore('You win!')
    })

    socket.on('lose', function () {
      points.lose++
      displayScore('You lose!')
    })

    socket.on('draw', function () {
      points.draw++
      displayScore('Draw!')
    })

    socket.on('end', function () {
      disableButtons()
      setMessage('Waiting for opponent...')
    })

    socket.on('connect', function () {
      disableButtons()
      setMessage('Waiting for opponent...')
    })

    socket.on('disconnect', function () {
      disableButtons()
      setMessage('Connection lost!')
    })

    socket.on('error', function () {
      disableButtons()
      setMessage('Connection error!')
    })

    for (var i = 0; i < buttons.length; i++) {
      (function (button, guess) {
        button.addEventListener('click', function (e) {
          disableButtons()
          socket.emit('guess', guess)
        }, false)
      })(buttons[i], i + 1)
    }
  }

    /**
     * Client module init
     */
  function init () {
    socket = io({ upgrade: false, transports: ['websocket'] })
    buttons = document.getElementsByTagName('button')
    message = document.getElementById('message')
    score = document.getElementById('score')
    disableButtons()
    bind()
  }

  window.addEventListener('load', init, false)
})()
