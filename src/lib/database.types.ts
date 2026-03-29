export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          token: string
          client_name: string
          client_email: string
          status: string
          brief_data: Json
          deposit_invoice_url: string | null
          final_invoice_url: string | null
          preview_url: string | null
          final_files_url: string | null
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          token: string
          client_name: string
          client_email: string
          status?: string
          brief_data?: Json
          deposit_invoice_url?: string | null
          final_invoice_url?: string | null
          preview_url?: string | null
          final_files_url?: string | null
          review?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          token?: string
          client_name?: string
          client_email?: string
          status?: string
          brief_data?: Json
          deposit_invoice_url?: string | null
          final_invoice_url?: string | null
          preview_url?: string | null
          final_files_url?: string | null
          review?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          project_id: string | null
          title: string
          description: string | null
          event_date: string
          event_time: string | null
          type: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          title: string
          description?: string | null
          event_date: string
          event_time?: string | null
          type?: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          title?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          type?: string
          completed?: boolean
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          project_id: string | null
          client_name: string
          client_company: string | null
          rating: number
          review_text: string
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          client_name: string
          client_company?: string | null
          rating: number
          review_text: string
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          client_name?: string
          client_company?: string | null
          rating?: number
          review_text?: string
          is_published?: boolean
          created_at?: string
        }
      }
      event_reminders: {
        Row: {
          id: string
          event_id: string
          reminder_date: string
          sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          reminder_date: string
          sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          reminder_date?: string
          sent?: boolean
          created_at?: string
        }
      }
    }
  }
}
