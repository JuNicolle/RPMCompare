-- ── BRANDS ────────────────────────────────────────────────────────────────────
INSERT INTO brand (id, name, country) VALUES
(1, 'BMW',          'Allemagne'),
(2, 'Audi',         'Allemagne'),
(3, 'Mercedes-AMG', 'Allemagne'),
(4, 'Porsche',      'Allemagne'),
(5, 'Renault',      'France');

-- ── RANGES ────────────────────────────────────────────────────────────────────
INSERT INTO vehicle_range (id, brand_id, name) VALUES
-- BMW
(1,  1, 'Série 1'),
(2,  1, 'Série 3'),
(3,  1, 'Série 4'),
(4,  1, 'Série 5'),
(5,  1, 'X3 M'),
-- Audi
(6,  2, 'A3'),
(7,  2, 'A5'),
(8,  2, 'RS3'),
(9,  2, 'RS6'),
(10, 2, 'TT RS'),
-- Mercedes-AMG
(11, 3, 'A 45 S'),
(12, 3, 'C 63'),
(13, 3, 'E 63'),
(14, 3, 'GT'),
(15, 3, 'G 63'),
-- Porsche
(16, 4, '718'),
(17, 4, '911'),
(18, 4, 'Taycan'),
(19, 4, 'Panamera'),
(20, 4, 'Cayenne'),
-- Renault
(21, 5, 'Clio'),
(22, 5, 'Mégane RS'),
(23, 5, 'Alpine A110'),
(24, 5, 'Austral'),
(25, 5, 'Arkana');

-- ── MODELS ────────────────────────────────────────────────────────────────────
INSERT INTO vehicle_model (id, range_id, name, year_from, year_to, body_style, engine_code) VALUES
(1, 2,  'M3 CS',           2023, NULL, 'Berline',  'S58'),
(2, 2,  'M3 Compétition',  2021, NULL, 'Berline',  'S58'),
(3, 2,  'M3 Touring',      2022, NULL, 'Break',    'S58'),
(4, 17, '911 GT3',         2022, NULL, 'Coupé',    '9A2'),
(5, 12, 'C 63 S E Performance', 2023, NULL, 'Berline', 'M139L'),
(6, 9,  'RS6 Avant',       2020, NULL, 'Break',    'DKUA');

-- ── SPECS ─────────────────────────────────────────────────────────────────────
INSERT INTO vehicle_specs
    (model_id, engine_description, fuel, displacement_cc, cylinders, turbo,
     power_hp, torque_nm, gearbox, drive, accel_0_100, vmax_kph, weight_kg)
VALUES
-- BMW M3 CS
(1, '3.0L 6-cyl. biturbo',   'Essence', 2993, 6, true,
    550, 650, 'Auto. 8 rapports', 'M xDrive intégrale',  3.4, 302, 1765),
-- BMW M3 Compétition
(2, '3.0L 6-cyl. biturbo',   'Essence', 2993, 6, true,
    510, 650, 'Auto. 8 rapports', 'Propulsion',          3.9, 290, 1730),
-- BMW M3 Touring
(3, '3.0L 6-cyl. biturbo',   'Essence', 2993, 6, true,
    510, 650, 'Auto. 8 rapports', 'M xDrive intégrale',  3.6, 280, 1845),
-- Porsche 911 GT3
(4, '4.0L 6-cyl. atmosphérique', 'Essence', 3996, 6, false,
    510, 470, 'PDK 7 rapports',  'Propulsion',           3.9, 318, 1435),
-- Mercedes-AMG C 63 S E Performance
(5, '2.0L 4-cyl. turbo + électrique', 'Hybride plug-in', 1991, 4, true,
    680, 1020, 'Auto. 9 rapports', 'AMG 4MATIC+',        3.4, 280, 2111),
-- Audi RS6 Avant
(6, '4.0L V8 biturbo',       'Essence', 3996, 8, true,
    600, 800, 'Tiptronic 8 rapports', 'Quattro intégrale', 3.6, 305, 2075);

-- ── PLATE LOOKUP ──────────────────────────────────────────────────────────────
INSERT INTO plate_lookup (plate, model_id) VALUES
('GT-550-MS', 1);

-- ── Réinitialisation des séquences ────────────────────────────────────────────
SELECT setval('brand_id_seq',        (SELECT MAX(id) FROM brand));
SELECT setval('vehicle_range_id_seq',(SELECT MAX(id) FROM vehicle_range));
SELECT setval('vehicle_model_id_seq',(SELECT MAX(id) FROM vehicle_model));
SELECT setval('vehicle_specs_id_seq',(SELECT MAX(id) FROM vehicle_specs));
