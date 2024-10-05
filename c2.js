



// Dmg Formula redo
function realCalc(a , c , cd , atkC, atkW, atkBonus, flatAtk, crit, critDmg, eleDmg, lvlChar, lvlEnermy, resPer,resPen, eleDmgTaken){
	
	let D ;
	let base = (atkC + atkW) * (1 + ( (a + 2) * 3.89 + atkBonus)/100) + flatAtk ;
	let critTotal = 1 + ((( (c * 2.92) + 2 + crit) * ((cd * 5.83) + 2 + critDmg))/10000);
	let dmgPer = 1 + ((eleDmg)/100);
	let defMul = (lvlChar + 20) / ((lvlEnermy + 20) + (lvlChar + 20));
	let resMul = (100 - ( resPer - resPen))/100;
	let dmgTaken = 1 + (eleDmgTaken)/100;
	let toughness = 1 ;  /// create if and else for input if 'Broken' = 0.9 instead of 1
		
	
	D = (base * critTotal * dmgPer * defMul * resMul * dmgTaken * toughness) ;
	
	return D ;
	
};
				
// Create the Combinations		
function findCombination(target, nums, currIndex, currResult, currCombination, results) {
	if (currIndex === nums.length) {
		if (currResult === target) {
			const combinationKey = currCombination.join(',');
			results[combinationKey] = currCombination.slice(); // Storing a copy of the combination
		}
		return;
	}
	
	for (let i = 0; i <= 12; i++) {
		let newResult = currResult + i;
		let newCombination = [...currCombination, i];
		findCombination(target, nums, currIndex + 1, newResult, newCombination, results);
	}
}

function findValidCombinations(target, totalValues) {
	const nums = new Array(totalValues).fill(0);
	const results = {};
	findCombination(target, nums, 0, 0, [], results);
	return results;
}


// This is used to find the Highest value within the array and the postion of the value within the Array
function findHighestValueWithPosition(array) {
	if (array.length === 0) {
		return { value: undefined, position: -1 }; // Return undefined if the array is empty
	}

	let highest = array[0]; // Initialize highest with the first element of the array
	let position = 0; // Initialize position with the index of the first element

	for (let i = 1; i < array.length; i++) {
		if (array[i] > highest) {
			highest = array[i]; // Update highest if a higher value is found
			position = i; // Update position to the index of the new highest value
		}
	}

	return { value: highest, position: position };
}



//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////

// getting Value in the HTML and put them into an Object
// Data collect in short

let mainData = {};


let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function(event){
	
	event.preventDefault();
	
	let a = document.getElementById('form');
	let b = a.getElementsByTagName('input');
	
	
	for (let i =0; i < b.length; i++){
		let aa = b[i].id;
		let bb = Number(b[i].value);
		
		
		mainData[aa] = Number(bb);
	}
	
	
	// Run the combination and save the outputs into an Object
	let validCombinations = findValidCombinations(24, 3);


	let bigA = Object.keys(validCombinations); // getting the keys of the Object
	let bigResult = [];
	let allResult = [];

	let critLimit = 100 - mainData.crit;
	

	// Get the keys and splits them into numbers and push them in to an Array
	for (let i = 0; i < bigA.length; i++) {

		let sub = bigA[i].split(",").map(Number);
		
		
		let test = sub[1] * 2.92;
		
	
		if ( test < critLimit ){
			let sub1 = realCalc(sub[0],sub[1],sub[2],mainData.atkChar, mainData.atkLC, mainData.atkPer, mainData.flatAtk, mainData.crit, mainData.cDmg, mainData.dmgPer, mainData.lvlChar, mainData.lvlEnermy, mainData.resPer, mainData.resPen, mainData.dmgTaken);
			
			bigResult.push(sub1);
			
		}
		
		
		let sub1 = realCalc(sub[0],sub[1],sub[2],mainData.atkChar, mainData.atkLC, mainData.atkPer, mainData.flatAtk, mainData.crit, mainData.cDmg, mainData.dmgPer, mainData.lvlChar, mainData.lvlEnermy, mainData.resPer, mainData.resPen, mainData.dmgTaken);
			
		allResult.push(sub1);
	}
	
	// Get the highest value and same them into an variable

	let highest = findHighestValueWithPosition(bigResult);

	function findNumberPosition(arr, num) {
	  for (let i = 0; i < arr.length; i++) {
		if (arr[i] == num) {
		  return i; // Return the index if number is found
		}
	  }
	}

// Example usage:
	
	let position = findNumberPosition(allResult, highest.value);
	
	let write = bigA[position].split(",").map(Number);








	////////////////////////////////////////////////////////////

	// Print out the results in the Console

	console.log("The highest real value is: ", highest.value);
	console.log("Position within the real array: ", highest.position);



	
	console.log('Attack  = ' + write[0]);
	console.log('Crit  = ' + write[1]);
	console.log('Crit Dmg  = ' + write[2]);
	
	
	
	
	
	
});























