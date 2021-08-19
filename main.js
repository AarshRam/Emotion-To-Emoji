Webcam.set({
    width: 355 ,
    height: 355,
    image_format: 'png',
    png_quality: 100 
});

camera = document.getElementById("camera")
Webcam.attach('#camera');

   prediction_1 = "";
   prediction_2 = "";

   console.log('Ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XUV68nGXR/model.json',modelLoaded);
function modelLoaded() {
    console.log("Model is loaded");
}

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="result_img" src="' + data_uri  + '"/>';
    });   
   }

   function identify() {
       img = document.getElementById("result_img");
       classifier.classify(img,gotResult);
   }

   function speak(){
       synth = window.speechSynthesis;
       speakData1 = "The first prediction is " + prediction_1;
       speakData2 = " and the second prediction is " + prediction_2;
       var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
       synth.speak(utterThis);
   }

   function gotResult(error, result){
       if(error){
           console.error(error);
       }
       else{
           console.log(result);
           document.getElementById("result_emotion_name").innerHTML = result[0].label;
           document.getElementById("result_emotion_name2").innerHTML = result[1].label;
           prediction_1 = result[0].label;
           prediction_2 = result[1].label;
           speak();
           if(prediction_1 == 'Happy'){
            document.getElementById("update_emoji_1").innerHTML = "&#x1f60a;";
           }
           else
           if(prediction_1 = 'Crying'){
               document.getElementById("update_emoji_1").innerHTML = "&#128549;";
           }
           else
           if(prediction_1 = 'Angry'){
            document.getElementById("update_emoji_1").innerHTML = "&#128545;";
        }
        else
        if(prediction_1 = 'Sad'){
            document.getElementById("update_emoji_1").innerHTML = "&#128553;";
        }
        if(prediction_2 == 'Happy'){
            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
           }
           else 
           if(prediction_2 = 'Crying'){
               document.getElementById("update_emoji_2").innerHTML = "&#128549;";
           }
           else
           if(prediction_2 = 'Angry'){
            document.getElementById("update_emoji_2").innerHTML = "&#128545;";
        }
        else
        if(prediction_2 = 'Sad'){
            document.getElementById("update_emoji_2").innerHTML = "&#128553;";
        }
       }
   }

   