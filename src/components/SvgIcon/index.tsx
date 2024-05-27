import React, { SVGProps } from 'react';

export default function SvgIcon({
  name,
  prefix = 'icon',
  color = '#333',
  ...props
}: SVGProps<any> & { prefix: string }) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  );
}
