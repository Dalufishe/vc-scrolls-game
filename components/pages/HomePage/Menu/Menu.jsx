import { cx } from '@emotion/css'
import React, { useCallback } from 'react'
import MenuItem from '../MenuItem/MenuItem'
import { useRouter } from 'next/router'

const generateGameId = () => {
    return "g" + Math.floor(Math.random() * 10000 + 1)
}

export default function Menu() {

    const router = useRouter();

    const handleNewGame = useCallback(() => {
        router.push(`/${generateGameId()}`)
    }, [])

    return (
        <ul className={cx("text-xl text-m2", "flex flex-col items-center gap-1")}>
            <MenuItem onClick={handleNewGame}>
                - New -
            </MenuItem>
            <MenuItem>- Load -</MenuItem>
            <MenuItem>- Developers -</MenuItem>
            <MenuItem>- Open Source -</MenuItem>
        </ul>
    )
}
