import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const filter = params.slug?.join(', ') || 'All';

  return {
    title: `Notes filtered by ${filter} | NoteHub`,
    description: `Browse notes filtered by ${filter}`,
    openGraph: {
      title: `Notes filtered by ${filter} | NoteHub`,
      description: `Browse notes filtered by ${filter}`,
      url: `https://notehub.app/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}