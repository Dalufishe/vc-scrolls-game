import { cx, css } from '@emotion/css'
import React from 'react'

export default function Block({ classname, value }) {
    return (
        <div className={cx(
            "w-full",
            css`
            height: ${value * 4}px;
            `,
            classname)} />
    )
}
