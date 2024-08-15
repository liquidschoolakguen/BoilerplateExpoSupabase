import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState, useContext } from 'react';



export type AuthContextType = {
  session: Session | null;
  profile: any,
  loading: boolean;
  isAdmin: boolean;
};
interface Profile {
  avatar_url: string | null;
  full_name: string | null;
  group: string;
  id: string;
  updated_at: string | null;
  username: string | null;
  website: string | null;
}
const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    //console.log('AuthProvider useEffect');
    const fetchSession = async () => {
      const { data: {session} } = await supabase.auth.getSession();
      setSession(session);


      if(session){
       // console.log('first login');
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }else{

        setProfile(null);
      }

      setLoading(false);
    }

    fetchSession();

     supabase.auth.onAuthStateChange(async(_event, session) => {
      setLoading(true);

      setSession(session);





      if(session){
        //console.log('second login');
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
        setIsAdmin(data?.group === 'ADMIN');
      }else{
        //console.log('no session anymore');
        setProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });
  }, []);


  useEffect(() => {

  }, [profile]);

  return (

    <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
