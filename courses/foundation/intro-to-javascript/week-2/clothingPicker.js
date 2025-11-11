function clothingPicker(temp) {
    return temp >= 20 ? "T-Shirt" :
    temp >= 15 ? "Sweater" :
    temp >= 10 ? "Coat" :
    temp >= 0 ? "Puffer jacket" :
    temp < 0 ? "Slippers and pajamas" :
    "Invalid temperature entered" ; 
}