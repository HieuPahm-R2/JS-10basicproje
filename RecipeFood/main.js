const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("list-food");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const popupCloseBtn = document.getElementById("close-popup");
const mealPopup = document.getElementById("meal-popup");
const mealInfo = document.getElementById("meal-info");
getMealRandom();
fetchFavMeals(); 
async function getMealRandom(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const RandomMeal = respData.meals[0];
    // console.log(respData);
    addMeal(RandomMeal, true);
}
async function getMealById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}
async function getMealBySearch(term){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}
function addMeal(mealData, random = false){
    // console.log(mealData);
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
        fetchFavMeals();
    });
    meal.addEventListener("click", () =>{
        showMealInfo(mealData);
    })
    mealsEl.appendChild(meal);
}
function addDataToLs(mealId){
    const mealIds = getDataFromLs();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
function deleteDataLs(mealId){
    const mealIds = getDataFromLs();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter((id) => id !== mealId)));
}
function getDataFromLs(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}
async function fetchFavMeals(){
    favoriteContainer.innerHTML = " "; // clean the list
    const mealIds = getDataFromLs();
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        // meals.push(meal);
        addFavMeal(meal);
    }
    // console.log(meals);
}
function addFavMeal(mealData){
    const FavMeal = document.createElement("li");
    FavMeal.innerHTML = `
         <li>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear"><i class="fas fa-window-close"></i></button>
        </li>
    `;
    const btn = FavMeal.querySelector(".clear");
    btn.addEventListener('click', () => {
        deleteDataLs(mealData.idMeal);
        fetchFavMeals();
    });
    FavMeal.addEventListener("click", () =>{
        showMealInfo(mealData);
    });
    favoriteContainer.appendChild(FavMeal);
}

//21/11/2024
function showMealInfo(mealData){
    mealInfo.innerHTML = " ";
    const mealEl = document.createElement("div");
    const Ingredients = [];
    for(let i = 1; i <= 20; i++){
        if(mealData["strIngredient" + i]){
            Ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);
        }else break;
    }
    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${Ingredients.map((ing) => `<li> ${ing} </li>`).join("")}
        </ul>
    `;
    mealInfo.appendChild(mealEl);
    //show the popup
    mealPopup.classList.remove("hidden");
}
searchBtn.addEventListener("click", async () => {
    //clean the container
    mealsEl.innerHTML = " ";

    const search = searchTerm.value;
    const meals = await getMealBySearch(search);
    if(meals){
        meals.forEach((meal) =>{
            addMeal(meal);
        });
    }
});
popupCloseBtn.addEventListener("click", () =>{
    mealPopup.classList.add("hidden");
})