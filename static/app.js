const chatButton = document.querySelector('.chatbtn');
const chatContent = document.querySelector('.chatdiv');
const icons = {
    isClicked: '<img src="static/icons/chatbox-icon.svg" />',
    isNotClicked: '<img src="static/icons/chatbox-icon.svg" />'
}
const chatbox = new InteractiveChatbox(chatButton, chatContent, icons);
chatbox.display();
chatbox.toggleIcon(false, chatButton);