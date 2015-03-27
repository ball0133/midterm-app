// JavaScript Document
var loadedscripts = 0; //counting how many scripts/functions load (DOMContentLoaded and deviceready)
var peeps = []; //this array is holding 12 objects (contacts)

document.addEventListener("DOMContentLoaded", function () {
    loadedscripts++; //increments the variable by 1
    if (loadedscripts === 2) { //compares variable to make sure it equals the number of scripts/functions
        getContacts(); //this is calling a function which will start once the counter reaches 2
        //which happens when DOMContentLoaded and deviceready have finished loading
    }
});

document.addEventListener("deviceready", function () {
    loadedscripts++;
    if (loadedscripts === 2) {
        getContacts();
    }
});

function getContacts() {
    //localStorage is a built in javascript object
    if (localStorage.getItem("ball0133") === null) //checking if localStorage is empty
    //if so, create the key and execute this statement
    //"ball0133" is the key, should be unique so it doesn't interfere with other people's storage
    {
        var options = new ContactFindOptions();

        options.filter = ""; //leaving this empty will find return all contacts
        options.multiple = true; //return multiple results

        var filter = ["displayName"]; //an array of fields to compare against the options.filter 

        navigator.contacts.find(filter, successFunc, errFunc, options);
        //successFunc is the callback function which will run after finding the matches
        //errFunc is the function to run when there is a problem finding the contacts


        function successFunc(matches) {
            for (i = 0; i < 12; i++) { //grabbing 12 contacts
                var contacts = {}; //naming object "contacts" holding the matches
                contacts.id = matches[i].id; //making a property 'id', putting matches[i].id which is the property value, and putting it into contacts.id's property
                contacts.name = matches[i].displayName;
                contacts.numb = [matches[i].phoneNumbers[0], matches[i].phoneNumbers[1]];
                contacts.lat = null;
                contacts.lng = null;

                peeps.push(contacts); //adding contacts objects into peeps array
                localStorage.setItem("ball0133", JSON.stringify(peeps)); //pushing information to localstorage

                var info = document.createElement("li"); //empty variable
                info.className = 'nameList';
                info.dataset.ref = i;
                info.innerHTML = matches[i].displayName;
                //info += "<li class='nameList' id='" + i + "'>" + matches[i].displayName + "</li>"; //add this line to the var info

                console.log(info);
                document.querySelector("#contactNames").appendChild(info); //add var info to html

                //                info.addEventListener("click", app.edit, false);
            }
        }

        function errFunc() {
            console.log("Contacts can't even...");
        }

    } else {
        var localinfo = JSON.parse(localStorage.getItem("ball0133")); //coming back as an array of objects
        console.log(localinfo);
        for (i = 0; i < 12; i++) {

            var info = document.createElement("li");
            info.className = 'nameList';
            info.dataset.ref = i;
            info.innerHTML = localinfo[i].name; //add this line to the var info

            document.querySelector("#contactNames").appendChild(info); //add var info to html

            info.addEventListener("click", app.edit, false);
        }
    }
}

//HAMMER

var app = {
    init: function () {

        var ulClick = document.querySelector("[data-role=listview]");
        var hammertime = new Hammer.Manager(ulClick);

        // Tap recognizer with minimal 2 taps
        hammertime.add(new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        }));
        // Single tap recognizer
        hammertime.add(new Hammer.Tap({
            event: 'singletap'
        }));

        // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
        hammertime.get('doubletap').recognizeWith('singletap');
        // we only want to trigger a tap, when we don't have detected a doubletap
        hammertime.get('singletap').requireFailure('doubletap');

        hammertime.on("singletap doubletap", function (ev) {
            if (ev.type == "singletap") {
                console.log("singletap");
                app.edit(ev); //single tap
            } else {
                console.log("doubletap");
                //app.MapFunctionNameHere(ev);
                geo(); //double tap
            }
        });

        document.getElementById("btnCancel").addEventListener("click", app.cancel);
    },

//OKAY button
    cancel: function (ev) {
        document.querySelector("[data-role=modal]").style.display = "none";
        document.querySelector("[data-role=overlay]").style.display = "none";
    },

//MODAL
    edit: function (ev) {

        document.querySelector("[data-role=modal]").style.display = "block";
        document.querySelector("[data-role=overlay]").style.display = "block";

        var localinfo = JSON.parse(localStorage.getItem("ball0133")); //coming back as an array of objects
        var item = ev.target.getAttribute("data-ref"); //getting value of the data-ref attribute from the HTML
        var itemVal = ev.target.innerHTML; //setting itemVal to the contact name that is clicked 

        document.querySelector("#contactName").innerHTML = itemVal; //placing that value into the id in the HTML
        document.querySelector("#home").innerHTML = localinfo[item].numb[0].type + ": " + localinfo[item].numb[0].value;
        document.querySelector("#mobile").innerHTML = localinfo[item].numb[1].type + ": " + localinfo[item].numb[1].value;

    }
}

document.addEventListener("DOMContentLoaded", app.init);

document.addEventListener("deviceready", app.init);






//TO DO
//include json file
//back button
//if lat and lng not set, load modal and then map to allow user to set location
//if set, show map & location

//array [], a container that holds data types (objects, arrays, values, strings,etc)
//object {}, are variables too, but objects contain many values