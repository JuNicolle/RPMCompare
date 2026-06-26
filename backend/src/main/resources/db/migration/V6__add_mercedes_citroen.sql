INSERT INTO brand (id, name, country) VALUES
(8, 'Mercedes-Benz', 'Allemagne'),
(9, 'Citroën',       'France');

INSERT INTO vehicle_range (id, brand_id, name) VALUES
(28, 8, 'Classe GLE'),
(29, 9, 'C4 Cactus');

INSERT INTO vehicle_model (id, range_id, name, year_from, year_to, body_style, engine_code) VALUES
(9,  28, 'GLE Coupé 350 de 2.0 d 16V 320 EQ Power 4MATIC 9G-TRONIC', 2020, NULL, 'Coupé SUV',  '654920'),
(10, 29, 'C4 Cactus 1.6 BlueHDi 99',                                  2018, NULL, 'Crossover',  'DV6FD');

INSERT INTO vehicle_specs
    (model_id, engine_description, fuel, displacement_cc, cylinders, turbo,
     power_hp, torque_nm, gearbox, drive, accel_0_100, vmax_kph, weight_kg)
VALUES
(9,  '2.0L 4 cylindres diesel + électrique (EQ Power)', 'Hybride Diesel', 1950, 4, true,
     320, 700, '9G-TRONIC 9 rapports', '4MATIC intégrale', 6.9, 210, 2650),
(10, '1.6L 4 cylindres diesel turbo', 'Diesel', 1560, 4, true,
     99,  254, 'BE4R 5 rapports manuel', 'Traction', 10.7, 184, 1085);

INSERT INTO plate_lookup (plate, model_id) VALUES
('FV-095-RH', 9),
('EX-271-CQ', 10);

SELECT setval('brand_id_seq',        (SELECT MAX(id) FROM brand));
SELECT setval('vehicle_range_id_seq',(SELECT MAX(id) FROM vehicle_range));
SELECT setval('vehicle_model_id_seq',(SELECT MAX(id) FROM vehicle_model));
SELECT setval('vehicle_specs_id_seq',(SELECT MAX(id) FROM vehicle_specs));
