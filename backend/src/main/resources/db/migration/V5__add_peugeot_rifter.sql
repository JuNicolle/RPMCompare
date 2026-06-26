INSERT INTO brand (id, name, country) VALUES (7, 'Peugeot', 'France');

INSERT INTO vehicle_range (id, brand_id, name) VALUES (27, 7, 'Rifter');

INSERT INTO vehicle_model (id, range_id, name, year_from, year_to, body_style, engine_code) VALUES
(8, 27, 'Rifter 1.5 BlueHDi 130 EAT8', 2018, NULL, 'Ludospace', 'DV5RCU');

INSERT INTO vehicle_specs
    (model_id, engine_description, fuel, displacement_cc, cylinders, turbo,
     power_hp, torque_nm, gearbox, drive, accel_0_100, vmax_kph, weight_kg)
VALUES
(8, '1.5L 4-cyl. BlueHDi turbo diesel', 'Diesel', 1499, 4, true,
    130, 300, 'EAT8 8 rapports', 'Traction avant', 10.6, 188, 1490);

INSERT INTO plate_lookup (plate, model_id) VALUES ('HB601ZA', 8);

SELECT setval('brand_id_seq',        (SELECT MAX(id) FROM brand));
SELECT setval('vehicle_range_id_seq',(SELECT MAX(id) FROM vehicle_range));
SELECT setval('vehicle_model_id_seq',(SELECT MAX(id) FROM vehicle_model));
SELECT setval('vehicle_specs_id_seq',(SELECT MAX(id) FROM vehicle_specs));
