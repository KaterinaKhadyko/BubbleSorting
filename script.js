var formHolder = document.getElementById("form-holder");
var form = document.getElementById("myForm");
var contentHolder = document.getElementById("content");
var userArray = [];
var info = document.createElement("span");
var checkArray = function (array) {
	if (userArray.length > 1) {
		for (var i = 0; i < userArray.length; i++) {
	  		if (isNaN(+userArray[i]) || userArray[i] == "") {
	  			return false;
	  		}
	  	} 
	} else {
		return false;
	}
	return true;
}
var buildInterface = function () {
  userArray = form.elements.text.value.split(",");  
  form.elements.text.value = "";
  formHolder.classList.add("hidden");
  event.preventDefault();
  if (checkArray(userArray)) {
  	var numbersHolder = document.createElement("div");
  	var message = document.createElement("h1");
  	message.innerText = "Your numbers:";
  	numbersHolder.appendChild(message);
  	var numbersUl = document.createElement("ul");
  	for (var i = 0; i < userArray.length; i++) {
		var numbersLi = document.createElement("li");
  		numbersLi.innerText = Number(userArray[i]);
  		numbersUl.appendChild(numbersLi);
  	}
  	numbersHolder.appendChild(numbersUl);
  	var buttonsHolder = document.createElement("div");
  	buttonsHolder.className = "buttonsHolder";
	var cancelButton = document.createElement("button");
	cancelButton.innerText = "cancel";
	buttonsHolder.appendChild(cancelButton);

	var isSwitched = false;
	cancelButton.onclick = function () {
		formHolder.classList.remove("hidden");
		numbersHolder.parentNode.removeChild(numbersHolder);
		};

	var nextButton = document.createElement("button");
	nextButton.innerText = "next";
	buttonsHolder.appendChild(nextButton);
	var clickCounter = 0;
	var liElements = numbersHolder.getElementsByTagName("li");
	var lastCompareIndex = liElements.length - 1;

	nextButton.onclick = function () {
		for (var i = 0; i < liElements.length; i++) {
			if (isSwitched) {

				if (liElements[i].classList.contains("current") && liElements[i].classList.contains("changing")) {
					liElements[i].classList.add("changed");
				} else {
					liElements[i].classList.remove("changed");
				}
			}
			liElements[i].classList.remove("current");
			liElements[i].classList.remove("changing");
		}
		isSwitched = false;
		var temp = 0;
		if (clickCounter >= lastCompareIndex) {
			lastCompareIndex--;
			clickCounter = 0;
		}
		if (lastCompareIndex == 0) {
			numbersUl.classList.add("changed");
			message.innerText = "Numbers are sorted!";
			nextButton.parentNode.removeChild(nextButton);
			cancelButton.innerText = "try again";
		} else {
			var currentItem = liElements[clickCounter];
			var nextItem = liElements[clickCounter + 1];
			currentItem.classList.add("current");
			nextItem.classList.add("current");
			if (Number(currentItem.innerText) > Number(nextItem.innerText)) {
				currentItem.classList.add("changing");
				nextItem.classList.add("changing");
				temp = Number(currentItem.innerText);
				currentItem.innerText = nextItem.innerText;
				nextItem.innerText = temp;
				isSwitched = true;
			}
			clickCounter++;			
		}
	};
	numbersHolder.appendChild(buttonsHolder);
	contentHolder.appendChild(numbersHolder);
	} else {
		formHolder.classList.remove("hidden");
		info.innerText = "Incorrect values. Please, enter numbers";
		formHolder.appendChild(info);
	}
};
form.addEventListener("submit", function() {
	buildInterface();
});