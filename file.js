let input = document.querySelector("input#input-field"),
  buttonsDiv = input.nextElementSibling,
  resultsSpan = document.querySelector(".localStorage-container .results span");

window.onload = () => {input.focus()};

input.onfocus = function () {
  this.setAttribute("data-temp", this.getAttribute("placeholder"));
  this.removeAttribute("placeholder");
};

input.onblur = function () {
  this.setAttribute("placeholder", this.dataset.temp);
  this.removeAttribute("data-temp");
};

Array.from(buttonsDiv.children).forEach((button) => {
  button.addEventListener("click", function () {
    if (this.classList.contains("check-item")) {
      resultsSpan.innerHTML = "";
      if (input.value !== "") {
        let i;
        for (i = 0; i < localStorage.length; i++) {
          if (window.localStorage.key(i) == input.value) {
            resultsSpan.innerHTML = `Item <span>${window.localStorage.key(i)}</span> is found!`;
            break;
          }
        }
        if (i >= localStorage.length) resultsSpan.textContent = "This item doesn't exist!";
      } else resultsSpan.textContent = "Please enter a valid item name first!";
    }
    else if (this.classList.contains("add-item")) {
      resultsSpan.innerHTML = "";
      if (input.value !== "") {
        window.localStorage.setItem(input.value, "temp");
        resultsSpan.innerHTML = `Item: <span>${input.value}</span> has been successfully added!`;
        setTimeout(() => {resultsSpan.textContent = "No data to show yet!"}, 1500);
        input.value = "";
        input.focus();
      } else resultsSpan.textContent = "Please enter a valid item name first!";
    }
    else if (this.classList.contains("delete-item")) {
      resultsSpan.innerHTML = "";
      if (input.value !== "") {
        let i;
        for (i = 0; i < localStorage.length; i++) {
          if (window.localStorage.key(i) == input.value) {
            resultsSpan.innerHTML = `Item <span>${window.localStorage.key(i)}</span> is successfully deleted!`;
            localStorage.removeItem(window.localStorage.key(i))
            break;
          }
        }
        if (i >= localStorage.length) resultsSpan.textContent = "This item doesn't exist!";
      } else resultsSpan.textContent = "Please enter a valid item name first!";
    }
    else if (this.classList.contains("show-all")) {
      if (localStorage.length > 0) {
        resultsSpan.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
          let span = document.createElement("span");

          resultsSpan.append(`Item: `);
          span.append(`${window.localStorage.key(i)}`);
          resultsSpan.appendChild(span);
          resultsSpan.appendChild(document.createElement("br"));
        }

        for (let [key, value] of Object.entries(localStorage)) console.log(`Key: ${key}, Value: ${value}`);
      } else resultsSpan.innerHTML = `No items were found, local storage is empty!`;
    }
    else if (this.classList.contains("clear-items")) {
      window.localStorage.clear();
      resultsSpan.innerHTML = "Local storage has been successfully cleared!";
      setTimeout(() => {resultsSpan.innerHTML = "No data to show yet!"}, 1500);
    }
  });
});
