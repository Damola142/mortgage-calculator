
function clearAll () {
	document.querySelector ("div#amount input").value = "" ;
	document.querySelector ("div#term input").value = "" ;
	document.querySelector ("div#rate input").value = "" ;
	
	document.querySelector ("button#repayment").setAttribute ("onclick", "mortgageType(this)") ;
	document.querySelector ("button#interest").setAttribute ("onclick", "mortgageType(this)") ;
	
	document.querySelector ("div[name='radioBtn']").setAttribute ("id", "notPicked") ;
	
	document.querySelector ("span#amountErr").style.display = "none" ;
	document.querySelector ("span#termErr").style.display = "none" ;
	document.querySelector ("span#rateErr").style.display = "none" ;
	document.querySelector ("span#radioErr").style.display = "none" ;
	
	document.querySelector ("span#amountUnit").style.background = "var(--slate100)" ;
	document.querySelector ("span#termUnit").style.background = "var(--slate100)" ;
	document.querySelector ("span#rateUnit").style.background = "var(--slate100)" ;
	
	
	document.querySelector ("section.result section:nth-of-type(2)").style.display = "none" ;
	document.querySelector ("section.result section:nth-of-type(1)").style.display = "block" ;
	
	document.querySelector ("div.inputField button.radioInput[name='selected']").setAttribute ("name", "") ;
}



selectedMortgageType = "" ;

function mortgageType (a) {
	selectedMortgageType = a.getAttribute ("id") ;
	a.setAttribute ("name", "selected") ;
	
	document.querySelector ("button#repayment").setAttribute ("onclick", "chooseMortgageType(this)") ;
	document.querySelector ("button#interest").setAttribute ("onclick", "chooseMortgageType(this)") ;
	
	document.querySelector ("div[name=radioBtn]").setAttribute ("id", "picked") ;
	
	document.querySelector ("span#radioErr").style.display = "none" ;
}


function chooseMortgageType (a) {
	selectedMortgageType = a.getAttribute ("id") ;
	
	document.querySelector ("div.inputField button.radioInput[name=selected]").setAttribute ("name", "") ;
	a.setAttribute ("name", "selected") ;
}


function returnState (a) {
	document.querySelector(`span#${a.getAttribute("class")}Err`).style.display = "none" ;
	
}


function returnUnitState (a) {
	document.querySelector (`span#${a.getAttribute("class")}Unit`).style.background = "var(--slate100)" ;
}





function checkValLength (a, b, c) {
	if (a.value.length > b) {
		x = a.value ;
		a.value = x.substr(0, b) ;
		a.blur () ;
	} else {}
	
	if (a.value > c) {
		a.value = c ;
		a.blur () ;
	} else {}
}




calculateCheck1 = "" ;
calculateCheck2 = "" ;
calculateCheck3 = "" ;
calculateCheck4 = "" ;

function checkVal (a, b, c) {
	if (a.value.length === 0) {
		b.style.background = "var(--red)" ;
		c.style.display = "block" ;
	} else {}
	
	
	
	
	if (a.getAttribute ("class") === "amount") {
		if (a.value.length === 0) {
			calculateCheck1 = "notChecked" ;
		} else {
			calculateCheck1 = "checked" ;
		}
	} else {}
	
	if (a.getAttribute ("class") === "term") {
		if (a.value.length === 0) {
			calculateCheck2 = "notChecked" ;
		} else {
			calculateCheck2 = "checked" ;
		}
	} else {}
	
	if (a.getAttribute ("class") === "rate") {
		if (a.value.length === 0) {
			calculateCheck3 = "notChecked" ;
		} else {
			calculateCheck3 = "checked" ;
		}
	} else {}
	
}


function calculateRepayment () {
	checkVal (document.querySelector("input.amount"), document.querySelector("input.amount + span.unit"), document.querySelector("span#amountErr")) ;
	checkVal (document.querySelector("input.term"), document.querySelector("input.term + span.unit"), document.querySelector("span#termErr")) ;
	checkVal (document.querySelector("input.rate"), document.querySelector("input.rate + span.unit"), document.querySelector("span#rateErr")) ;
	
	if (document.querySelector ("div[name=radioBtn]").getAttribute ("id") === "notPicked") {
		document.querySelector ("span#radioErr").style.display = "block" ;
		
		calculateCheck4 = "notChecked" ;
	} else {
		calculateCheck4 = "checked" ;
	}
	
	
	
	if (calculateCheck1 === "checked") {
		if (calculateCheck2 === "checked") {
			if (calculateCheck3 === "checked") {
				if (calculateCheck4 === "checked") {
					calculateRepaymentVals () ;
				} else {}
			} else {}
		} else {}
	} else {}
	
}




function calculateRepaymentVals () {
	document.querySelector ("section.result section:nth-of-type(1)").style.display = "none" ;
	document.querySelector ("section.result section:nth-of-type(2)").style.display = "block" ;
	
	document.querySelector ("a.toResult").click () ;
	
	if (selectedMortgageType === "repayment") {
		calculateRepaymentVal () ;
	} else {
		calculateInterestOnlyRepaymentVal () ;
	}
}



function calculateRepaymentVal () {
	p = document.querySelector ("input.amount").value ;
	R = document.querySelector ("input.rate").value ;
	t = document.querySelector ("input.term").value ;
	
	r = R / 1200 ;
	n = t * 12 ;
	
	pow = (1 + r) ** n ;
	
	numerator = p * r * pow ;
	denomenator = pow - 1 ;
	
	mortgageRepayment = numerator / denomenator ;
	totalRepayment = mortgageRepayment * n ;
	
	document.querySelector ("p.monthlyRepayment").textContent = displayRepayment (mortgageRepayment.toFixed(2)) ;
	document.querySelector ("p.totalRepayment").textContent = displayRepayment (totalRepayment.toFixed(2)) ;
}



function calculateInterestOnlyRepaymentVal () {
	p = document.querySelector ("input.amount").value ;
	R = document.querySelector ("input.rate").value ;
	t = document.querySelector ("input.term").value ;
	
	r = R / 1200 ;
	n = t * 12 ;
	
	mortgageRepayment = p * r ;
	totalRepayment = mortgageRepayment * n ;
	
	document.querySelector ("p.monthlyRepayment").textContent = displayRepayment (mortgageRepayment.toFixed(2)) ;
	document.querySelector ("p.totalRepayment").textContent = displayRepayment (totalRepayment.toFixed(2)) ;
}



function displayRepayment (a) {
	b = a.substr(0, (a.length - 3)) ;
	
	
	if (b.length > 6) {
		f = b.substr(0, (b.length - 6)) ;
		g = b.substr((b.length - 6), 3) ;
		h = b.substr((b.length -3), 3) ;
		i = a.substr((a.length - 2), 2) ;
		
		displayedRepayment = `£${f},${g},${h}.${i}` ;
	} else {
		if (b.length > 3) {
			c = b.substr(0, (b.length - 3)) ;
			d = b.substr((b.length - 3), 3) ;
			e = a.substr((a.length - 2), 2) ;
			
			displayedRepayment = `£${c},${d}.${e}` ;
		} else {
			displayedRepayment = `£${a}` ;
		}
	}
	
	return displayedRepayment ;
    }
