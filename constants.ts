import { Mood, LucidityLevel, RealityCheckStep } from './types';
import { 
  Smile, 
  Frown, 
  Meh, 
  CloudRain, 
  Zap, 
  Moon 
} from 'lucide-react';

export const MOODS: { label: Mood; icon: any; color: string }[] = [
  { label: 'Happy', icon: Smile, color: 'text-green-400' },
  { label: 'Peaceful', icon: Moon, color: 'text-blue-300' },
  { label: 'Excited', icon: Zap, color: 'text-yellow-400' },
  { label: 'Neutral', icon: Meh, color: 'text-gray-400' },
  { label: 'Confused', icon: CloudRain, color: 'text-purple-400' },
  { label: 'Scared', icon: Frown, color: 'text-red-400' },
];

export const LUCIDITY_LEVELS: LucidityLevel[] = [
  'None',
  'Low',
  'Medium',
  'High',
  'Fully Lucid'
];

export const REALITY_CHECKS: RealityCheckStep[] = [
  {
    title: 'The Hand Test',
    description: 'Look at your hands. In a dream, they often appear distorted, have the wrong number of fingers, or change shape.',
    action: 'Count your fingers slowly.'
  },
  {
    title: 'The Reading Test',
    description: 'Text in dreams is notoriously unstable. It often changes when you look away and look back.',
    action: 'Read some text, look away, then read it again.'
  },
  {
    title: 'The Breath Test',
    description: 'Pinch your nose and try to breathe. In a dream, you can often still breathe because your physical body is sleeping.',
    action: 'Pinch your nose and inhale gently.'
  },
  {
    title: 'The Light Switch',
    description: 'Light switches rarely work correctly in dreams. The light level often stays the same.',
    action: 'Flip a light switch and observe the change.'
  }
];