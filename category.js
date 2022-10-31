import data from './data.JSON' assert { type: 'json' };


//let img = document.querySelectorAll('.veg-info > img');

var vegTable = document.querySelector('.veg-category');
var meatTable = document.querySelector('.meat-category');

for (let i = 0; i < data.Vegetable.length; i++) {
    var row = `<tr>
                    <td>
                    <img src='${data.Vegetable[i].image}' width="120px" height="100px">
                    <div>${data.Vegetable[i].name}</div>
                    </td>
                    <td>${data.Vegetable[i].nutrition}</td>
                    <td>${data.Vegetable[i].variety}</td>
                    <td>${data.Vegetable[i].description}</td>
                    <td>${data.Vegetable[i].use}</td>
                </tr>`
    vegTable.innerHTML += row;  
}

for (let i = 0; i < data.Meat.length; i++) {
    var row = `<tr>
                    <td>
                    <img src='${data.Meat[i].image}' width="120px" height="100px">
                    <div>${data.Meat[i].name}</div>
                    </td>
                    <td>${data.Meat[i].nutrition}</td>
                    <td>${data.Meat[i].variety}</td>
                    <td>${data.Meat[i].description}</td>
                    <td>${data.Meat[i].use}</td>
                </tr>`
    meatTable.innerHTML += row;  
}


foodName.innerHTML = data.Vegetable[0].name;


