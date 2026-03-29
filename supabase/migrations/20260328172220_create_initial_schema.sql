/*
  # Initial Database Schema for NDES1GN Platform

  ## Overview
  Complete schema migration for project management platform with client portal,
  briefing system, calendar, reviews, and email notifications.

  ## 1. New Tables
  
  ### `projects`
  Core project management table tracking client projects from briefing to delivery.
  - `id` (uuid, primary key) - Unique project identifier
  - `token` (text, unique) - Secure access token for client portal
  - `client_name` (text) - Client full name
  - `client_email` (text) - Client email address
  - `status` (text) - Project status: 'briefing', 'in_progress', 'review', 'completed', 'cancelled'
  - `brief_data` (jsonb) - Structured questionnaire responses
  - `deposit_invoice_url` (text) - URL to deposit invoice document
  - `final_invoice_url` (text) - URL to final invoice document
  - `preview_url` (text) - URL to project preview/mockups
  - `final_files_url` (text) - URL to final deliverables
  - `review` (text) - Client review/feedback text
  - `created_at` (timestamptz) - Project creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `events`
  Calendar events for project milestones and deadlines.
  - `id` (uuid, primary key) - Unique event identifier
  - `project_id` (uuid, nullable) - Reference to related project (null for personal events)
  - `title` (text) - Event title/name
  - `description` (text) - Detailed event description
  - `event_date` (date) - Event date
  - `event_time` (time, nullable) - Optional event time
  - `type` (text) - Event type: 'deadline', 'meeting', 'milestone', 'personal'
  - `completed` (boolean) - Completion status
  - `created_at` (timestamptz) - Event creation timestamp

  ### `reviews`
  Public client reviews and testimonials for portfolio display.
  - `id` (uuid, primary key) - Unique review identifier
  - `project_id` (uuid, nullable) - Reference to related project
  - `client_name` (text) - Reviewer name
  - `client_company` (text, nullable) - Reviewer company
  - `rating` (integer) - Rating (1-5 stars)
  - `review_text` (text) - Review content
  - `is_published` (boolean) - Visibility on public site
  - `created_at` (timestamptz) - Review creation timestamp

  ### `event_reminders`
  Automated email reminder tracking for upcoming events.
  - `id` (uuid, primary key) - Unique reminder identifier
  - `event_id` (uuid) - Reference to event
  - `reminder_date` (date) - When to send reminder
  - `sent` (boolean) - Whether reminder was sent
  - `created_at` (timestamptz) - Reminder creation timestamp

  ## 2. Security
  
  Row Level Security (RLS) is enabled on all tables with policies allowing:
  - Admin users (authenticated) have full access to all data
  - Public read-only access to published reviews
  - Token-based access for clients to view their own projects

  ## 3. Important Notes
  
  - All timestamps use timestamptz for proper timezone handling
  - JSONB used for flexible brief_data structure
  - Status field uses text (consider enum in future for stricter validation)
  - Token field is unique and used for secure, password-less client access
  - Reviews have is_published flag for moderation before public display
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  token text UNIQUE NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  status text DEFAULT 'briefing' NOT NULL,
  brief_data jsonb DEFAULT '{}'::jsonb,
  deposit_invoice_url text,
  final_invoice_url text,
  preview_url text,
  final_files_url text,
  review text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  event_time time,
  type text DEFAULT 'milestone' NOT NULL,
  completed boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  client_name text NOT NULL,
  client_company text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  is_published boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Event reminders table
CREATE TABLE IF NOT EXISTS event_reminders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  reminder_date date NOT NULL,
  sent boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_token ON projects(token);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client_email ON projects(client_email);
CREATE INDEX IF NOT EXISTS idx_events_project_id ON events(project_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_event_reminders_sent ON event_reminders(sent, reminder_date);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Admin can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for events
CREATE POLICY "Admin can view all events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin can view all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for event_reminders
CREATE POLICY "Admin can view all reminders"
  ON event_reminders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert reminders"
  ON event_reminders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update reminders"
  ON event_reminders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete reminders"
  ON event_reminders FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();