import React from 'react';
import { Link } from '@mui/material';

interface LinkWithDescriptionProps {
    description?: string
    href: string
    label: string
}

const LinkWithDescription: React.FC<LinkWithDescriptionProps> = props => (
    <div className="text-muted fixed-bottom my-3">
        {props.description}
        <Link href={props.href} variant="body2">{props.label}</Link>
    </div>
);

export default LinkWithDescription;