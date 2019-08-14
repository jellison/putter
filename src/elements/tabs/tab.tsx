import * as React from 'react';

export interface ITabProps {
  children: React.ReactNode;
  name: string;
}

export default class Tab extends React.Component<ITabProps> {}
