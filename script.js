const startBtn = document.getElementById("startBtn");
const homeIcecream = document.getElementById("homeIcecream");

const homePage = document.getElementById("homePage");
const customPage = document.getElementById("customPage");
const finalPage = document.getElementById("finalPage");

const flavorSelect = document.getElementById("flavorSelect");
const styleSelect = document.getElementById("styleSelect");

const scoop = document.getElementById("previewScoop");
const base = document.getElementById("previewBase");
const toppingsDiv = document.getElementById("toppings");
const totalPrice = document.getElementById("totalPrice");

const basePrice = 1;
const toppingPrice = 0.5;

startBtn.onclick = goToBuilder;
homeIcecream.onclick = goToBuilder;

function goToBuilder(){
  homePage.classList.remove("active");
  customPage.classList.add("active");
  updatePrice();
}

/* FLAVOR */

flavorSelect.onchange = ()=>{
  scoop.style.background = flavorSelect.value;
  scoop.style.transform = "scale(1.06)";
  setTimeout(()=>{
    scoop.style.transform = "scale(1)";
  },200);
};

/* STYLE */

styleSelect.onchange = ()=>{

  if(styleSelect.value === "cup"){
    base.className = "preview-cup";
  }else{
    base.className = "preview-cone";
  }

  updatePrice();
};

/* TOPPINGS */

document.querySelectorAll("input[type=checkbox]")
.forEach(cb=>{
  cb.onchange = ()=>{
    renderToppings();
    updatePrice();
  };
});

function renderToppings(){

  toppingsDiv.innerHTML = "";

  document.querySelectorAll("input[type=checkbox]:checked")
  .forEach(cb=>{

    let count = 15;

    if(cb.value === "cookie") count = 5;
    if(cb.value === "chips") count = 14;
    if(cb.value === "sprinkles") count = 30;
    if(cb.value === "nuts") count = 16;

    for(let i=0;i<count;i++){

      const t = document.createElement("div");
      t.classList.add("topping");

      const rotate = Math.floor(Math.random() * 360) + "deg";

      t.style.left = 30 + Math.random()*160 + "px";
      t.style.top = 20 + Math.random()*130 + "px";
      t.style.setProperty("--rot", rotate);
      t.style.animationDelay = (i * 0.035) + Math.random() * 0.15 + "s";

      /* BISCUIT STICKS */
      if(cb.value==="cookie"){
        t.style.width="14px";
        t.style.height="72px";
        t.style.background="linear-gradient(90deg,#7b431f,#d99b5f,#f1c184,#8a4d27)";
        t.style.borderRadius="14px";
        t.style.boxShadow="inset 2px 0 3px rgba(255,255,255,0.35), inset -2px 0 3px rgba(80,35,10,0.35), 0 6px 12px rgba(0,0,0,0.22)";
      }

      /* CHOCOLATE CHIPS */
      if(cb.value==="chips"){
        t.style.width="14px";
        t.style.height="14px";
        t.style.background="radial-gradient(circle at 35% 30%, #9a6742 0%, #5a301b 45%, #261007 100%)";
        t.style.borderRadius="50% 50% 45% 55%";
        t.style.boxShadow="inset 2px 2px 3px rgba(255,255,255,0.18), 0 5px 8px rgba(0,0,0,0.25)";
      }

      /* RAINBOW SPRINKLES */
      if(cb.value==="sprinkles"){
        const colors = ["#ff3b6b","#28a8ff","#ffd60a","#2dd36f","#ff8ad8","#8f5cff","#ff8c1a"];

        t.style.width="6px";
        t.style.height="20px";
        t.style.background=colors[Math.floor(Math.random()*colors.length)];
        t.style.borderRadius="20px";
        t.style.boxShadow="inset 1px 1px 2px rgba(255,255,255,0.35), 0 3px 5px rgba(0,0,0,0.16)";
      }

      /* NUTS */
      if(cb.value==="nuts"){
        const nutColors = ["#f6bd60","#c98f4a","#e9c46a","#b8793b"];

        t.style.width= 11 + Math.random()*7 + "px";
        t.style.height= 8 + Math.random()*6 + "px";
        t.style.background=nutColors[Math.floor(Math.random()*nutColors.length)];
        t.style.borderRadius="55% 45% 60% 40%";
        t.style.boxShadow="inset 2px 1px 2px rgba(255,255,255,0.32), 0 4px 7px rgba(0,0,0,0.2)";
      }

      toppingsDiv.appendChild(t);
    }

  });

}

function updatePrice(){
  const checkedCount = document.querySelectorAll("input[type=checkbox]:checked").length;
  let price = basePrice + checkedCount * toppingPrice;

  if(styleSelect.value === "cup"){
    price += 0.5;
  }

  totalPrice.textContent = "$" + price.toFixed(2);
}

/* DONE */

document.getElementById("doneBtn").onclick = ()=>{

  customPage.classList.remove("active");
  finalPage.classList.add("active");

  const selectedFlavor = flavorSelect.options[flavorSelect.selectedIndex].text;
  const selectedStyle = styleSelect.options[styleSelect.selectedIndex].text;
  const checkedToppings = [...document.querySelectorAll("input[type=checkbox]:checked")]
    .map(input => input.nextElementSibling.textContent)
    .join(", ");

  document.getElementById("finalBox").innerHTML = `

    <div class="final-card">

      <h1>Enjoy Your IceCreamy 🍦</h1>

      <p>
        ${selectedStyle} • ${selectedFlavor}
        ${checkedToppings ? " • " + checkedToppings : ""}
      </p>

      <div class="icecream-preview">
        ${document.getElementById("icecreamPreview").innerHTML}
      </div>

      <p class="price">Final Price: <span>${totalPrice.textContent}</span></p>

      <div class="final-actions">
        <button onclick="location.reload()">New Order ✨</button>
        <button class="secondary-btn" onclick="alert('Order placed successfully 🍦')">Place Order</button>
      </div>

    </div>

  `;

};

renderToppings();
updatePrice();