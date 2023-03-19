function Info(){
    window.alert("Click on the 'begin' button to start the process of sound recognition and please remember to allow the computer to use you microphone");
}

//Model 1 my voice only: https://teachablemachine.withgoogle.com/models/PwyTrZRSd/model.json
//Model 2 my voice + Laila: https://teachablemachine.withgoogle.com/models/94aVY86qK/model.json

var SpeechRecognition = window.webkitSpeechRecognition;
var Recognition = new SpeechRecognition();


function BEGIN(){
    document.getElementById("SAID").innerHTML = "";
    Recognition.start();
    //after this, everything inside this Begin function is all code for the model + recognition commands

    navigator.mediaDevices.getUserMedia({audio:true});
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/94aVY86qK/model.json",modelReady);
    //this is to setup the model and make sure the microphone is working

    function modelReady(){
        console.log("Model is ready")
        classifier.classify(gotResults);
        //classifier.classify(gotResults); this piece of code is to actually recognize the person or in this case voice
    }

    function gotResults(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results)
            document.getElementById("WHO").innerHTML = results[0].label;
            //label here in our case is the name of the voice

            if(document.getElementById("SAID").innerHTML != ""){
                classifier = "";
            }
        }

        
    }
}

Recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("SAID").innerHTML = content;
    
}



