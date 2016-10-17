function init(){

var obj;
var luckyList = getAllPersons();
var luckyName;
var allPersons;

document.getElementById('add').addEventListener('click', checkFields);
document.getElementById('new-winner').addEventListener('click', getNewWinner);
document.getElementById('clear').addEventListener('click', clearList);
show();

}

function Person(name, sname, email, phone) {
    this.name = name;
    this.sname = sname;
    this.email = email;
    this.phone = phone;
}




function setPerson(n, s, e, p){
    obj = new Person(n,s,e,p);
    obj = JSON.stringify(obj);
    luckyList.push(obj);
    localStorage.setItem("luckyList", JSON.stringify(luckyList));
    
   show();

}

function getAllPersons() {
    luckyList = new Array() || [];
    var luckyList_str = localStorage.getItem('luckyList');

    if (typeof luckyList_str !== "undefined" && luckyList_str !== "undefined" && luckyList_str !== null) {
	  	luckyList = JSON.parse(luckyList_str);
	}
    
    return luckyList;

}

function show() {

    var userlist = document.getElementById('userlist');
    var html = '<table id="luckylist"><tr><th>Name</th><th>Surname</th><th>Email</th><th>Phone</th><th>Delete</th></tr>';

    for (prop in luckyList) {

	      if(luckyList.hasOwnProperty(prop)){
	      var obj = JSON.parse(luckyList[prop]);
	      html += '<tr  onclick="setInfo(' + Object.keys(luckyList).indexOf(prop) + ')"><td>' + obj.name + '</td><td>' + obj.sname + '</td><td>' + obj.email + '</td><td>' + obj.phone + '</td><td class="remove" id="element-' + Object.keys(luckyList).indexOf(prop) + '">Delete</td></tr>';

	    }
    }

    html += '</table>';
	userlist.innerHTML = html;

	var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    console.log(luckyList);
    console.log(luckyList.length);
    if(luckyList.length <= 0){
        document.getElementById('userlist').style.display = "none";
    }else{
        document.getElementById('userlist').style.display = "block";

    }

}

function checkFields(){
    var name = document.getElementById('name').innerHTML;
    var sname = document.getElementById('s_name').innerHTML;
    var email = document.getElementById('email').innerHTML;
    var phone = document.getElementById('phone').innerHTML;
   

    if(name !== '' && sname !== '' && email !== ''){
    	if(validate(email, 'email')){
	    		if(phone.length !== 0){		
				    if(validate(phone, 'phone')){
				    	setPerson(name, sname, email, phone);
				    }else{
				    	popup('Wrong Number');
				    }
				}else{
					setPerson(name, sname, email, phone);
				}
		}else{
		 popup('Wrong email');	
		}        
    }else{
        popup('Empty fields');
    }
}

function validate(string, type) {
	if(type === 'email'){

		var re = /\S+@\S+\.\S+/;
    	return re.test(string);
	
	}else if(type === 'phone'){
		
		var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    	return re.test(string);
	}

}


function getNewWinner(){
    luckyName = document.getElementById('lucky-name');

    if (typeof luckyList !== "undefined" && luckyList !== "undefined" && luckyList !== null && luckyList !== '' && luckyList.length !== 0) {

    	var newWinner = Math.floor((Math.random() * luckyList.length + 1) - 1);
    	var newWinner = JSON.parse(luckyList[newWinner]);
	  	var newDiv = document.createElement('li');
		newDiv.innerHTML = newWinner.name +' '+ newWinner.sname +' '+ newWinner.email +' '+ newWinner.phone;
		luckyName.appendChild(newDiv);

	}else{
		popup('List is empty, please add new lucky');
	}



}


function remove() {

    var id = parseInt(this.getAttribute('id').replace(/\D+/g, ""));
    luckyList.splice(id, 1);
    localStorage.setItem('luckyList', JSON.stringify(luckyList));
    show();

}

function setInfo(id) {
    // var id = parseInt(this.getAttribute('id').replace(/\D+/g, ""));

    // var neededElement = JSON.parse(luckyList[id]);

    // luckyList.splice(id, 1, );
    // localStorage.setItem('luckyList', JSON.stringify(luckyList));
    // console.log(neededElement);

    // luckylistTable = getElementById('luckylist');



   	// this.setAttribute('contenteditable', 'true');

   	// alert(this.getAttribute('id'));

    show();

}


function clearList() {
    localStorage.removeItem('luckyList');
    popup('List cleared');
    init();
}

function popup(text){

	var newPopup = document.createElement('div');
	var popupWrap = document.createElement('div');
	var close = document.createElement('span');
	var popupText = document.createElement('span');

	popupWrap.setAttribute('id', 'popup-wrap');
	newPopup.setAttribute('id', 'popup');
	newPopup.setAttribute('class', 'app-blocks ');
	popupText .setAttribute('id', 'text');
	close.setAttribute('id', 'close');

	close.innerHTML = '<span class="btn-add">close</span>';

	popupText.innerHTML = text;

	newPopup.appendChild(popupText);
	newPopup.appendChild(close);	

	document.body.appendChild(popupWrap);
	document.getElementById('popup-wrap').appendChild(newPopup);
	document.getElementById('close').addEventListener('click', function(){
    document.getElementById('popup-wrap').remove();
    
    });

}

init();