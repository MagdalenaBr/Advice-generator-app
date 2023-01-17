const diceBtn = document.querySelector(".dice");
const advice = document.querySelector(".advice");
const adviceId = document.querySelector(".advice-id");

const generateAdvice = data => {
	const resultAdvice = data.slip.advice;
	const resultId = data.slip.id;
	advice.textContent = "";
	adviceId.textContent = "";
	advice.insertAdjacentText("afterbegin", resultAdvice);
	adviceId.insertAdjacentText("afterbegin", `#${resultId}`);
};

const renderError = msg => {
	advice.insertAdjacentText("beforeend", msg);
};

const adviceRequest = async function () {
	try {
		const res = await fetch("https://api.adviceslip.com/advice");
		if (!res.ok) throw new Error(`Advice not found (${res.status})`);
		const data = await res.json();
		generateAdvice(data);
	} catch (err) {
		advice.textContent = "";
		renderError(`Something went wrong: ${err.message}. Try again!`);
	}
};

adviceRequest();
diceBtn.addEventListener("click", adviceRequest);
