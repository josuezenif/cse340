CREATE TABLE organization(
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	email VARCHAR(255) NOT NULL,
	logo_file VARCHAR(225) NOT NULL
);

INSERT INTO organization(organization_id, name, description, email, logo_file) VALUES
	(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'), 
	(2, 'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'), 
	(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE services(
	project_id SERIAL PRIMARY KEY,
	organization_id INT,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	project_location VARCHAR(250) NOT NULL,
	project_date DATE NOT NULL,
	
	CONSTRAINT fk_organization
		FOREIGN KEY (organization_id)
		REFERENCES organization(organization_id)
		ON DELETE CASCADE
);

INSERT INTO services(project_id, organization_id, title, description, project_location, project_date) VALUES
(1, 1, 'After-School Tutoring Program', 'Provides free academic support in math, reading, and science for local students.', 'Sainte-Marie Community Center, Quebec', '2026-09-15'),
(2, 1, 'Career Exploration Workshop', 'Connects youth with professionals to learn about different career paths and skills.', 'École Polyvalente Benoît-Vachon, Quebec', '2026-10-10'),
(3, 1, 'School Supply Drive', 'Collects and distributes essential school materials to students in need.', 'Nouvelle-Beauce Public Library, Quebec', '2026-08-20'),
(4, 1, 'Youth Mentorship Program Kickoff', 'Launches a mentorship initiative pairing teens with experienced community leaders.', 'Beauce Regional Youth Center, Quebec', '2026-11-05'),
(5, 1, 'STEM Learning Camp', 'Introduces youth to coding, robotics, and engineering through hands-on activities.', 'Cégep Beauce-Appalaches, Quebec', '2026-07-22'),

--SECOND ORGANIZATION VALUES
(6, 2, 'Community Garden Build Day', 'Brings volunteers together to build and plant a shared community garden.', 'Parc Drouin, Sainte-Marie, Quebec', '2026-05-18'),
(7, 2, 'Tree Planting Initiative', 'Organizes volunteers to plant trees and improve local green spaces.', 'Parc des Rapides-du-Diable, Beauce, Quebec', '2026-04-25'),
(8, 2, 'Composting Workshop', 'Teaches residents how to reduce waste through composting practices.', 'Sainte-Marie Town Hall, Quebec', '2026-06-12'),
(9, 2, 'Farm-to-Table Donation Harvest', 'Grows and collects fresh produce to donate to local food banks.', 'Local Farms of Nouvelle-Beauce, Quebec', '2026-09-02'),
(10, 2, 'Sustainable Farming Seminar', 'Educates participants on eco-friendly and efficient farming techniques.', 'Saint-Joseph Agricultural Center, Quebec', '2026-03-30'),

-- THIRD ORGANIZATION VALUES
(11, 3, 'Neighborhood Clean-Up Day', 'Engages volunteers to clean and improve public spaces in the community.', 'Downtown Sainte-Marie, Quebec', '2026-04-12'),
(12, 3, 'Senior Companion Visits', 'Provides companionship and support to elderly residents through regular visits.', 'Résidence Sainte-Marie Seniors Home, Quebec', '2026-10-03'),
(13, 3, 'Food Distribution Event', 'Helps distribute food supplies to families in need through local partnerships.', 'Moisson Beauce Food Bank, Quebec', '2026-08-14'),
(14, 3, 'Clothing Donation Drive', 'Collects and distributes clothing to individuals and families in need.', 'Saint-Georges Community Hall, Quebec', '2026-11-20'), 
(15, 3, 'Community Cultural Festival', 'Celebrates diversity through food, music, and cultural activities.', 'Parc des Îles, Beauce, Quebec', '2026-07-30')


-- ADDING CATEGORIES TO THE DATABASE
CREATE TABLE categories(
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL
)

CREATE TABLE service_categories (
    service_id INT,
    category_id INT,
    PRIMARY KEY (service_id, category_id),

    FOREIGN KEY (service_id) REFERENCES services(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO categories(category_id, category_name) VALUES 
(1, 'Environmental'),
(2, 'Educational'),
(3, 'Community Service'),
(4, 'Health and Well-Being');

INSERT INTO service_categories (service_id, category_id) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 1),
(6, 3),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 3),
(12, 3),
(13, 4),
(14, 4),
(15, 3)