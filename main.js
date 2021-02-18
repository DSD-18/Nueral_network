Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90 
});

Webcam.attach("#camera")

function take_snapshot()
{
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src='"+ data_uri+"'> ";
    })
};
var prediction1,prediction2;
function speak(){
    var synth = window.speechSynthesis;
    data1="The first prediction is"+prediction1;
    data2="The second prediction is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utterthis);
}
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modalloaded);
function modalloaded(){
    console.log("modalloaded");
};

function check(){
    img = document.getElementById("capture_image");
    Classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("name1").innerHTML= results[0].label;
        document.getElementById("name2").innerHTML= results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(prediction1 == "happy"){
            document.getElementById("emoji1").innerHTML = "&#128512;";
        }
        if(prediction2 == "happy"){
            document.getElementById("emoji2").innerHTML = "&#128512;";
        }
        if(prediction1 == "sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if(prediction2 == "sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;";
        }
        if(prediction1 == "angry"){
            document.getElementById("emoji1").innerHTML = "&#128548;";
        }
        if(prediction2 == "angry"){
            document.getElementById("emoji2").innerHTML = "&#128548;";
        }
    }
}