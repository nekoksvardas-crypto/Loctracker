-- PostgreSQL schema for realtime transport monitoring

CREATE TABLE fleet (
    id BIGSERIAL PRIMARY KEY,
    vehicle_code VARCHAR(40) NOT NULL UNIQUE,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    model VARCHAR(100) NOT NULL,
    capacity_kg NUMERIC(10,2),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    last_latitude NUMERIC(9,6),
    last_longitude NUMERIC(9,6),
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE drivers (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE driver_hours (
    id BIGSERIAL PRIMARY KEY,
    driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    fleet_id BIGINT NOT NULL REFERENCES fleet(id) ON DELETE CASCADE,
    shift_start TIMESTAMPTZ NOT NULL,
    shift_end TIMESTAMPTZ,
    break_minutes INTEGER NOT NULL DEFAULT 0,
    driving_minutes INTEGER NOT NULL DEFAULT 0,
    warning_issued BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_hours_driver_id ON driver_hours(driver_id);
CREATE INDEX idx_driver_hours_fleet_id ON driver_hours(fleet_id);
CREATE INDEX idx_driver_hours_shift_start ON driver_hours(shift_start DESC);

CREATE TABLE break_warnings (
    id BIGSERIAL PRIMARY KEY,
    driver_hours_id BIGINT NOT NULL REFERENCES driver_hours(id) ON DELETE CASCADE,
    warning_type VARCHAR(40) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'medium',
    emitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ
);

CREATE INDEX idx_break_warnings_emitted_at ON break_warnings(emitted_at DESC);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(120) NOT NULL,
    pickup_address TEXT NOT NULL,
    dropoff_address TEXT NOT NULL,
    assigned_fleet_id BIGINT REFERENCES fleet(id) ON DELETE SET NULL,
    assigned_driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_statuses (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    description TEXT,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_statuses_order_id ON order_statuses(order_id);
CREATE INDEX idx_order_statuses_changed_at ON order_statuses(changed_at DESC);
