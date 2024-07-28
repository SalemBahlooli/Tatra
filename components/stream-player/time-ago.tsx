import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

// Define the props type for the TimeAgo component
interface TimeAgoProps {
  date: Date | number; // Accept a Date object or a timestamp
}

// The TimeAgo component that takes a date as a prop and displays it in a human-readable format
 export const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  if (!date) return null;

  // Calculate the time difference from now
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });

  return (
    <span>
        <p style={{fontSize:10, alignSelf:'center'}}>
           Joined: {timeAgo}
        </p>
        {}
        </span>
  );
}

// Example usage of the TimeAgo component

