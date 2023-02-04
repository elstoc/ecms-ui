import { GalleryProps } from '../components/gallery/Gallery';
import { MarkdownProps } from '../components/markdown/Markdown';

export type SiteProps = (GalleryProps & { type: 'gallery' }
    | MarkdownProps & { type: 'markdown' })[];
