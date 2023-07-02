import React, { FC } from 'react';
import { BaseIconProps } from '../../../types/icon';
import {
  DEFAULT_ICON_HEIGHT,
  DEFAULT_ICON_WIDTH,
} from '../../../constants/icon.constants';

export interface ErrorIconProps extends BaseIconProps {}

const ErrorIcon: FC<ErrorIconProps> = ({ ...props }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_ICON_WIDTH}
        height={props.height || DEFAULT_ICON_HEIGHT}
        viewBox="0 0 16 16"
      >
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
        <path
          fill={props.color || 'inherit'}
          d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2ZM6.534 5.839a.5.5 0 0 0-.638.057l-.057.07a.5.5 0 0 0 .057.638L7.293 8L5.896 9.396l-.057.07a.5.5 0 0 0 .057.638l.07.057a.5.5 0 0 0 .638-.057L8 8.707l1.396 1.397l.07.057a.5.5 0 0 0 .638-.057l.057-.07a.5.5 0 0 0-.057-.638L8.707 8l1.397-1.396l.057-.07a.5.5 0 0 0-.057-.638l-.07-.057a.5.5 0 0 0-.638.057L8 7.293L6.604 5.896l-.07-.057Z"
        />
      </svg>
    </>
  );
};

export default ErrorIcon;
