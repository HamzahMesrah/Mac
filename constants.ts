
import { AspectRatio } from './types';

export const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: '1:1', label: 'Square' },
  { value: '16:9', label: 'Landscape' },
  { value: '9:16', label: 'Portrait' },
  { value: '4:3', label: 'Standard' },
  { value: '3:4', label: 'Vertical' },
];

export const IMAGE_COUNTS: number[] = [1, 2, 3, 4];
