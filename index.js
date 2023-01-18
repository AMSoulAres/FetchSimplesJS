import Db from "./dbController.js";
import Storage from "./localStorage.js";

const removeSpan = (id) => {
  if (document.querySelector(`#${id}Span`))
    document.querySelector(`#${id}Span`).remove();
};

function isANumber(str) {
  return !/^[0-9]/.test(str);
}

function inputData() {
  let form = {};
  event.preventDefault();
  let allCheck = true;
  document.querySelectorAll(".formItem").forEach((item) => {
    if (item.value) {
      if (item.id === "name") {
        form.name = item.value;
        removeSpan(item.id);
      }
      if (item.id === "price") {
        if (isANumber) {
          form.price = item.value;
        }
        removeSpan(item.id);
      }
      if (item.id === "description") {
        removeSpan(item.id);
        if (item.value.length > 0) {
          form.description = item.value;
          removeSpan(item.id);
        }
      }
    } else {
      const span = `<br>
                      <span id="${item.id}Span" style="color:red;">Campo Obrigatório</span>`;
      if (!document.querySelector(`#${item.id}Span`)) {
        document.querySelector(`#${item.id}Label`).innerHTML += span;
      }
    }
  });

  if (form.length > 0) {
    for (item in form) {
      if (!form[item]) {
        allCheck = false;
      }
    }
  }

  if (allCheck && form.name && form.price && form.description) {
    let update = false;
    Db.getAll().then(lista => {
      if(lista.length > 0){
        lista.forEach(item=>{
          if(item.name == form.name){
            Db.update(item.id, form).then(renderCardapio);
            update = true
          }
        })
      }
      if(!update){
        Db.addItem(form).then(renderCardapio);
      }
    })
  }
}

function renderCardapio() {
  Db.getAll().then((lista) => {
    if (lista.length > 0) {
      if (document.querySelector("#noElements")) {
        document.querySelector("#noElements").remove();
      }
      criaLista(lista);
    } else {
      document.querySelector(
        ".drinks"
      ).innerHTML += `<ul id="noElements">No elements yet.</ul>`;
    }
  });
}

function criaLista(list) {
  let li = document.createElement("li");

  list.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return 0;
    if (a.name == b.name) return -1;
  });

  list.forEach((item) => {
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.className = "removeButton";
    const ul = document.querySelector(".drinks");

    removeButton.onclick = () => {
      Db.remove(item.id);
      renderCardapio();
    };

    const priceHtml = document.createElement("p");
    priceHtml.className = "menuPrice";
    priceHtml.innerHTML = `R$ ${item.price}`;
    priceHtml.append(removeButton);

    const nameHtml = document.createElement("h2");
    nameHtml.className = "menuName";
    nameHtml.innerHTML = item.name;
    nameHtml.appendChild(priceHtml);

    const descHtml = document.createElement("h4");
    descHtml.className = "menuDesc";
    descHtml.innerHTML = item.description;

    li.appendChild(nameHtml).appendChild(descHtml);

    ul.appendChild(li);
  });
  Storage.add(list);
}

document.querySelector(".submit").onclick = inputData;

window.addEventListener("load", renderCardapio);
