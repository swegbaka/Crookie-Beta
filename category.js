import data from './data.JSON' assert { type: 'json' };


//let img = document.querySelectorAll('.veg-info > img');

var vegTable = document.querySelector('.veg-category');
var meatTable = document.querySelector('.meat-category');

console.log(data.Vegetable[0].image);


for (var i in data.Vegetable) {
    var row = `<tr>
                    <td>
                    <img src='${data.Vegetable[i].image}' width="120px" height="100px">
                    <div>${data.Vegetable[i].name}</div>
                    </td>
                    <td>
                    ${data.Vegetable[i].nutrition[0][0]}:${data.Vegetable[i].nutrition[0][1]}
                    ${data.Vegetable[i].nutrition[1][0]}:${data.Vegetable[i].nutrition[1][1]}
                    ${data.Vegetable[i].nutrition[2][0]}:${data.Vegetable[i].nutrition[2][1]}
                    ${data.Vegetable[i].nutrition[3][0]}:${data.Vegetable[i].nutrition[3][1]}
                    ${data.Vegetable[i].nutrition[4][0]}:${data.Vegetable[i].nutrition[4][1]}
                    ${data.Vegetable[i].nutrition[5][0]}:${data.Vegetable[i].nutrition[5][1]}
                    </td>
                    <td>${data.Vegetable[i].variety}</td>
                    <td>${data.Vegetable[i].description}</td>
                    <td>${data.Vegetable[i].use}</td>
                </tr>`
    vegTable.innerHTML += row;  
    
}

for (var i in data.Meat) {
    var row = `<tr>
                    <td>
                    <img src='${data.Meat[i].image}' width="120px" height="100px">
                    <div>${data.Meat[i].name}</div>
                    </td>
                    <td>
                    ${data.Meat[i].nutrition[0][0]}:${data.Meat[i].nutrition[0][1]}
                    ${data.Meat[i].nutrition[1][0]}:${data.Meat[i].nutrition[1][1]}
                    ${data.Meat[i].nutrition[2][0]}:${data.Meat[i].nutrition[2][1]}
                    ${data.Meat[i].nutrition[3][0]}:${data.Meat[i].nutrition[3][1]}
                    ${data.Meat[i].nutrition[4][0]}:${data.Meat[i].nutrition[4][1]}
                    ${data.Meat[i].nutrition[5][0]}:${data.Meat[i].nutrition[5][1]}
                    </td>
                    <td>${data.Meat[i].variety}</td>
                    <td>${data.Meat[i].description}</td>
                    <td>${data.Meat[i].use}</td>
                </tr>`
    meatTable.innerHTML += row; 
}

for (var i in data.Cookware) {
    var row = `<tr>
                    <td>
                    <img src='${data.Meat[i].image}' width="120px" height="100px">
                    <div>${data.Meat[i].name}</div>
                    </td>
                    <td>
                    ${data.Meat[i].nutrition[0][0]}:${data.Meat[i].nutrition[0][1]}
                    ${data.Meat[i].nutrition[1][0]}:${data.Meat[i].nutrition[1][1]}
                    ${data.Meat[i].nutrition[2][0]}:${data.Meat[i].nutrition[2][1]}
                    ${data.Meat[i].nutrition[3][0]}:${data.Meat[i].nutrition[3][1]}
                    ${data.Meat[i].nutrition[4][0]}:${data.Meat[i].nutrition[4][1]}
                    ${data.Meat[i].nutrition[5][0]}:${data.Meat[i].nutrition[5][1]}
                    </td>
                    <td>${data.Meat[i].variety}</td>
                    <td>${data.Meat[i].description}</td>
                    <td>${data.Meat[i].use}</td>
                </tr>`
    meatTable.innerHTML += row; 
}




