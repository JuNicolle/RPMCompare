CREATE TABLE brand (
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(50)  NOT NULL,
    country VARCHAR(50)
);

CREATE TABLE vehicle_range (
    id       BIGSERIAL PRIMARY KEY,
    brand_id BIGINT      NOT NULL REFERENCES brand(id),
    name     VARCHAR(50) NOT NULL
);

CREATE TABLE vehicle_model (
    id          BIGSERIAL PRIMARY KEY,
    range_id    BIGINT       NOT NULL REFERENCES vehicle_range(id),
    name        VARCHAR(100) NOT NULL,
    year_from   SMALLINT,
    year_to     SMALLINT,
    body_style  VARCHAR(30),
    engine_code VARCHAR(20)
);

CREATE TABLE vehicle_specs (
    id                  BIGSERIAL PRIMARY KEY,
    model_id            BIGINT       NOT NULL UNIQUE REFERENCES vehicle_model(id),
    engine_description  VARCHAR(100),
    fuel                VARCHAR(20),
    displacement_cc     INTEGER,
    cylinders           SMALLINT,
    turbo               BOOLEAN,
    power_hp            SMALLINT,
    torque_nm           SMALLINT,
    gearbox             VARCHAR(50),
    drive               VARCHAR(30),
    accel_0_100         NUMERIC(4,1),
    vmax_kph            SMALLINT,
    weight_kg           SMALLINT
);

CREATE TABLE plate_lookup (
    id       BIGSERIAL PRIMARY KEY,
    plate    VARCHAR(10) NOT NULL UNIQUE,
    model_id BIGINT      NOT NULL REFERENCES vehicle_model(id)
);
