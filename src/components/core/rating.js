import React, { useState } from 'react';
import { PopperTooltip } from "@livechat/design-system";
import useLocalStorage from "../../hooks/useLocalStorage";
import { logAmplitudeEvent } from "../../utils/index";

const Star = props => {
    const [isVisible, setIsVisible] = useState(false)

    const { hovered, selected } = props
    const getFillColor = () => hovered ? '#004cbf' : selected ? '#0066FF' : ''

    return (
        <PopperTooltip
            zIndex={1}
            placement="bottom"
            triggerActionType="managed"
            isVisible={isVisible}
            trigger={<svg
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => {
                    props.handleMouseEnter()
                    setIsVisible(true)

                }}
                onMouseLeave={() => {
                    props.handleMouseLeave()
                    setIsVisible(false)
                }}
                onClick={() => props.handleClick()}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {
                    props.hovered || props.selected
                        ? <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z" fill={getFillColor()} />
                        : <path d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66L12 15.39ZM22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24Z" fill="#0F0F10" />
                }

            </svg>
            }
        >
            <>{props.rated ? `You rated "${props.text}"` : props.text}</>
        </PopperTooltip>
    )
}


const StarRating = ({ numberOfStars = 5 }) => {
    const [ratings, setRatings] = useLocalStorage("ratings", []);
    const currentRating = ratings.find(rating => rating.pathname === window.location.pathname)
    const [selectedIndex, setSelectedIndex] = useState(currentRating ? currentRating.rating : -1)
    const [hoveredIndex, setHoveredIndex] = useState(-1)
    const stars = []
    const tooltipText = ["It's unsuable", "Rather poor", "It's OK", "Great", "Excellent"]

    const saveRatings = (rating, text) => {
        const newRatings = ratings.filter(r => r.pathname !== window.location.pathname)
        const newRating = {
            rating,
            pathname: window.location.pathname
        }
        newRatings.push(newRating)
        setRatings(newRatings)
        setSelectedIndex(rating)
        logAmplitudeEvent('Document rated', { pathname: newRating.pathname, rating: newRating.rating, text })
    }

    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<Star key={`star-${i}`}
            handleMouseEnter={() => setHoveredIndex(i)}
            handleMouseLeave={() => setHoveredIndex(-1)}
            handleClick={() =>
                saveRatings(i, tooltipText[i])
            }
            hovered={
                hoveredIndex > i - 1
            }
            rated={selectedIndex === i}
            selected={selectedIndex > i - 1}
            text={tooltipText[i]}
        />
        )
    }
    return (

        <>
            {stars}
        </>
    )
};

export default StarRating


