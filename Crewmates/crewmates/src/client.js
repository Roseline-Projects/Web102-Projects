//connects the react app to the supabase database

import {createClient} from '@supabase/supabase-js'

const ACCESS_KEY = import.meta.env.VITE_API_KEY

export const supabase = createClient(URL, ACCESS_KEY)



