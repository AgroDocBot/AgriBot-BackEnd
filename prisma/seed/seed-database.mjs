import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertPlantTypes = `
INSERT INTO "PlantType" ("plantName", "latinName", variety)
VALUES
('Tomato', 'Solanum lycopersicum', 'Cherry'),
('Potato', 'Solanum tuberosum', 'Russet'),
('Strawberry', 'Fragaria ananassa', 'Albion'),
('Pepper', 'Capsicum annuum', 'Bell'),
('Raspberry', 'Rubus idaeus', 'Heritage'),
('Blueberry', 'Vaccinium corymbosum', 'Duke'),
('Zucchini', 'Cucurbita pepo', 'Green Machine');
`;

const insertDiseases = `
INSERT INTO "Disease" ("diseaseName", "affectedParts", description)
VALUES
('Late Blight', 'Leaves, Stems, Tubers', 'A disease caused by Phytophthora infestans, particularly affecting potatoes and tomatoes.'),
('Early Blight', 'Leaves, Stems, Fruits', 'A common tomato and potato disease caused by Alternaria solani.'),
('Yellow Dwarf Virus', 'Whole Plant', 'A virus that stunts plant growth and causes yellowing of leaves.'),
('Powdery Mildew', 'Leaves, Stems', 'A fungal disease that appears as white powdery spots on plants.'),
('Verticillium Wilt', 'Vascular System', 'Soil-borne fungus affecting tomatoes, peppers, and other crops.'),
('Anthracnose', 'Fruits, Leaves, Stems', 'A fungal disease causing dark, sunken lesions on plants.'),
('Botrytis Rot', 'Flowers, Fruits', 'A disease caused by Botrytis cinerea, affecting strawberries and raspberries.');
`;

const insertDiseaseOnPlantTypes = `
INSERT INTO "DiseaseOnPlantType" ("plantTypeId", "diseaseid")
VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(3, 7),
(3, 4),
(5, 7),
(6, 4),
(7, 4);
`;

async function seedDatabase() {
  try {
    console.log('Seeding Plant Types...');
    await prisma.$executeRawUnsafe(insertPlantTypes);

    console.log('Seeding Diseases...');
    await prisma.$executeRawUnsafe(insertDiseases);

    console.log('Seeding DiseaseOnPlantType...');
    await prisma.$executeRawUnsafe(insertDiseaseOnPlantTypes);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
