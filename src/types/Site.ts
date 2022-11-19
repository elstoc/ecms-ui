import { GalleryProps } from '../components/gallery/Gallery';
import { MarkdownProps } from '../components/markdown/Markdown';
import { MarkdownPageProps } from '../components/markdown/MarkdownPage';

export type SiteProps = (GalleryProps & { type: 'gallery' }
    | MarkdownProps & { type: 'markdown' }
    | MarkdownPageProps & { type: 'markdownPage'})[];
