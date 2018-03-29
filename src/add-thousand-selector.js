module.exports = number => {
    const arrayOfNumbers = number.split('');
    
    for (let position = arrayOfNumbers.length; position > 3; position -= 3) {
        arrayOfNumbers.splice(position - 3, 0, ',');
    }

    return arrayOfNumbers.join('');
}