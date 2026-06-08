import { ownership } from '../data/ownership';
import { TimelinePanel } from './TimelinePanel';

export function StoryTimeline() {
  return (
    <div>
      {ownership.map((owner, i) => (
        <TimelinePanel key={owner.slug} owner={owner} index={i} />
      ))}
    </div>
  );
}
