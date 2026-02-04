-- Add unique constraint on competitors.name for upsert operations
ALTER TABLE competitors ADD CONSTRAINT competitors_name_unique UNIQUE (name);
