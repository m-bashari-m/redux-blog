import { parseISO, formatDistanceToNow } from "date-fns";

interface timeAgoProps {
  timestamp: string;
}

const TimeAgo: React.FC<timeAgoProps> = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
