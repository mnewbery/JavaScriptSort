function toggle_div(div_name, div_id){
    let collection = document.getElementsByName(div_name);
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
// Same function as above except it searches by class not element by name
function toggle_div_byClass(div_class, div_id){
    let collection = document.getElementsByClassName(div_class);
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
