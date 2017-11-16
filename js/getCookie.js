/**
 * 
 * @param {*cookie的name} key 
 */
function getCookieVal(key){
    var line = document.cookie;
    var Oarr = line.split(';');
    
    for(var i=0;i<Oarr.length;i++){
        var Rarr = Oarr[i].split('=');
        var attr = Rarr[0].trim(),
            val  = Rarr[1];
        if(attr==key){
            return val;
        }
    }
    return null;
}
