-- System settings storage
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure single-row table
INSERT INTO system_settings (id, settings)
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;

