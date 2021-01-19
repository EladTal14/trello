import React from 'react';

export function CardPreviewFeature({ type, src, content}) {

        return (
            <>
                {card[type] && <div className={`${type}-container flex`}>
                    <img src={src} alt="" />
                    <p className={type}>{content}</p></div>}
            </>
        )
}
