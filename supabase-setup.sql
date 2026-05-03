-- Deepwoken Wind Tracker - Supabase Setup
-- Copia y ejecuta esto en: SQL Editor

CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid(),
  name TEXT NOT NULL,
  race TEXT DEFAULT '',
  weapon TEXT DEFAULT '',
  attunements TEXT[] DEFAULT '{}',
  completed_tasks TEXT[] DEFAULT '{}',
  active_modifiers TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_select_own_characters" ON characters
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_own_characters" ON characters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_characters" ON characters
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_characters" ON characters
  FOR DELETE USING (auth.uid() = user_id);