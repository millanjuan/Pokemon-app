const validation = (data) => {

    const errors = {}

    //Name
    if(!data.name.trim()) {
        errors.name = "Name is required."
    } else if (typeof data.name !== "string") {
        errors.name = "Name must be a text string."
    }

    //Image
    if (!data.img.trim()) {
        errors.img = "Image URL is required.";
      } else if (typeof data.img !== "string") {
        errors.img = "Image URL must be a text string.";
      }

    // HP, Attack, Defense
    ["hp", "attack", "defense"].forEach((field) => {
      const numericValue = data[field];
        
          // Validación para campos obligatorios
      if (numericValue === "" ) {
         errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
          } else if (isNaN(parseFloat(numericValue)) || numericValue < 1) {
            errors[field] = `Please enter a valid number.`;
          }
        });
    // Speed, Height, Weight
    ["speed", "height", "weight"].forEach((field) => {
      const numericValue2 = data[field];
      const numericValueOrNull = numericValue2 === "" ? null : numericValue2;

      if (numericValueOrNull !== null && numericValueOrNull < 1) {
      errors[field] = `Please enter a valid number..`;
      }
  });

    //Type
    if (data.types.length === 0) {
        errors.types = "Please select at least one type.";
      }

      return errors;

};

export default validation;