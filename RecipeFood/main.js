const meals = document.getElementById("meals");
const favoriteContainer = document.getElementById("list-food");
async function getMealRandom(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const RandomMeal = respData.meals[0];
    // console.log(respData);
    addMeal(RandomMeal, true);
}
getMealRandom();
fetchFavMeals();
async function getMealById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}
async function getMealBySearch(term){
    const othersMeal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php" + term);
}
function addMeal(mealData, random = false){
    const meal = document.createElement("div");
    meal.classList.add("meal");
    meal.innerHTML = `
        <div class="meal-header">
           ${random ? ` <span class="random"> Random Recipe Today</span>` : ""}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-footer">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn">
                        <i class="fa fa-heart"></i>
                    </button>
        </div>
    `;
    const btn = meal.querySelector(".meal-footer .fav-btn");
    btn.addEventListener("click", () =>{
        if(btn.classList.contains("active")){
            deleteDataLs(mealData.idMeal);
            btn.classList.remove("active");
        }
        else{
            addDataToLs(mealData.idMeal);
            btn.classList.add("active");
        }
        // fetchFavMeals();
    });
    meals.appendChild(meal);
}
function addDataToLs(mealId){
    const mealIds = getDataFromLs();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]) )
}
function deleteDataLs(mealId){
    const mealIds = getDataFromLs();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter((id) => id !== mealId)));
}
function getDataFromLs(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds == null ? [] : mealIds;
}
async function fetchFavMeals(){
    const mealIds = getDataFromLs();
    
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addFavMeal(meal);
    }
}
function addFavMeal(mealData){
    const FavMeal = document.createElement("li");
    FavMeal.innerHTML = `
         <li>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
        </li>
    `
    favoriteContainer.appendChild(FavMeal);
}