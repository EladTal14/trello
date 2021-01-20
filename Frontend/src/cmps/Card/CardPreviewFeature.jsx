import React from 'react';

export function CardPreviewFeature({ card, type, src, content}) {

        return (
            <>
                {card[type] && <div className={type !== 'members'? `${type}-container flex`: `preview-${type}-container flex`}>
                    <img src={`${src}`} alt="" />
                    <p className={type}>{content}</p></div>}
            </>
        )
}
