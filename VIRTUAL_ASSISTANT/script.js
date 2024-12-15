let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")



function speak(message) {
    const speech = new SpeechSynthesisUtterance(message); // Create a speech synthesis object
    speech.lang = "hi-IN"; // Set the language to Hindi (India)
    window.speechSynthesis.speak(speech); // Use window.speechSynthesis
}


function wishMe() {
    let day = new Date();
    let hours = day.getHours(); // Correctly declared as 'hours'
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) { // Adjusted range to hours < 16 for afternoon
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}
window.addEventListener('load', () => {
    wishMe();
});






let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript; // Display the recognized text
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

recognition.onerror = (event) => {
    console.error("Error occurred in speech recognition:", event.error);
    btn.style.display = "flex";
    voice.style.display = "none";
    speak("Sorry, I couldn't understand that. Please try again.");
};

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Priya.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("https://www.online-calculator.com/");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else {
        let finalText = `This is what I found on the internet regarding ${message.replace("nexa", "").trim()}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("nexa", "").trim()}`, "_blank");
    }
}

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US"; // Set the language
    window.speechSynthesis.speak(speech);
}


