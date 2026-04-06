<!DOCTYPE html><html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Albasse Shopping PRO</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}
body{display:flex;background:#f5f5f5}/* SIDEBAR */ .sidebar{ width:220px;background:#111;color:#fff;height:100vh;padding:20px;position:fixed } .sidebar h2{color:#f9b233;margin-bottom:20px} .sidebar button{ width:100%;margin:10px 0;padding:10px;border:none;background:#222;color:#fff;border-radius:8px;cursor:pointer }

/* MAIN */ .main{margin-left:220px;width:100%;padding:20px}

.header{display:flex;justify-content:space-between;align-items:center} .card{background:#fff;padding:20px;border-radius:10px;margin:10px 0;box-shadow:0 5px 10px rgba(0,0,0,0.1)}

.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px} .product{background:#fff;border-radius:10px;padding:10px;text-align:center} .product img{width:100%;height:150px;object-fit:cover;border-radius:10px} .btn{background:#111;color:#fff;padding:8px;border-radius:8px;margin-top:10px;cursor:pointer}

input{width:100%;padding:8px;margin:5px 0}

</style>
</head>
<body><div class="sidebar">
<h2>Albasse Admin</h2>
<button onclick="showDashboard()">Dashboard</button>
<button onclick="showProducts()">Produits</button>
<button onclick="showAdd()">Ajouter Produit</button>
</div><div class="main">
<div class="header">
<h1>Dashboard</h1>
</div><div id="dashboard" class="card">
<h3>Statistiques</h3>
<p>Total produits: <span id="totalProducts">0</span></p>
</div><div id="products" style="display:none">
<h2>Liste des Produits</h2>
<div class="products" id="productList"></div>
</div><div id="addProduct" style="display:none" class="card">
<h2>Ajouter Produit</h2>
<input type="text" id="name" placeholder="Nom">
<input type="number" id="price" placeholder="Prix">
<input type="text" id="image" placeholder="Image URL">
<div class="btn" onclick="addProduct()">Ajouter</div>
</div>
</div><script>
let products = JSON.parse(localStorage.getItem('products')) || [];

function save(){
localStorage.setItem('products', JSON.stringify(products));
updateUI();
}

function updateUI(){
document.getElementById('totalProducts').innerText = products.length;

let html = '';
products.forEach((p,i)=>{
html += `
<div class="product">
<img src="${p.image}">
<h4>${p.name}</h4>
<p>${p.price} FCFA</p>
<div class="btn" onclick="deleteProduct(${i})">Supprimer</div>
</div>`;
});

document.getElementById('productList').innerHTML = html;
}

function addProduct(){
let name = document.getElementById('name').value;
let price = document.getElementById('price').value;
let image = document.getElementById('image').value;

products.push({name,price,image});
save();
alert('Produit ajouté');
}

function deleteProduct(i){
products.splice(i,1);
save();
}

function showDashboard(){
dashboard.style.display='block';
productsSection.style.display='none';
addProductSection.style.display='none';
}

function showProducts(){
dashboard.style.display='none';
document.getElementById('products').style.display='block';
document.getElementById('addProduct').style.display='none';
}

function showAdd(){
dashboard.style.display='none';
document.getElementById('products').style.display='none';
document.getElementById('addProduct').style.display='block';
}

updateUI();
</script></body>
</html>
