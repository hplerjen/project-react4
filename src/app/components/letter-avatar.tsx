import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function cutDisplayName(name: string) {
  if (name.indexOf(' ') > 0 && name.split(' ')[0][0] !== undefined
    && name.split(' ')[1][0] !== undefined) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  } else if (name.charAt(0) && name.charAt(1)) {
    return name.charAt(0) + name.charAt(1);
  } else {
    return name;
  }

}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name}`,
  };
}

interface Props {
  displayName: string
}

export const LetterAvatar = ({ displayName }: Props) => {
  return (
    <Avatar {...stringAvatar(cutDisplayName(displayName))} />
  );
}