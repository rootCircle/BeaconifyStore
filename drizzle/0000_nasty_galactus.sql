CREATE TABLE IF NOT EXISTS "virtual_beacons" (
	"uuid" varchar(36) NOT NULL,
	"major" varchar(5) NOT NULL,
	"minor" varchar(5) NOT NULL,
	"latitude" numeric(8, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "virtual_beacons_uuid_major_minor_pk" PRIMARY KEY("uuid","major","minor")
);
