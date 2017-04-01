"use strict";

//var listPeople = [
//	{
//		"id": 827381263882763,
//		"name": "Jeff Bridges",
//		"dob": "1960-05-23",
//		"ideas": [
//			{
//				"idea": "White Russian",
//				"at": "LCBO",
//				"cost": "",
//				"url": "http://lcbo.com/"
//            },
//			{
//				"idea": "new Sweater",
//				"at": "Value Village",
//				"cost": "20.00",
//				"url": "http://lcbo0.com/"
//            }
//  ]
//    },
//	{
//		"id": 19283719282833,
//		"name": "Walter Sobchak",
//		"dob": "1961-12-12",
//		"ideas": [
//			{
//				"idea": "new briefcase",
//				"at": "Staples",
//				"cost": "50.00",
//				"url": "http://lcboo.com/"
//            }
//  ]
//    }
//];


const BENSKEY = "gift-ben";
var listPeople = [];
let globalId = 0;
var PERSON = {
    id: '',
    name: '',
    dob: '',
    ideas: []
};
var IDEA = {
	"idea": "",
	"at": "",
	"cost": "",
	"url": ""
};

if (document.deviceready) {
    document.addEventlistener('deviceready', onDeviceReady);
} else {
    document.addEventListener('DOMContentLoaded', onDeviceReady)
}

//document.addEventListener('deviceready', onDeviceReady, false);



function onDeviceReady() {

    window.document.querySelector('.btn.btn-primary.btn-block').addEventListener('touchstart', saveButton);
    window.document.querySelector('.btn.btn-block').addEventListener('touchstart', cancelButton);
    let value = localStorage.getItem(BENSKEY);
    if (!(null === value)) {
        listPeople = JSON.parse(value);
        console.trace(listPeople);
    }
    loadPeople();

    window.addEventListener('push', switchPage);
    //         
    //        this.receivedEvent('deviceready');

    //    var btn = document.getElementById("btnAdd");
    //    btn.addEventListener("touchstart",
    //        function (ev) {
    //        })

}


function switchPage(ev) {
    let content = document.querySelector('div.content');
    let id = content.id;
    switch (id) {
    case 'people':
        console.log("page1");
        document.querySelector('.btn.btn-primary.btn-block').addEventListener('touchstart', saveButton);
        document.querySelector('.btn.btn-block').addEventListener('touchstart', cancelButton);
        loadPeople();



        break;
    case 'gifts':
        console.log("page2");    
        document.querySelector('.btn.btn-primary.btn-block').addEventListener('touchstart', saveButton2);
        document.querySelector('.btn.btn-block').addEventListener('touchstart', cancelButton2);
            let person=null;
            for(let i =0,j=listPeople.length;i<j;i++){
                if(globalId==listPeople[i].id){
                    
                    person = listPeople[i];
                    break;
                }
            }
            
        displayPeopleIdeas(person);
        break;
    }
}


function saveProfiles() {}

function saveButton() {
    try {
        //	console.log('called addPerson');
        let isNew = false;
        //
        let name = document.getElementById("name").value;
        let dob = document.getElementById("dob").value; //.toString();
        //
        if (name.length == 0 || dob.length == 0) {
            alert("Incorrect input data name or Birtdate");
            return;
        }
        //
        //	//If getting base information, process a next step
        let modal = document.getElementById('personModal');
        modal.classList.remove('active');

        let person = null;
        //	// If New Person
        if (0 == globalId) {
            isNew = true;
            person = Object.create(PERSON);
            person.id = Date.now();
            person.name = document.getElementById("name").value;
            person.dob = document.getElementById("dob").value; //.toString();	
            person.ideas = [];
            listPeople.push(person);

        } else {
            for (let i = 0, j = listPeople.length; i < j; i++) {
                if (globalId == listPeople[i].id) {
                    listPeople[i].name = document.getElementById("name").value;
                    listPeople[i].dob = document.getElementById("dob").value;
                }
            }
        }

        localStorage.setItem(BENSKEY, JSON.stringify(listPeople));

    } catch (e) {
        console.log(e.message);
    } finally {
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        globalId = 0;
        loadPeople();
    }
}

function saveButton2() {

    try {

        let idea = document.getElementById("idea").value;
        let at = document.getElementById("at").value;
        let cost = document.getElementById("cost").value;
        let url = document.getElementById("url").value;
        //.toString();
        //
        if (idea.length == 0) {
            alert("Incorrect, need to fill in idea");
            return;
        }
        //
        //			//If getting base information, process a next step
        let modal = document.getElementById('giftModal');
        modal.classList.remove('active');
        //
        let newGift = null;
        newGift = Object.create(IDEA);

        newGift.idea = idea;
        newGift.at = at;
        newGift.url = url;
        newGift.cost = cost;
        
        console.log(globalId);
        let index=0;
        for(let i =0,j=listPeople.length;i<j;i++){
            if(globalId == listPeople[i].id){
                listPeople[i].ideas.push(newGift);
                index=i;
                break;
            }
        }
        console.log(index);
        localStorage.setItem(BENSKEY,JSON.stringify(listPeople));
        displayPeopleIdeas(listPeople[index]);
       // PERSON.ideas.push(newGift);
        //
    } catch (e) {
        console.log("error");
    } finally {
        console.log("idea");

    }
}

