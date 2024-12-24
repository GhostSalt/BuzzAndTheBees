let doc = document;
document.addEventListener('DOMContentLoaded', () => {
for (let puzz of Array.from(document.querySelectorAll('.puzzle')))
{
	puzz.innerHTML = "<div class=\"ans-check-div\"></div>" + puzz.innerHTML;
	const checker = "Check answer: <input class=\"answer-checker\" type=\"text\" placeholder=\"Answer\"></input> <button class=\"ans-check-btn\">Check</button><span class=\"ans-check-message\"><br />&nbsp;</span>";
	const funny = ["Correct!", "Correct again!", "Wow, correct three times!", "Another one!", "Woah, you're so smart!", "How is this possible?!", "You're doing so well!!", "Keep it up!!", "You're still going!!", "MOAR CORRECTNESS!!!", "CORRECTALITY!!!", "DOUBLE CORRECTALITY!!!", "TRIPLE CORRECTALITY!!!", "ULTRA CORRECTALITY!!!", "LACK OF MORE DIALOGUE!!!", "Seriously, I'm starting to run thin on the dialogue.", "You can stop being correct now.", "Ooh, I have an idea.", "Have a smiley face instead!", ":D"]
	let val = 0;
	let div = puzz.getElementsByClassName('ans-check-div')[0];
	div.innerHTML = checker;
	let inp = puzz.getElementsByClassName('answer-checker')[0],
	btn = puzz.getElementsByClassName('ans-check-btn')[0],
	msg = puzz.getElementsByClassName('ans-check-message')[0];
	btn.innerText = 'Check';
	function handleSub()
	{
		let inpVal = Array.from(inp.value.toUpperCase()).filter(x => x.charCodeAt(0) >= 65 && x.charCodeAt(0) < 65+26).join(''); //Allow uppercase ONLY
		let sol = Array.from(puzz.dataset.solution.toUpperCase()).filter(x => x.charCodeAt(0) >= 65 && x.charCodeAt(0) < 65+26).join(''); //Allow uppercase ONLY
		let rel;
		if (puzz.dataset.relevant !== undefined && puzz.dataset.relevant !== null)
			rel = Array.from(puzz.dataset.relevant.toUpperCase().split(',')).map(x => Object.values(x).filter(y => y.charCodeAt(0) >= 65 && y.charCodeAt(0) < 65+26).join('')); //Allow uppercase ONLY
		else
			rel = "";
		inp.value = Array.from(inp.value.toUpperCase()).filter(x => (x.charCodeAt(0) >= 65 && x.charCodeAt(0) < 65+26)|| x.charCodeAt(0) == 32).join(''); //Allow uppercase AND spaces
		if (inpVal === "")
			msg.innerHTML = "<br /><p class=\"check-response\" style=\"color: #A00;\">Please enter an answer.</p>";
		else if (inpVal === sol)
		{
			msg.innerHTML = "<p p class=\"check-response\" style=\"color: #0A0;\">" + funny[val] + "</p>";
			inp.value = puzz.dataset.solution;
		}
		else if (rel.includes(inpVal))
		{
			msg.innerHTML = "<p p class=\"check-response\" style=\"color: #AA0;\">That's relevant, but not the final answer!</p>";
			inp.value = puzz.dataset.relevant.split(',')[rel.indexOf(inpVal)];
		}
		else
			msg.innerHTML = "<br /><p p class=\"check-response\" style=\"color: #A00;\">Incorrect.</p>";
		if (inpVal === sol)
		{
			if (val != funny.length - 1)
				val++;
		}
		else
			val = 0;
		return false;
	}
	inp.onkeydown = x => x.keyCode !== 13 ? true : handleSub();
	btn.onclick = handleSub;
}
});