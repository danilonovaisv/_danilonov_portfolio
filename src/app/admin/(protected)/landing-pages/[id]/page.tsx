'use client';

import { useEffect, useState, use } from 'react';

import { createClientComponentClient } from '@/lib/supabase/client';
import LandingPageForm from '@/components/admin/LandingPageForm';

interface Props {
  params: Promise<{ id: string }>;
}

interface LandingPage {
  id: string;
  title: string;
  slug: string;
  cover: string;
  content: unknown;
}

export default function EditLandingPage({ params }: Props) {
  const { id } = use(params);
  const supabase = createClientComponentClient();
  const [data, setData] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setData(data);
      setLoading(false);
    }
    fetchData();
  }, [id, supabase]);

  if (loading)
    return <div className="p-10 text-center">Carregando dados...</div>;
  if (!data)
    return <div className="p-10 text-center">Página não encontrada.</div>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Portfolio Projects
        </p>
        <h1 className="text-3xl font-semibold">Editar Projeto de Portfólio</h1>
      </div>

      <LandingPageForm initialData={data} />
    </div>
  );
}
