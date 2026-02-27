
-- Create consultation inquiries table
CREATE TABLE public.consultation_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  messenger_type TEXT NOT NULL, -- whatsapp, telegram, wechat, line
  messenger_id TEXT NOT NULL,
  interested_programs TEXT[] DEFAULT '{}',
  preferred_timing TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultation_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultation inquiry"
  ON public.consultation_inquiries
  FOR INSERT
  WITH CHECK (true);

-- No public reads - only admin/service role can read
-- (no SELECT policy = no public reads)
