import React, { useEffect } from 'react'
import useHover from '../../../../hooks/useHover'
import { cx } from '@emotion/css';

export default function MenuItem({ children, onClick = () => { }, onHover = () => { } }) {
    const [hover, isHover] = useHover();
    useEffect(() => {
        if (isHover) {
            onHover();
        }
    }, [isHover])
    return (
        <li
            ref={hover}
            className={cx(
                isHover ? "text-c1" : "", "cursor-pointer")}
            onClick={onClick} >{children}</li>
    )
}
