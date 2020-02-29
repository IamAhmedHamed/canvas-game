// IFEE
( function() {

  // bg music
  document.getElementById('bg-music').volume = 0.5;
  document.getElementById('bg-music').play();

  // social icon hover effect function
  let socialIcon;
  socialIcon = document.getElementsByClassName('social-icon');
  for (let i = 0; i < socialIcon.length; i++) {
    socialIcon[i].addEventListener('mouseover', function(evt) {
      document.getElementsByClassName('ico')[i].style.fontSize = 28 + 'px';
    }, false);
    socialIcon[i].addEventListener('mouseout', function(evt) {
      document.getElementsByClassName('ico')[i].style.fontSize = 22 + 'px';
    }, false);
  } 
  // end social icon hover effect

  // function to show game progress and config in mobile view
  let gameConfigButton, closeGmaeBody;
  gameConfigButton = document.getElementById('game-config-btn');
  closeGmaeBody = document.getElementById('game_body_btn');
  gameConfigButton.addEventListener('click', function(evt) {
    document.getElementById('game_body_black-bg').style.display = 'block';
  }, false);
  closeGmaeBody.addEventListener('click', function(evt) {
    document.getElementById('game_body_black-bg').style.display = 'none';
  }, false);
  // end show game body

  // all the javascript for mobile view
  if ( (window.innerWidth < 768) || ( (window.visualViewport !== undefined) && (window.visualViewport.width < 768) ) ) {
    // show note for mobile users
    let fixedNote, closeFixedNote;
    fixedNote = document.getElementsByClassName('fixed-note');
    closeFixedNote = document.getElementsByClassName('fixed-note_btn');
    fixedNote[1].style.display = 'block';
    closeFixedNote[1].addEventListener('click', function(evt) {
      fixedNote[1].style.display = 'none';
    }, false);
  }
  // end for mobile

  // note when resizing the window
  window.addEventListener('resize', function() {
    fixedNote = document.getElementsByClassName('fixed-note');
    closeFixedNote = document.getElementsByClassName('fixed-note_btn');
    fixedNote[0].style.display = 'block';
    closeFixedNote[0].addEventListener('click', function(evt) {
      fixedNote[0].style.display = 'none';
    }, false);
  })

  // make the canvas element responsive
  let cavnasWraperRect = document.getElementById('canvas-wrapper').getBoundingClientRect();
  document.getElementById('game_canvas').width = cavnasWraperRect.width;

}() );