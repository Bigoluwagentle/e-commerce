const apiUrl = "http://127.0.0.1:5500/product-list-with-cart-main/data.json";
const article = document.querySelector("article");
const b = document.querySelector("#b");
const addCart = document.querySelector(".addCart");
const emptyCart = document.querySelector(".emptyCart");
const footer = document.querySelector("#footer");
const total = document.querySelector("#total");
const confirm = document.getElementById("confirm");
const wrapper = document.getElementById("wrapper");
const confirmAside = document.querySelector("#confirmAside");
let counter = 0;
let count = 1;
let cart = ["0", "0", "0"];
let totalCost = cart.reduce((acc, current) => acc + parseFloat(current), 0);
console.log(totalCost)
async function update() {
    const response = await fetch(apiUrl);
    var api = await response.json();
    console.log(api);
    for(i = 0; i < api.length; i++){
        const updateNav = document.createElement("nav");
        const updateImg = document.createElement("img");
        updateImg.src = api[i].image.desktop;

        const updateDiv = document.createElement("div");
        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Add To Cart";
        // updateButton[0].style.display = "none";
        updateButton.onclick = function(){
            counter++;
            b.innerHTML = `${counter}`;
            emptyCart.style.display = "none";
            addCart.style.display = "block";

            const summary = document.createElement("summary");
            const summaryImage = document.createElement("img");
            summaryImage.onclick = function(){
                counter--;
                b.innerHTML = `${counter}`;
                summary.style.display = "none";
                if(b.innerHTML === "0"){
                    emptyCart.style.display = "flex";
                    addCart.style.display = "none";
                }
                header.style.display = "none";
                updateButton.style.display = "flex";
            }
            summaryImage.src = "assets/images/icon-remove-item.svg";

            const summaryH4 = document.createElement("h4");
            summaryH4.innerHTML = updateLi.innerHTML;

            const summaryLabel = document.createElement("label");
            summaryLabel.id = "quantity";
            summaryLabel.innerHTML = "1x";

            const summarySpan = document.createElement("span");
            summarySpan.innerHTML = "@ $" + updateAe;

            const summarytotalAdd = document.createElement("label");
            summarytotalAdd.id = "totalAdd";
            summarytotalAdd.innerHTML = updateA.innerHTML;

            summary.append(summaryImage, summaryH4, summaryLabel, summarySpan, summarytotalAdd);
            addCart.append(summary, footer);
            const header = document.createElement("header");
            const headerDecrease = document.createElement("img");
            headerDecrease.src = "assets/images/icon-decrement-quantity.svg";
            headerDecrease.style.padding = "5px";
            headerDecrease.style.borderRadius = "100px";
            headerDecrease.style.border = "1px solid hsl(13, 31%, 94%)";
            headerDecrease.onclick = function(){
                if(count > 1){
                    count--;
                    headerCount.textContent = `${count}`;
                    let summaryLabe = `${count}`;
                    summaryLabel.textContent = summaryLabe + "x";
                    let summarytotalAd = summaryLabe * updateAe;
                    summarytotalAdd.textContent = "$" +  summarytotalAd.toFixed(2);
                }
            }

            const headerCount = document.createElement("p");
            headerCount.style.color = "white";
            headerCount.innerHTML = "1";

            const headerIncrease = document.createElement("img");
            headerIncrease.src = "assets/images/icon-increment-quantity.svg";
            headerIncrease.style.padding = "5px";
            headerIncrease.style.borderRadius = "100px";
            headerIncrease.style.border = "1px solid hsl(13, 31%, 94%)";
            let summarytotalA = 0;
            headerIncrease.onclick = function(){
                count++;
                headerCount.textContent = `${count}`;
                let summaryLab = `${count}`;
                summaryLabel.textContent = summaryLab + "x";
                summarytotalA = `${count}` * updateAe;
                summarytotalAdd.innerHTML = summarytotalA;
                totalCost += parseFloat(summarytotalAdd.innerHTML);
                console.log(totalCost);
                total.innerHTML = "$" +  totalCost;
            }

            header.append(headerDecrease, headerCount, headerIncrease);
            header.id = "header";
            updateDiv.onclick = function(){
                updateDiv.appendChild(header);
                updateButton.style.display = "none";
            }
            totalCost += parseFloat(summarytotalAdd.innerHTML) ;
            console.log(totalCost);
            total.innerHTML = "$" + totalCost;

            const confirmSummary = document.createElement("summary");
            const confirmImage = document.createElement("img");
            confirmImage.src = updateImg.src;
            const confirmDiv = document.createElement("div");
            const confirmLi = document.createElement("li");
            confirmLi.innerHTML = summarytotalAdd.innerHTML;
            const confirmH4 = document.createElement("h4");
            confirmH4.innerHTML = summaryH4.innerHTML;
            const confirmSpan = document.createElement("span");
            confirmSpan.innerHTML = summaryLabel.textContent;
            const confirmLabel = document.createElement("label");
            confirmLabel.innerHTML = summarySpan.innerHTML;

            confirmDiv.append(confirmLi, confirmH4, confirmSpan, confirmLabel);
            confirmSummary.append(confirmImage, confirmDiv);
            confirmAside.appendChild(confirmSummary);

            confirm.onclick = function(){
                wrapper.style.display = "flex";
                const confirmFooter = document.createElement("footer");
                const confirmH42 = document.createElement("h4");
                confirmH42.innerHTML = "Order Total";
                const confirmP = document.createElement("p");
                confirmP.innerHTML = total.innerHTML;
                confirmAside.appendChild(confirmFooter);
                confirmFooter.append(confirmH42, confirmP);
            }
        }

        const updateImage = document.createElement("img");
        updateImage.src = "assets/images/icon-add-to-cart.svg";

        const updateLi = document.createElement("li");
        updateLi.innerHTML = api[i].category;
        
        const updateP = document.createElement("p");
        updateP.innerHTML = api[i].name;

        const updateA = document.createElement("a");
        let updateAe = api[i].price;
        updateA.innerHTML = updateAe;
        // updateA.innerHTML = "$" + updateAe;

        updateButton.appendChild(updateImage);
        updateDiv.append(updateButton, updateLi, updateP, updateA);
        updateNav.append(updateImg, updateDiv);
        article.appendChild(updateNav);

        if(window.innerWidth === "1000"){
            updateImg.src = api[i].image.thumbnail;
        }if(window.innerWidth === "860"){
            updateImg.src = api[i].image.tablet;
        }
        
    }
}
update();
window.onresize = function(){
    document.getElementById("check").innerHTML = window.innerWidth;
}