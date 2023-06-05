interface CharacteristicsInterface {
  adaptability: string;
  affectionLevel: string;
  childFriendly: string;
  grooming: string;
  intelligence: string;
  healthIssues: string;
  socialNeeds: string;
  strangerFriendly: string;
}

interface BreedRespInterface {
  breed: string;
  previewImg: string;
  imgs: string[];
  description: string;
  temperament: string[];
  origin: string;
  lifeSpan: string;
  characteristics: CharacteristicsInterface;
}

export type { BreedRespInterface, CharacteristicsInterface };
