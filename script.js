var formHolder = document.getElementById("form-holder");
var form = document.getElementById("myForm");
var numbersHolder = document.getElementById("numbers-holder");
var info = document.getElementById("info");
var numbersHolder = document.getElementById("numbers-holder");
var message = numbersHolder.getElementsByTagName("h1")[0];
var numbersList = document.getElementById("numbers-list");
var cancelButton = document.getElementById("cancel-button");
var nextButton = document.getElementById("next-button");
var tryAgainButton = document.getElementById("try-again-button");

var checkArray = function (array) { //logic
	if (array.length > 1) {
		for (var i = 0; i < array.length; i++) {
	  		if (isNaN(+array[i]) || array[i] == "") {
	  			return false;
	  		}
	  	} 
	} else {
		return false;
	}
	return true;
}

function compareElementsValue(element1, element2) { //logic
	var temp = 0;
	return (+element1.innerText > +element2.innerText);
}
	

function createListOfNumbers (userNumbers, parentElement) { //view
	var ulElement = document.createElement("ul");
  	for (var i = 0; i < userNumbers.length; i++) {
		var numbersLi = document.createElement("li");
  		numbersLi.innerText = Number(userNumbers[i]);
  		ulElement.appendChild(numbersLi);
  	}
  	parentElement.appendChild(ulElement);
}

function clearNumbersUl (parentElement) { //view
	var numbersUl = parentElement.getElementsByTagName("ul")[0];
	if (numbersUl !== undefined) {
		numbersUl.parentNode.removeChild(numbersUl);		
	}
}

function classesReAssignment (elements, switchedOrNot) { //view
	for (var i = 0; i < elements.length; i++) {
		if (switchedOrNot) {
			if (elements[i].classList.contains("current") && elements[i].classList.contains("changing")) {
				elements[i].classList.add("changed");
			} else {
				elements[i].classList.remove("changed");
			}
		}
		elements[i].classList.remove("current");
		elements[i].classList.remove("changing");
	}
}

function addClass (elements, nameOfClass) { //view
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.add(nameOfClass);
	}
}

function alreadySorted () { //view
	numbersUl = numbersList.getElementsByTagName("ul")[0];
	numbersUl.classList.add("changed");
	message.innerText = "Numbers are sorted!";
	nextButton.classList.add("hidden");
	cancelButton.classList.add("hidden");
	tryAgainButton.classList.remove("hidden");
}

function incorrectValues () { //view
	formHolder.classList.remove("hidden");
	info.innerText = "Incorrect values. Please, enter numbers";
	formHolder.appendChild(info);
}

function newSoring() { //view
	formHolder.classList.remove("hidden");
	numbersHolder.classList.add("hidden");
	clearNumbersUl(numbersList);
};

cancelButton.onclick = newSoring;
tryAgainButton.onclick = function () {
	tryAgainButton.classList.add("hidden");
	cancelButton.classList.remove("hidden");
	newSoring();
};

var buildInterface = function () {
  var userArray = form.elements.text.value.split(",");  
  form.elements.text.value = "";
  formHolder.classList.add("hidden");
  numbersHolder.classList.remove("hidden");

  nextButton.classList.remove("hidden");

  if (checkArray(userArray)) {
  	createListOfNumbers(userArray, numbersList);

	var isSwitched = false;
	var clickCounter = 0;
	var liElements = numbersHolder.getElementsByTagName("li");
	var lastCompareIndex = liElements.length - 1;

	nextButton.onclick = function () {
		classesReAssignment(liElements, isSwitched);
		isSwitched = false;
		if (clickCounter >= lastCompareIndex) {
			lastCompareIndex--;
			clickCounter = 0;
		}
		if (lastCompareIndex === 0) {
			alreadySorted();
		} else {
			var currentItem1 = liElements[clickCounter];
			var currentItem2 = liElements[clickCounter + 1];
			addClass([currentItem1, currentItem2], "current");
			if (compareElementsValue(currentItem1, currentItem2)) {
				addClass([currentItem1, currentItem2], "changing");
				temp = currentItem1.innerText;
				currentItem1.innerText = currentItem2.innerText;
				currentItem2.innerText = temp;
				isSwitched = true;
			}
			clickCounter++;			
		}
	};
	} else {
		incorrectValues();
	}
};
form.addEventListener("submit", function(event) {
	event.preventDefault();
	buildInterface();
});