//crocodile scanner - skanuje linki do portali informacyjnych w postach i zamienia je na ikonke krokodyla jeśli go wykryje
const searchString = "tvp.info/13977779";
const websiteContent = document.getElementsByTagName('body')[0].innerHTML;
let newContent = websiteContent.replace(searchString, '🐊');
document.getElementsByTagName('body')[0].innerHTML = newContent;
