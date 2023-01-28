//crocodile scanner
const searchString = "tvp.info/13977779";

function replaceString(websiteContent) {
  let newContent = websiteContent.replace(searchString, '🐊');
  return newContent;
}

const websiteContent = document.getElementsByTagName('body')[0].innerHTML;
let updatedContent = replaceString(websiteContent);

document.getElementsByTagName('body')[0].innerHTML = updatedContent;
