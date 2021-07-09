const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillionairesBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calculateWealthBtn = document.getElementById("calculate-wealth")


let data = []


// update dom
const updateDom = (provideData = data) => {
    // clear the dom
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>` 
    provideData.forEach(item => {
        const element = document.createElement("DIV")
        element.classList.add("person")
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

// format money 
const formatMoney = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

// double everyone's money 
const doubleMoney = () => {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })
    updateDom()
} 

// sort money 
const sortByRich = () => {
    data.sort((a,b) => b.money - a.money)
    updateDom()
}

// filter by millionaire
const filterMillionaires = () => {
    data = data.filter(user => user.money > 1000000)
    updateDom()
}

// calculate wealth 
const calculateWealth = () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)
    const wealthDom = document.createElement("DIV")
    wealthDom.innerHTML = `<p>Total wealth: $<strong>${formatMoney(wealth)}</strong></p>` 
    main.appendChild(wealthDom)
}


// add new data to array
const addData = obj => {
    data.push(obj)
    updateDom()
}

// fetch user data
const getRandomUser = async () => {
    const res = await fetch("https://randomuser.me/api/")
    const data = await res.json()
    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
} 

// add random user 
addUserBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney)
sortBtn.addEventListener("click", sortByRich)
showMillionairesBtn.addEventListener("click", filterMillionaires)
calculateWealthBtn.addEventListener("click", calculateWealth)