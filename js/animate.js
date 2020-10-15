// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "Once upon a time, long, long ago a king and queen ruled over a distant land.  The queen was kind and lovely and all the people of the realm adored her.  The only sadness in the queen's life was that she wished for a child but did not have one. One winter day, the queen was doing needle work while gazing out her ebony window at the new fallen snow.  A bird flew by the window startling the queen and she pricked her finger.  A single drop of blood fell on the snow outside her window.  As she looked at the blood on the snow she said to herself, 'Oh, how I wish that I had a daughter that had skin as white as snow, lips as red as blood, and hair as black as ebony.'";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

function init() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);

  canvas.addEventListener('touchstart', sketchpad_touchStart, false);
  canvas.addEventListener('touchmove', sketchpad_touchMove, false);
  canvas.addEventListener('touchend', sketchpad_touchEnd, false);
  
 
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

var touchX,touchY;

function sketchpad_touchStart(event) {
    getTouchPos();
    drawM();
  //   position.x = event.pageX;
  // position.y = event.pageY;
    mouse.down = true;
    
   
    document.getElementById('info').style.display = 'none';

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

function sketchpad_touchMove(e) { 
    // Update the touch co-ordinates
    // mouse.x = e.pageX;
    // mouse.y = e.pageY;
    getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    drawM(); 

    // Prevent a scrolling action as a result of this touchmove triggering.
    e.preventDefault();
}

function sketchpad_touchEnd(e) {
  mouse.down = false;
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;

    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}







function mouseMove ( event ){

  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
 
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/2;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
   
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
     
      context.font = fontSize + "px Great Vibes";
   
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
   
    console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }    

}


function drawM() {
  if ( mouse.down ) {
  
     var d = distance( position, mouse );
     var fontSize = minFontSize + d/4;
     var letter = letters[counter];
     var stepSize = textWidth( letter, fontSize );
    
     if (d > stepSize) {
       var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
       context.font = fontSize + "px Great Vibes";
    
       context.save();
       context.translate( position.x, position.y);
       context.rotate( angle );
       context.fillText(letter,0,0);
       context.restore();
 
       counter++;
       if (counter > letters.length-1) {
         counter = 0;
       }
       console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;
  
 
       }
   }    
 
 }

function distance( pt, pt2 ){
 
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
 
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width;
}

function textWidth( string, size ) {
  context.font = size + "px Great Vibes";
 
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
 
 };



init();

