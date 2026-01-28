function isAnagram(str1, str2) {
  const item1 = str1.split("").sort().join("");
  const item2 = str2.split("").sort().join("");
  if (item1 == item2) return true;
  return false;
}

// console.log(isAnagram("act", "cat"));
// console.log(isAnagram("Fired", "Fried"));
// console.log(isAnagram("dustbin", "dustin"));

// Expenditure Question
/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
    const res = transactions.reduce((acc,curr)=>{
        const {category, price} = curr;
        const idx = acc.findIndex(val=>val.category == category);
        if(idx!=-1){
            acc[idx] = {...acc[idx], totalSpent: acc[idx].totalSpent + price}
            return acc
        }
        return [...acc, {category: category, totalSpent: price}]
    }, [])

  return res;
}


const transactions = [
    {
		id: 2,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	},
    {
		id: 1,
		timestamp: 1656076800000,
		price: 20,
		category: 'Food',
		itemName: 'Burger',
	},
    {
		id: 1,
		timestamp: 1656076800000,
		price: 5,
		category: 'Drinks',
		itemName: 'Coke',
	}
]
console.log(calculateTotalSpentByCategory(transactions))