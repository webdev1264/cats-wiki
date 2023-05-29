class BreedDto {
  constructor(breed) {
    this.id = breed._id;
    this.breed = breed.breed;
    this.description = breed.description;
  }
}

module.exports = BreedDto;
