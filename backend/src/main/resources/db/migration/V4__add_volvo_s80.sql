INSERT INTO brand (id, name, country) VALUES (6, 'Volvo', 'Suède');

INSERT INTO vehicle_range (id, brand_id, name) VALUES (26, 6, 'S80 II');

INSERT INTO vehicle_model (id, range_id, name, year_from, year_to, body_style, engine_code) VALUES
(7, 26, 'S80 II D5 Auto', 2006, 2009, 'Berline', NULL);

INSERT INTO vehicle_specs
    (model_id, engine_description, fuel, displacement_cc, cylinders, turbo,
     power_hp, torque_nm, gearbox, drive, accel_0_100, vmax_kph, weight_kg)
VALUES
(7, '2.4L 5 cylindres turbo diesel', 'Diesel', 2400, 5, true,
    185, 400, 'Automatique', 'Traction avant', 8.0, 230, 1540);

INSERT INTO plate_lookup (plate, model_id) VALUES ('CJ-354-ZD', 7);

SELECT setval('brand_id_seq',        (SELECT MAX(id) FROM brand));
SELECT setval('vehicle_range_id_seq',(SELECT MAX(id) FROM vehicle_range));
SELECT setval('vehicle_model_id_seq',(SELECT MAX(id) FROM vehicle_model));
SELECT setval('vehicle_specs_id_seq',(SELECT MAX(id) FROM vehicle_specs));
