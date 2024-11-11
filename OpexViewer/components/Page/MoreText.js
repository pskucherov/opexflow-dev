import { useCallback, useEffect, useState, memo, useMemo } from 'react';

export const MoreText = memo(function M(props) {
    return <div style={{
        display: 'inline-block',
        fontSize: 14,
        lineHeight: '16px',
        color: 'rgba(255, 255, 255, .5)',
    }}>{props.children}</div>;
});
