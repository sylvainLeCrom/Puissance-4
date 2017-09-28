function init() {
    
    var ele = document.getElementById('connard');
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var txt = document.createTextNode('P4');
    td.appendChild(txt);
    tr.appendChild(td);
    table.appendChild(tr);
    ele.appendChild(table);
}