function cancelButton() {

    let modal = document.getElementById('personModal');
    modal.classList.remove('active');

}

function cancelButton2() {

    let modal = document.getElementById('giftModal');
    modal.classList.remove('active');

}

function addClickEvent(id) {

    for (let p of listPeople) {
        if (globalId == p.id) {
            let name = document.getElementById("name");
            name.value = p.name;
            document.getElementById("dob").value = p.dob; //.toString();
        }
    }

}

function loadPeople() {
    document.getElementById("contact-list").innerHTML = "";
    //	listPeople.forEach(function (person) {
    for (let person of listPeople) {

        var li = document.createElement('li');
        li.classList.add('table-view-cell');

        var span1 = document.createElement("span");
        span1.classList.add("name");
        var aInName = document.createElement("a");
        aInName.href = "#personModal";
        aInName.textContent = person.name;

        var aNav = document.createElement("a");
        aNav.classList.add("navigate-right", "pull-right");
        aNav.href = "gifts.html";
        
         aNav.addEventListener('touchstart', function (ev) {

            globalId = att.value;
            addClickEvent(att.value);
            ev.currentTarget.getAttribute("data-id");
 
        });

        var span2 = document.createElement("span");
        span2.classList.add("dob");
        span2.textContent = person.dob;

        let att = document.createAttribute("data-id");
        att.value = person.id;

        aInName.setAttributeNode(att);
        aInName.addEventListener('touchstart', function (ev) {

            globalId = att.value;
            addClickEvent(att.value);
            ev.currentTarget.getAttribute("data-id");

        });


        li.appendChild(span1);
        span1.appendChild(aInName);
        li.appendChild(aNav);
        aNav.appendChild(span2);

        document.getElementById("contact-list").appendChild(li);

    };
}

function displayPeopleIdeas(person) {
//    var h3 = document.createElement('h3');
//    h3.classList.add('nameOfPerson');
//    h3.textContent = person.name;
//    document.getElementById("gifts").appendChild(h3);

    document.querySelector(".title").textContent = person.name;
    document.getElementById("gift-list").innerHTML = " ";

    person.ideas.forEach(function (ideaGiftF) {
    

        var li = document.createElement('li');
        li.classList.add('table-view-cell', 'media');

        var span1 = document.createElement("span");
        span1.classList.add("pull-right", "icon", "icon-trash", "midline");

        var div = document.createElement('div');
        div.classList.add('media-body');

        var p = document.createElement('p');
        p.textContent = ideaGiftF.idea;
        var p2 = document.createElement('p');
        p2.textContent = ideaGiftF.at;
        var p3 = document.createElement('p');
        var aInGift = document.createElement("a");
        aInGift.href = "#"; /// target = "_blank";
        aInGift.textContent = ideaGiftF.url;
        var p4 = document.createElement("p");
        p4.textContent = ideaGiftF.cost;
        
        
//        
//                        <li class="table-view-cell media">
//                    <span class="pull-right icon icon-trash midline"></span> <!-- tap to process delete 
//                    <div class="media-body">
//                        <p>Gift Idea 3</p>
//                        <p>LCBO</p>
//                        <p><a href="#" target="_blank">http://www.lcbo.com/</a></p>
//                        <p>$99.99</p>
//                    </div>
//                </li>
        
         span1.addEventListener('click', function(ev){
        alert("are you sure you want to delete this gift ?");
             var ul = document.getElementById("gift-list") 
            let li = ev.currentTarget.parentNode;
            ul.removeChild(li);
             
        
      });
        
        div.appendChild(p);
        div.appendChild(p2);
        p3.appendChild(aInGift);
        div.appendChild(p3);
        div.appendChild(p4);
        li.appendChild(span1)
        li.appendChild(div)
        

        document.getElementById("gift-list").appendChild(li);
        
        
//        for(let i =0,j=listPeople.length;i<j;i++){
//            if(person.id == listPeople[i].id){
//                
//                console.log("FIND PERSON");
//                listPeople[i].ideas = listPeople[i].ideas.filter(function(item){
//                    item.idea != ideaGiftF.idea;
//                    console.log("FIND GIFT");
//                });
//                break;
//            }
//        }
//        
     localStorage.setItem(BENSKEY, JSON.stringify(listPeople));        
        
        

    });
}