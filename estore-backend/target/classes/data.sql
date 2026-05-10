SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- =====================================================
-- CATÉGORIES
-- =====================================================
INSERT IGNORE INTO categories (id, name, description) VALUES
                                                          (1, 'Informatique & High-Tech', 'Ordinateurs, smartphones, accessoires tech, casques, disques durs, consoles de jeux'),
                                                          (2, 'Livres & Développement Personnel', 'Romans, psychologie, développement personnel, spiritualité, relations et bien-être'),
                                                          (3, 'Sport & Fitness', 'Chaussures de sport, équipements fitness, vélos, tapis de yoga, haltères, accessoires de musculation'),
                                                          (4, 'Vêtements & Mode', 'Vêtements homme et femme, marques de luxe, ensembles casual, vestes, chemises, robes');

-- =====================================================
-- PRODUITS - CATÉGORIE 1 : INFORMATIQUE & HIGH-TECH
-- =====================================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
                                                                                       (1,  'Casque de musique sans fil Beige',
                                                                                        'Casque audio Bluetooth, couleur beige, réduction de bruit active, autonomie 30 heures, oreillettes rembourrées en mousse à mémoire de forme.',
                                                                                        450.00,
                                                                                        'https://plus.unsplash.com/premium_photo-1680346529160-549ad950bd1f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (2,  'Souris noir - Gaming',
                                                                                        'Souris optique filaire, 16000 DPI, 7 boutons programmables, RGB personnalisable, grip ergonomique.',
                                                                                        350.00,
                                                                                        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (3,  'PC EliteBook 13e génération',
                                                                                        'HP EliteBook 13, Intel Core i7, 16 Go RAM, 512 Go SSD, écran 13.3 pouces Full HD, châssis aluminium, autonomie 12 heures.',
                                                                                        12500.00,
                                                                                        'https://images.unsplash.com/photo-1663354027456-ce6a7e07d212?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (4,  'Clavier mécanique RGB',
                                                                                        'Clavier gaming mécanique, switches Cherry MX Brown, rétroéclairage RGB personnalisable, repose-poignet intégré, layout AZERTY.',
                                                                                        650.00,
                                                                                        'https://plus.unsplash.com/premium_photo-1776832560461-40a706421bb4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (5,  'Canon EOS R50 - Appareil photo',
                                                                                        'Appareil photo hybride 24,2 Mpx, viseur électronique, vidéo 4K 30 fps, zoom RF-S 18-45 mm intégré, autofocus double pixel.',
                                                                                        6850.00,
                                                                                        'https://images.unsplash.com/photo-1603208234872-619ffa1209cb?q=80&w=674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (6,  'MacBook Pro 14" - M3 Pro',
                                                                                        'MacBook Pro 14 pouces, puce M3 Pro, 18 Go RAM, 512 Go SSD, écran Liquid Retina XDR, autonomie 18 heures.',
                                                                                        23999.00,
                                                                                        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (7,  'Samsung SSD T7 1TB',
                                                                                        'Disque dur externe SSD, 1 To, USB 3.2, vitesses 1050 Mo/s, résistant aux chocs, compatible PC/Mac/Android.',
                                                                                        950.00,
                                                                                        'https://images.unsplash.com/photo-1610415505506-d3442835815e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (8,  'iPhone 17 Pro White - 512 Go',
                                                                                        'iPhone 17 Pro, couleur blanche, 512 Go stockage, écran 120 Hz ProMotion, puce A19 Bionic, triple capteur 48 Mpx, charge rapide 35W.',
                                                                                        16500.00,
                                                                                        'https://images.unsplash.com/photo-1760443728287-4c2a7e4efff9?q=80&w=623&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (9,  'iPad Pro 11" M4 - Wi-Fi + 5G',
                                                                                        'iPad Pro 11 pouces, puce M4, 256 Go, écran Ultra Retina XDR 120 Hz, compatible Apple Pencil Pro et Magic Keyboard.',
                                                                                        8950.00,
                                                                                        'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (10, 'Apple AirPods Pro 2',
                                                                                        'AirPods Pro 2ème génération, réduction active du bruit, puce H2, autonomie 6h (30h avec boîtier), étanchéité IP54, son spatial.',
                                                                                        2800.00,
                                                                                        'https://images.unsplash.com/photo-1659943063312-813a8d18a5b9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (11, 'PlayStation 5 - PS5',
                                                                                        'Console PlayStation 5, lecteur Blu-ray 4K, manette DualSense sans fil, SSD ultra-rapide 825 Go, rétrocompatible PS4.',
                                                                                        5500.00,
                                                                                        'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1),
                                                                                       (12, 'Enceinte Bluetooth - JBL Charge 5',
                                                                                        'Enceinte sans fil JBL Charge 5, 40W, étanchéité IP67, autonomie 20 heures, bass radiators, recharge intégrée pour appareils.',
                                                                                        1250.00,
                                                                                        'https://images.unsplash.com/photo-1628233058888-40159041d3ca?q=80&w=716&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                                                                        1);

-- =====================================================
-- PRODUITS - CATÉGORIE 2 : LIVRES
-- =====================================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
                                                                                       (13, 'Why Men Love Bitches - Sherry Argov',
                                                                                        'Guide de relations féminin expliquant comment les femmes affirmées et indépendantes suscitent davantage d''attrait et de respect.',
                                                                                        135.00, 'https://i.pinimg.com/736x/19/fa/43/19fa437bc9fdb3103c4a5a73f4b202e0.jpg', 2),
                                                                                       (14, 'The Millionaire Success Habits - Dean Graziosi',
                                                                                        'Ouvrage de développement personnel dévoilant les habitudes quotidiennes des millionnaires.',
                                                                                        165.00, 'https://i.pinimg.com/736x/0a/2d/ac/0a2dac54926a3a84ed74e06719736836.jpg', 2),
                                                                                       (15, 'Ikigai - Héctor García & Francesc Miralles',
                                                                                        'Exploration du secret japonais d''une vie longue et heureuse. Trouver sa raison d''être.',
                                                                                        155.00, 'https://i.pinimg.com/736x/4a/f3/28/4af328583b73e17ef07f748669b10ca4.jpg', 2),
                                                                                       (16, 'The Power of Du''a - Aliyah Umm Raiyaan',
                                                                                        'Ouvrage spirituel sur la pratique de l''invocation (du''a) en Islam.',
                                                                                        140.00, 'https://i.pinimg.com/736x/0c/01/56/0c01566f020165a6c7f65f83b24f12e9.jpg', 2),
                                                                                       (17, 'The Art of Being Alone - Renuka Gavrani',
                                                                                        'Ouvrage poignant sur l''art de vivre seul et d''embrasser la solitude comme une force.',
                                                                                        130.00, 'https://i.pinimg.com/736x/3c/f3/4d/3cf34d0acee87ed4b0e3978927ab95a7.jpg', 2),
                                                                                       (18, 'Love Yourself Like Your Life Depends On It - Kamal Ravikant',
                                                                                        'Témoignage puissant sur la guérison par l''amour de soi.',
                                                                                        125.00, 'https://i.pinimg.com/736x/fc/99/8e/fc998e27effcab3cedccf2a6e7d722e5.jpg', 2),
                                                                                       (19, 'Don''t Believe Everything You Think - Joseph Nguyen',
                                                                                        'Démystification de la souffrance psychologique liée aux pensées automatiques.',
                                                                                        140.00, 'https://i.pinimg.com/736x/98/a9/69/98a969d1216d561c34fbd21636c0329b.jpg', 2),
                                                                                       (20, 'The Life Beyond Fear - J.P. Moreland',
                                                                                        'Ouvrage philosophique et spirituel sur le dépassement des peurs existentielles.',
                                                                                        150.00, 'https://i.pinimg.com/736x/8a/50/48/8a50487b5688904a7e1272ad46b47b67.jpg', 2),
                                                                                       (21, 'The Power of Feminine Energy - Una L. Tudor',
                                                                                        'Guide sur la reconnexion à l''énergie féminine : intuition, réceptivité, créativité.',
                                                                                        145.00, 'https://i.pinimg.com/736x/b6/54/90/b654904e2809b11e7419040b665afeec.jpg', 2),
                                                                                       (22, 'Talking with Psychopaths and Savages - Christopher Berry-Dee',
                                                                                        'Plongée fascinante dans l''esprit des criminels les plus dangereux.',
                                                                                        185.00, 'https://i.pinimg.com/736x/72/c5/9b/72c59bc6387194065749b08ca4edd7fb.jpg', 2),
                                                                                       (23, 'Surrounded by Idiots - Thomas Erikson',
                                                                                        'Méthode de communication basée sur les couleurs comportementales pour identifier quatre types de personnalités.',
                                                                                        160.00, 'https://i.pinimg.com/1200x/19/e2/01/19e201e6c88294bc366e7f076683042c.jpg', 2),
                                                                                       (24, 'Thinking, Fast and Slow - Daniel Kahneman',
                                                                                        'Ouvrage de psychologie explorant les deux systèmes de pensée humaine.',
                                                                                        120.00, 'https://i.pinimg.com/736x/f9/cf/bb/f9cfbb7a891949932f621dbb444b8286.jpg', 2);

-- =====================================================
-- PRODUITS - CATÉGORIE 3 : SPORT & FITNESS
-- =====================================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
                                                                                       (25, 'Nike Air Zoom Pegasus 40 - Chaussures running',
                                                                                        'Chaussures de running Nike avec amorti Zoom Air, mesh respirant, semelle extérieure en caoutchouc durable.',
                                                                                        1250.00, 'https://i.pinimg.com/1200x/6f/2b/e0/6f2be0a171159deec672f2ded88282bd.jpg', 3),
                                                                                       (26, 'Sportstech Velo de Sport - SX500',
                                                                                        'Vélo d''appartement connecté avec écran LCD, résistance magnétique silencieuse, selle confort réglable.',
                                                                                        3890.00, 'https://images.unsplash.com/photo-1695808403662-cdba30ce515c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (27, 'Outfit for Women Gym - Legging + Brassière',
                                                                                        'Tenue de sport femme : legging taille haute + brassière intégrée. Tissu extensible, respirant.',
                                                                                        350.00, 'https://i.pinimg.com/1200x/29/96/5d/29965d7138f7b9ac33fad8ceb1cd653e.jpg', 3),
                                                                                       (28, 'Foam Roller de massage - 45 cm',
                                                                                        'Rouleau de massage en mousse EVA haute densité pour auto-massage et récupération musculaire.',
                                                                                        180.00, 'https://i.pinimg.com/1200x/0d/24/58/0d24580a1c4c6bc6fafc811c26bb6c27.jpg', 3),
                                                                                       (29, 'Tapis de Yoga Premium - 10mm épais',
                                                                                        'Tapis de yoga antidérapant en mousse NBR, épaisseur 10mm. Idéal pour yoga, pilates, stretching.',
                                                                                        280.00, 'https://plus.unsplash.com/premium_photo-1723759271930-3514bb76abb4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (30, 'Dumbells Hexagonaux 2 x 10kg',
                                                                                        'Set d''haltères hexagonaux caoutchoutés anti-dérapant. Idéal pour musculation à domicile.',
                                                                                        890.00, 'https://images.unsplash.com/photo-1703668984128-b506579acdd2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (31, 'Elastic Bands Fitness - Lot de 5 niveaux',
                                                                                        'Lot d''élastiques de musculation en latex, résistances légère à extra-forte (5-50 kg).',
                                                                                        150.00, 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (32, 'Speedo Futura Biofuse - Lunettes de natation',
                                                                                        'Lunettes de natation avec joints en caoutchouc souple Biofuse, anti-buée, protection UV.',
                                                                                        195.00, 'https://plus.unsplash.com/premium_photo-1749937844667-2f9be057d4eb?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (33, 'Pilates Reformer Machine - Ajustable',
                                                                                        'Machine de Pilates reformer à domicile avec cadre en acier, 4 ressorts de résistance.',
                                                                                        4250.00, 'https://images.unsplash.com/photo-1717500252172-b1840ea64f05?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (34, 'Babolat Pure Drive Tennis Racket - 300g',
                                                                                        'Raquette de tennis professionnelle. Cadre en carbone, tamis 645 cm².',
                                                                                        1850.00, 'https://images.unsplash.com/photo-1653958245933-44b476ee7360?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
                                                                                       (35, 'Ballon de Football Adidas - Taille 5',
                                                                                        'Ballon officiel taille 5, cuir synthétique haute résistance.',
                                                                                        299.00, 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3);

-- =====================================================
-- PRODUITS - CATÉGORIE 4 : VÊTEMENTS & MODE
-- =====================================================
INSERT IGNORE INTO products (id, name, description, price, image_url, category_id) VALUES
                                                                                       (36, 'Green Olive Casual Man Ensemble',
                                                                                        'Ensemble homme décontracté vert olive, sweat à capuche + pantalon jogger, coton biologique.',
                                                                                        780.00, 'https://i.pinimg.com/1200x/5b/6c/fe/5b6cfe8ae661cabc164d47b7528870c7.jpg', 4),
                                                                                       (37, 'Prada Jean Jacket for Men',
                                                                                        'Veste en jean Prada pour homme, denim brut, coupe slim, finitions en cuir sur les poches.',
                                                                                        8900.00, 'https://i.pinimg.com/736x/51/f3/85/51f38504d45dea21a8322f26a3d8fd36.jpg', 4),
                                                                                       (38, 'Zara Ensemble Red for Women',
                                                                                        'Ensemble Zara rouge pour femme : jupe plissée + haut manches longues col roulé.',
                                                                                        550.00, 'https://plus.unsplash.com/premium_photo-1673757096324-03397d31a5e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
                                                                                       (39, 'Dolce & Gabbana Flower Dress for Women',
                                                                                        'Robe Dolce & Gabbana à imprimé floral, soie naturelle, coupe cintrée.',
                                                                                        8900.00, 'https://www.dolcegabbana.com/dw/image/v2/BKDB_PRD/on/demandware.static/-/Sites-15/default/dw3e72b5db/images/zoom/F6JFNTHS5UT_HN5ZN_1.jpg', 4),
                                                                                       (40, 'Prada Black Coat for Man',
                                                                                        'Manteau Prada noir pour homme, laine vierge, coupe droite, col tailleur, double boutonnage.',
                                                                                        11200.00, 'https://i.pinimg.com/1200x/09/08/97/090897d86c06e9cbdd1f65f57035296c.jpg', 4),
                                                                                       (41, 'Hermès Red Dress for Women',
                                                                                        'Robe Hermès rouge vermillon, soie double face, coupe fluide, col rond, manches courtes.',
                                                                                        15500.00, 'https://i.pinimg.com/1200x/8c/23/c8/8c23c8d17c9cce34113a08498fd08f21.jpg', 4),
                                                                                       (42, 'Beige Chemise for Men',
                                                                                        'Chemise homme beige, coton popeline, col italien, boutons perle, coupe slim.',
                                                                                        420.00, 'https://images.unsplash.com/photo-1616517762989-f2e371454f32?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
                                                                                       (43, 'Green Leather Coat for Women',
                                                                                        'Manteau femme en cuir véritable vert forêt, coupe droite, col réversible, doublure satinée.',
                                                                                        1890.00, 'https://images.unsplash.com/photo-1512068549487-5e79d74c7fc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D', 4),
                                                                                       (44, 'Gray Costume for Man',
                                                                                        'Costume homme gris, 2 pièces, laine super 110s, doublure viscose, coupe moderne.',
                                                                                        1650.00, 'https://i.pinimg.com/1200x/cb/80/ee/cb80eec1c0166c5cfe894f41ce05a894.jpg', 4),
                                                                                       (45, 'Pink Chemise for Women',
                                                                                        'Chemise femme rose pastel, lin 100%, manches longues, col classique, coupe oversize.',
                                                                                        320.00, 'https://plus.unsplash.com/premium_photo-1668485968642-30e3d15e9b9c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
                                                                                       (46, 'Gray Women Coat',
                                                                                        'Manteau long femme gris cendré, laine mélangée, coupe cintrée, col tailleur.',
                                                                                        890.00, 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
                                                                                       (47, 'Gucci Yellow Ensemble for Women',
                                                                                        'Ensemble Gucci jaune pour femme : veste cropped + jupe plissée, motif GG monogramme.',
                                                                                        12500.00, 'https://i.pinimg.com/1200x/ab/75/72/ab75723cb503cef1a4bb0d895db53b18.jpg', 4);

-- =====================================================
-- STOCK (INVENTORIES)
-- =====================================================
INSERT IGNORE INTO inventories (quantity, product_id) VALUES
                                                          (35, 1),  (60, 2),  (12, 3),  (45, 4),
                                                          (18, 5),  (10, 6),  (50, 7),  (8,  8),
                                                          (15, 9),  (30, 10), (20, 11), (25, 12),
                                                          (38, 13), (45, 14), (50, 15), (30, 16),
                                                          (32, 17), (55, 18), (40, 19), (28, 20),
                                                          (35, 21), (25, 22), (42, 23), (40, 24),
                                                          (45, 25), (10, 26), (60, 27), (85, 28),
                                                          (70, 29), (35, 30), (90, 31), (65, 32),
                                                          (8,  33), (22, 34), (200,35),
                                                          (30, 36), (8,  37), (42, 38), (6,  39),
                                                          (5,  40), (4,  41), (35, 42), (15, 43),
                                                          (18, 44), (40, 45), (25, 46), (7,  47);

-- =====================================================
-- COMPTES UTILISATEURS
-- =====================================================
-- Mot de passe "admin123" hashé BCrypt
INSERT IGNORE INTO users (id, first_name, last_name, email, password) VALUES
                                                                          (1, 'Admin',   'Store',   'admin@estore.com',
                                                                           '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
                                                                          (2, 'Youssef', 'Test',    'youssef@test.com',
                                                                           '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

INSERT IGNORE INTO profiles (id, phone, address, city, country, user_id) VALUES
                                                                             (1, '0600000001', 'Faculté Ben Msick', 'Casablanca', 'Maroc', 1),
                                                                             (2, '0600000002', '2 Rue Mohammed V',  'Casablanca', 'Maroc', 2);

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;