const usernameInput = document.getElementById("username");

const generateBtn = document.getElementById("generateBtn");

const loadingPanel = document.getElementById("loadingPanel");
const resultPanel = document.getElementById("resultPanel");

const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

const loadingTitle = document.getElementById("loadingTitle");
const loadingText = document.getElementById("loadingText");

const selectedAmount = document.getElementById("selectedAmount");

const resultUsername = document.getElementById("resultUsername");
const resultAmount = document.getElementById("resultAmount");

const resetBtn = document.getElementById("resetBtn");

const amountButtons = document.querySelectorAll(".amount-btn");

let currentAmount = "10,000";


// ============================
// SELECT AMOUNT
// ============================

amountButtons.forEach(button => {

    button.addEventListener("click", () => {

        amountButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentAmount = button.dataset.amount;

        selectedAmount.textContent = currentAmount;

    });

});


// ============================
// GENERATE
// ============================

generateBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim();

    if (!username) {

        usernameInput.focus();

        usernameInput.parentElement.style.borderColor = "#ff3bd4";

        setTimeout(() => {
            usernameInput.parentElement.style.borderColor = "";
        }, 1000);

        return;
    }

    if (username.length < 3) {

        usernameInput.focus();

        usernameInput.parentElement.style.borderColor = "#ff3bd4";

        setTimeout(() => {
            usernameInput.parentElement.style.borderColor = "";
        }, 1000);

        return;
    }

    startGeneration(username);

});


// ============================
// GENERATION SIMULATION
// ============================

function startGeneration(username) {

    document.querySelector(".generator-card").classList.add("hidden");

    resultPanel.classList.add("hidden");

    loadingPanel.classList.remove("hidden");

    progressBar.style.width = "0%";
    progressPercent.textContent = "0%";

    let progress = 0;

    const stages = [
        {
            percent: 15,
            title: "CONNECTING...",
            text: "Establishing secure VPN connection"
        },
        {
            percent: 35,
            title: "VERIFYING...",
            text: "Checking generator session"
        },
        {
            percent: 55,
            title: "PROCESSING...",
            text: "Preparing generation request"
        },
        {
            percent: 75,
            title: "GENERATING...",
            text: "Creating simulated reward"
        },
        {
            percent: 90,
            title: "FINALIZING...",
            text: "Finishing secure session"
        }
    ];

    let stageIndex = 0;

    const interval = setInterval(() => {

        progress++;

        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;

        const nextStage = stages[stageIndex];

        if (
            nextStage &&
            progress >= nextStage.percent
        ) {

            loadingTitle.textContent = nextStage.title;
            loadingText.textContent = nextStage.text;

            stageIndex++;
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                showResult(username);

            }, 500);
        }

    }, 35);

}


// ============================
// SHOW RESULT
// ============================

function showResult(username) {

    loadingPanel.classList.add("hidden");

    resultPanel.classList.remove("hidden");

    resultUsername.textContent = username;
    resultAmount.textContent = currentAmount;

}


// ============================
// RESET
// ============================

resetBtn.addEventListener("click", () => {

    resultPanel.classList.add("hidden");

    document.querySelector(".generator-card")
        .classList.remove("hidden");

    usernameInput.value = "";

    usernameInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ============================
// ONLINE COUNTER
// ============================

const onlineCount = document.getElementById("onlineCount");

let usersOnline = 1284;

setInterval(() => {

    const change =
        Math.random() > 0.5 ? 1 : -1;

    usersOnline += change;

    if (usersOnline < 1100) {
        usersOnline = 1100;
    }

    onlineCount.textContent =
        usersOnline.toLocaleString();

}, 4000);


// ============================
// SERVICE WORKER
// ============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("VPN Roblox SW activo");
            })
            .catch(error => {
                console.log(
                    "Service Worker error:",
                    error
                );
            });

    });

}