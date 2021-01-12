import { CardPreview } from "./CardPreview.jsx"

export function CardList({ cards }) {
    return <article className="card-list">
        {cards.map(card => {
            return <CardPreview key={card.id} card={card} />
        })}
        </article>

}