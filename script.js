function emptyInput(nameElem) {
  let form = document.querySelector(".form");
  let element = form.elements[nameElem];

  if (element.classList.contains("empty") == false) {
    element.classList.add("empty");
  }
}


function validateInput(weight, height) {
  if (weight === 0 && height === 0) {
    emptyInput("weight");
    emptyInput("height");
    return false;
  }
  else if (weight === 0) {
    emptyInput("weight");
    return false;
  }
  else if (height === 0) {
    emptyInput("height");
    return false;
  }
  else {
    return true;
  }
}


function defineHeathCondition(bmi) {
  let healthCondition = "";

  const groups = [
    [0, 18.5, "ABAIXO DO PESO"],
    [18.5, 25, "PESO NORMAL"],
    [25, 30, "SOBREPESO"],
    [30, 35, "OBESIDADE GRAU 1"],
    [35, 40, "OBESIDADE GRAU 2"],
    [40, 100, "OBESIDADE GRAU 3"]
  ];

  for (let contExternal = 0; contExternal < groups.length; contExternal++) {
    groupCondition = groups[contExternal];

    for (let contInternal = 0; contInternal < groupCondition.length; contInternal++) {
      if (bmi >= groupCondition[0] && bmi < groupCondition[1]) {
        healthCondition = groupCondition[2];
      }
    }
  }

  return healthCondition;
}


function createElement(tag, className) {
  let element = document.createElement(tag);

  for (let cont = 0; cont < className.length; cont++) {
    element.classList.add(className[cont]);
  }

  return element;
}


function configureButton(element) {
  let textButton = document.createTextNode("Fechar");
  element.appendChild(textButton);

  element.addEventListener("click", () => {
    let messageBox = document.querySelector(".container__opacity");
    messageBox.parentElement.removeChild(messageBox);
  
    let form = document.querySelector(".form");
    let weightInput = form.elements["weight"];
    let heightInput = form.elements["height"];

    weightInput.value = null;
    heightInput.value = null;

    if (weightInput.classList.contains("empty") == true) {
      weightInput.classList.remove("empty");
    }

    if (heightInput.classList.contains("empty") == true) {
      heightInput.classList.remove("empty");
    }
  });
}


function insertPopupELements(bmi, healthCondition) {
  let popupDiv = createElement("div", ["popup"]);

  let bmiResultParagraph = createElement("p", ["popup__complement"]);

  let messageDiv = createElement("div", ["popup__message", "message"]);
  let messageComplementParagraph = createElement("p", ["message__text"]);
  let healthConditionParagraph = createElement("p", ["message__text", "message__text--status"]);

  let bmiResultText = document.createTextNode("IMC: " + bmi.toFixed(2));
  bmiResultParagraph.appendChild(bmiResultText);
  popupDiv.appendChild(bmiResultParagraph);

  let messageComplementText = document.createTextNode("Seu quadro é");
  messageComplementParagraph.appendChild(messageComplementText);
  messageDiv.appendChild(messageComplementParagraph);

  let healthConditionText = document.createTextNode(healthCondition);
  healthConditionParagraph.appendChild(healthConditionText);
  messageDiv.appendChild(healthConditionParagraph);

  popupDiv.appendChild(messageDiv);

  let popupCloseButton = createElement("button", ["popup__button"]);
  configureButton(popupCloseButton);
  popupDiv.appendChild(popupCloseButton);

  return popupDiv;
}


function printMessage(weight, height) {
  const bmi = weight / Math.pow(height, 2);
  const healthCondition = defineHeathCondition(bmi);

  let opacityDiv = createElement("div", ["container__opacity"]);
  let popup = insertPopupELements(bmi, healthCondition);
  opacityDiv.appendChild(popup);

  let body = document.querySelector(".body");
  body.appendChild(opacityDiv);
}


function getData(event) {
  event.preventDefault();

  let form = document.querySelector(".form");
  let weightInput = form.elements["weight"];
  let heightInput = form.elements["height"];

  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  let isValid = validateInput(weight, height);

  if (isValid == true) {
    printMessage(weight, height);
  }
}
