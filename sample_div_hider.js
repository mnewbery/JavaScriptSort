// This function demonstrates how to find divs by name then hide the ones that don't have the needed div_id
function toggle_div(div_name, div_id){
    var collection = document.getElementsByName(div_name);
    for(let node in collection) {
        if (collection[node] !== null && node.length < 2){
            if (collection[node].attributes['id'].nodeValue === div_id) { // could have said item.hidden = item.id === div_id) ? false : true;
                collection[node].style.display = 'block';
            } else {
                collection[node].style.display = 'none';
            }
        }
    }
}
