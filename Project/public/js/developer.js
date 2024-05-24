function limitText(field, maxChar) 
{

    var forbiddenWords = ["ПІЗД","ПІЗд","ПІзд","Пізд","БлЯ","беля","БЕЛЯ","БЛЯТЬ","БЛЯть","БЛя","ХуЙ","ХУй","ХУЙ", "Хуй", "блядь", "блять", "сволочь", "Ы", "далбайоб", "діздець", "хуй", "гавно", "жопа", "мудак", "підар", "шлюха", "срака", "курва", "fuck", "shit", "asshole", "bitch", "dickhead", "dick" , "bastard", "motherfucker", "ass" , "pussy", "бля", "збс" , "заїбісь" , "пізд" , "пзд" , "сук" , "пизда", "хуй", "говно", "мудак", "сука", "жопа", "ебать", "пидор" , "ё", "Ё"];                  

    if (field.value.length > maxChar) {
        field.value = field.value.substring(0, maxChar);
    } for (var i = 0; i < forbiddenWords.length; i++) {
        if (field.value.includes(forbiddenWords[i])) {
            alert("Це слово заборонене для використання");
            field.value--;
            field.value = field.value.substring(0, maxChar);
            break; 
        }
    }

}
function limitText(field, maxChars) {
    if (field.value.length > maxChars) {
        field.value = field.value.substring(0, maxChars);
    }
}
function limitText(field, maxChar) 
{

var forbiddenWords = ["ПІЗД","ПІЗд","ПІзд","Пізд","БлЯ","беля","БЕЛЯ","БЛЯТЬ","БЛЯть","БЛя","ХуЙ","ХУй","ХУЙ", "Хуй", "блядь", "блять", "сволочь", "Ы", "далбайоб", "діздець", "хуй", "гавно", "жопа", "мудак", "підар", "шлюха", "срака", "курва", "fuck", "shit", "asshole", "bitch", "dickhead", "dick" , "bastard", "motherfucker", "ass" , "pussy", "бля", "збс" , "заїбісь" , "пізд" , "пзд" , "сук" , "пизда", "хуй", "говно", "мудак", "сука", "жопа", "ебать", "пидор" , "ё", "Ё"];                  

if (field.value.length > maxChar) {
field.value = field.value.substring(0, maxChar);
} for (var i = 0; i < forbiddenWords.length; i++) {
if (field.value.includes(forbiddenWords[i])) {
    alert("Це слово заборонене для використання");
    field.value--;
    field.value = field.value.substring(0, maxChar);
    break; 
}
}

}
$(function() {
$( "#switchButton" ).click(function() {
$( "#switchButton" ).addClass( "onclic", 250, validate);
});

function validate() {
setTimeout(function() {
$( "#switchButton" ).removeClass( "onclic" );
$( "#switchButton" ).addClass( "validate", 450, callback );
}, 2250 );
}
function callback() {
setTimeout(function() {
  $( "#switchButton" ).removeClass( "validate" );
}, 1250 );
}
});


let isInitialContent = true;

document.getElementById('switchButton').addEventListener('click', function() {
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = isInitialContent ? newContent : initialContent;
    isInitialContent = !isInitialContent;
});




document.getElementById('uploadButton').addEventListener('click', () => {
const fileInput = document.getElementById('fileInput');
const files = fileInput.files;

if (files.length > 0) {
const filesArray = [];

Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        filesArray.push({
            name: file.name,
            content: fileContent
        });
        
        if (filesArray.length === files.length) {
            localStorage.setItem('gameFiles', JSON.stringify(filesArray));
            alert('Файли завантажено і збережено в localStorage');
        }
    };
    reader.readAsText(file);
});
} else {
alert('Будь ласка, виберіть файли.');
}
});