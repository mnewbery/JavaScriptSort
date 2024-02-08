// This is a collection of references to running timers. The clearTimeout inbuilt function handles the timers by numeric reference.
// This means we need to associate one or more timers to the start button that caused the timer to exist
let timeouts = [];
let sort_semaphore = false;


// This function is called when the DOMContentLoaded event is fired and when the Add timer button is clicked
// Purpose: Inject some HTML in to the named DIV. The elements shall be unique basd on the date time so their event handlers work
function add_timer(div_id){
  let  element_div = document.getElementById(div_id);
  if (element_div !== null){
    let datetime_now = Date.now();
    let new_innerHTML = '<div id="div_{datetime_now}">' +
      '<button id="start_{datetime_now}" type="button" onclick="start_timer(this);">Start</button>' +
      '<button id="stop_{datetime_now}" type="button" onclick="stop_timer(this);">Stop</button>' +
      '<span id="timer_{datetime_now}"></span></div>';
    new_innerHTML = new_innerHTML.replaceAll('{datetime_now}', datetime_now.toString());
    element_div.innerHTML += new_innerHTML;
  }
}

// Event handler for start button click
// Adds a reference for the timer created by saving its handle to the timeouts array. The handle is a small integer
function start_timer(element){
  console.log('start timer ' + element.id);
  // Set Interval is used here to stop the need for creating new timers
  // We could have used SetTimeout instead and just created new timers every eventHandler that was fired
  timeouts.push([element.id, setInterval(function (){timeoutEventHandler(element)}, 1300)]);
}

// Event handler for stop button click
// Nulls references for the timer of the relevant button. If the timer
function stop_timer(element){
  let timeout_name = element.id.replace('stop','start');
  // As we are going to edit the timeouts array, foreach cannot be used
  for (let item in timeouts){
    if (timeouts[item][0] === timeout_name){
      console.log('stop timer ' + timeouts[item][1]);
      clearTimeout(timeouts[item][1]);
      timeouts[item] = null;
      // There could be more than one timer per span so keep searching to the end and null the matching ones
    }
  }
  // Clean out the null values in the array
  // Note this isn't thread safe as multiple events can call the same function on the global variable.
  // To make order of this, the sort semaphore is used for control
  const notNull = (element) => element !== null;
  // only execute while this isn't already being done
  if (!sort_semaphore) {
    sort_semaphore = true;
    // This code says use the comparison not null for each element and return only the values
    // where the comparison is true. Therefore, if any nulls weren't cleaned out last time
    // they will be now
    timeouts = timeouts.filter(notNull);
    sort_semaphore = false;
  }
}

// This function is the event hanlder for the setinterval timer created when the button was clicked
function timeoutEventHandler(element) {
  // fires when a timeout occurs
  let element_span = document.getElementById(element.id.replace('start','timer'));
  if (element_span !== null){
    element_span.innerHTML = Date.now().toString();
    console.log('Timed Event ' + element.id);
  }
}

//On Document Loaded
document.addEventListener('DOMContentLoaded', function(){add_timer('div_0')});
