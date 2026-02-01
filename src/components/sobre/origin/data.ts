/**
 * Origin Section Data
 * Content blocks for the AboutOrigin component
 */

export type FallbackImage =
    | 'sobre/origin-1.webp'
    | 'sobre/origin-2.webp'
    | 'sobre/origin-3.webp'
    | 'sobre/origin-4.webp';

export interface OriginBlock {
    id: number;
    title: string;
    paragraph: string;
    fallback: FallbackImage;
    img?: string;
}

/**
 * Content blocks with fallback images stored in Supabase
 * Each block represents a chapter in the origin story
 */
export const ORIGIN_CONTENT: OriginBlock[] = [
    {
        id: 1,
        title: 'O Começo',
        paragraph:
            'Minha jornada começou com uma curiosidade insaciável pelo visual. Desde cedo, fui atraído pela intersecção entre tecnologia e arte, buscando formas de transformar ideias abstratas em experiências visuais impactantes.',
        fallback: 'sobre/origin-1.webp',
    },
    {
        id: 2,
        title: 'A Evolução',
        paragraph:
            'Com o tempo, essa curiosidade se transformou em especialização. Estudei, experimentei e refinei minhas habilidades em motion design, direção de arte e desenvolvimento visual, sempre buscando a excelência em cada projeto.',
        fallback: 'sobre/origin-2.webp',
    },
    {
        id: 3,
        title: 'A Filosofia',
        paragraph:
            'Acredito que o design vai além da estética. É sobre comunicação, emoção e experiência. Cada pixel, cada movimento, cada transição deve servir a um propósito maior: conectar marcas com pessoas de forma autêntica e memorável.',
        fallback: 'sobre/origin-3.webp',
    },
    {
        id: 4,
        title: 'O Presente',
        paragraph:
            'Hoje, combino anos de experiência com uma visão sempre atualizada do mercado. Trabalho com marcas que buscam se destacar através de identidades visuais únicas e experiências digitais que deixam uma marca duradoura.',
        fallback: 'sobre/origin-4.webp',
    },
];
