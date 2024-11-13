CREATE TABLE IF NOT EXISTS "virtual_beacons" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" varchar(36) NOT NULL,
	"major" varchar(5) NOT NULL,
	"minor" varchar(5) NOT NULL,
	"latitude" numeric(8, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
