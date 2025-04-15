
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  to,
  className,
}) => {
  return (
    <Link to={to} className={cn('action-card', className)}>
      <div className="rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default ActionCard;
