function clothingPicker(temp) {
    if (temp >= 20) {
        return "T-Shirt";
    } else if (temp >= 15) {
        return "Sweater";
    } else if (temp >= 10) {
        return "Coat";
    } else if (temp >= 0) {
        return "Puffer jacket";
    } else if (temp < 0) {
        return "Slippers and pajamas";
    } else {
        return "Invalid temperature entered";
    }
}