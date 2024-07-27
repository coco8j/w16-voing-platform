const concatOptions = function (option1, options) {
  const typeValidation = [option1, options].every((option => typeof option === String));

  if (typeValidation) {
    throw new Error("options should be String.");
  }

  const spitedOPtions = options.split(",");

  const arrayUnion = [option1, ...spitedOPtions];

  return arrayUnion;
}

module.exports = concatOptions;
